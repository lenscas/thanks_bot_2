import { create_command_for_command_channel } from '../../command';
import { top } from './queries.queries';
import Table from 'cli-table3';
import { PoolWrapper } from '../../db';
import { Client, Guild } from 'discord.js';
import { SlashCommandBuilder } from '@discordjs/builders';

const commandFunc = async (db: PoolWrapper, guild: Guild, client: Client) => {
    const res = await Promise.all(
        await top.run({ server_id: guild.id, user_id: client.user?.id }, db).then((x) =>
            x.map(async (x) => {
                const user = await (async () => {
                    try {
                        return await guild.members.fetch(x.user_id);
                    } catch (e) {
                        console.log(e);
                    }
                })();
                return { user: user?.nickname ?? user?.displayName ?? x.user_id, times: x.times };
            }),
        ),
    );
    const table = new Table({
        head: ['user', 'times'],
        style: {
            head: [],
            border: [],
        },
    });

    res.forEach((x) => table.push([x.user, x.times]));
    return ['The top most thanked users are\n', '```', table.toString(), '```'].join('\n');
};

export const command = create_command_for_command_channel(
    async ({ message, db, client }) => {
        if (!message.guild) {
            return;
        }
        await commandFunc(db, message.guild, client);
    },
    'Show the people who got thanked the most, mostly for the mods so they can give rewards.',
    ['list'],
    undefined,
    {
        config: new SlashCommandBuilder()
            .setName('top')
            .setDescription('Show the people who got thanked the most')
            .toJSON(),
        func: async ({ db, interaction, client }) => {
            if (!interaction.guild) {
                return;
            }
            return {
                ephemeral: true,
                content: await commandFunc(db, interaction.guild, client),
            };
        },
    },
);
