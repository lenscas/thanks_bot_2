import { create_moderator_command } from '../../command';
import { Guild, GuildMember, Message } from 'discord.js';
import { PermissionFlagsBits } from 'discord-api-types/v10';
import { PoolWrapper } from '../../db';
import { muteAndReportUser } from '../../protection/helpers';
import { getMessagesToLog } from './_base';

const commandFUnc = async (
    amount: number,
    guild: Guild,
    db: PoolWrapper,
    user: GuildMember,
    channel: Message['channel'],
) => {
    const messages = await getMessagesToLog(channel, amount);
    return (await muteAndReportUser(user, guild, db, messages, 'Prepared ban command executed'))[0];
};

const successText = 'muted and logged the messages';
const errorText = 'Something has gone wrong :(';

export const command = create_moderator_command(
    async ({ message, args, db }) => {
        const mentioned = message.mentions.members;
        if (!message.guild) {
            return;
        }
        if ((mentioned?.size ?? 0) > 1) {
            return 'I can only prepare 1 person at a time. Please ping 1 person at a time';
        }
        const personToBan = mentioned?.first();
        if (!personToBan) {
            return "can't prepare a ban without mentioning WHO to prepare for ban";
        }
        const messageAmount = args.map((x) => Number(x)).find((x) => !isNaN(x));
        if (!messageAmount) {
            return 'Could not get how many messages to store.';
        }
        const res = await commandFUnc(messageAmount, message.guild, db, personToBan, message.channel);
        if (res) {
            return successText;
        } else {
            return errorText;
        }
    },
    'mutes the given person and logs the X messages',
    ['ban', 'prep_ban', 'prepban'],
    undefined,
    {
        config: (x) =>
            x
                .addUserOption((x) =>
                    x.setDescription('User that needs to be prepared for a ban').setName('user').setRequired(true),
                )
                .addIntegerOption((x) =>
                    x.setName('amount_to_log').setDescription('Amount of messages to log').setRequired(true),
                )
                .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers)
                .toJSON(),
        func: async ({ db, interaction }) => {
            if (!interaction.guild) {
                return;
            }
            const personToBan = interaction.options.getMember('user', true);
            if (!('joinedTimestamp' in personToBan)) {
                return { ephemeral: true, content: 'Looks like the bot is not configured correctly' };
            }
            const amount = interaction.options.getInteger('amount_to_log', true);
            if (!interaction.channel) {
                return { ephemeral: true, content: 'Did not run this command in a channel' };
            }
            const res = await commandFUnc(amount, interaction.guild, db, personToBan, interaction.channel);
            return { ephemeral: true, content: res ? successText : errorText };
        },
    },
);
