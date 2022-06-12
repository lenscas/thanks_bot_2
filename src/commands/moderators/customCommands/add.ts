import { REST } from '@discordjs/rest';
import { PermissionFlagsBits } from 'discord-api-types/v10';
import { Client, Guild } from 'discord.js';
import { create_moderator_command, register_commands_for } from '../../../command';
import { PoolWrapper } from '../../../db';
import { addCommand, checkIfCommandExists } from '../queries.queries';
import { checkIfChannelIsText, getChannelIdFromMention, removeFirstLine } from '../_base';
import { createModal, getFields } from './_base';

const commandFunc = async ({
    channelId,
    command,
    name,
    guild,
    db,
    rest,
    client,
}: {
    channelId: string | undefined;
    command: string;
    name: string;
    guild: Guild;
    db: PoolWrapper;
    rest: REST;
    client: Client;
}) => {
    if (channelId) {
        const isTextChannel = await checkIfChannelIsText(client, channelId);
        if (isTextChannel !== true) {
            return isTextChannel;
        }
    }
    try {
        db.startTransaction(async (db) => {
            await addCommand.run({ channel_id: channelId, message: command, name: name, server_id: guild.id }, db);
            await register_commands_for(client, guild.id, rest, db);
        });
    } finally {
        await register_commands_for(client, guild.id, rest, db);
    }

    return `Command ${name} added. ${channelId ? `Limited to channel: <#${channelId}>` : ''}`;
};

export const command = create_moderator_command(
    async ({ message, args, db, client, rest }) => {
        if (!message.guild) {
            return;
        }
        const name = args[0];
        if (!name) {
            return 'Format is `!add {name} [channel]\\n{message}`';
        }
        if (Number((await checkIfCommandExists.run({ name, server_id: message.guild?.id }, db))[0].count) > 0) {
            return `Command ${name} already exists. Use !edit if you want to edit the existing command.`;
        }
        const channel = args[1];
        const messageWithoutStart = removeFirstLine(message.content);
        if (!messageWithoutStart) {
            return 'No message to send detected. Remember, it should be a new line';
        }
        let channelId;
        if (channel) {
            const res = getChannelIdFromMention(channel);
            if ('error' in res) {
                return res.error;
            }
            channelId = res.id;
        }
        return await commandFunc({
            channelId,
            command: messageWithoutStart,
            name,
            db,
            client,
            guild: message.guild,
            rest,
        });
    },
    `Adds a custom command.`,
    undefined,
    undefined,
    {
        config: (x) => x.setDefaultMemberPermissions(PermissionFlagsBits.BanMembers).toJSON(),
        modal_builder: createModal,
        modal_name: 'AddCommand',
        modal_handler: async ({ interaction, client, db, rest }) => {
            if (!interaction.guild) {
                return;
            }
            const { name, command } = getFields(interaction.fields);
            return {
                ephemeral: true,
                content: await commandFunc({
                    client,
                    db,
                    channelId: undefined,
                    guild: interaction.guild,
                    name,
                    command,
                    rest,
                }),
            };
        },
    },
);
