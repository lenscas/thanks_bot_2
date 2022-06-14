import { PermissionFlagsBits } from 'discord-api-types/v10';
import { MessageAttachment } from 'discord.js';
import { create_moderator_command } from '../../../command';
import { IDB } from '../../../db';
import { getAvailableLogs, getLog } from './queries.queries';

const commandFn = (for_log: string, db: IDB) =>
    getLog.run({ name: for_log }, db).then((x) => ({
        content: 'Here is the log',
        files: [new MessageAttachment(Buffer.from(x[0].log_message ?? '', 'utf-8'), 'messages.txt')],
    }));

export const command = create_moderator_command(
    async ({ args, db, message }) => {
        if (args.length != 1) {
            return `Expected exactly 1 parameter ${args.length} given`;
        }
        const log = await commandFn(args[0], db);
        message.reply(log);
    },
    'Get the log of the crawler process',
    undefined,
    undefined,
    {
        config: async (x, _, db) => {
            const logs = await getAvailableLogs
                .run(undefined, db)
                .then((x) => x.map((x) => ({ name: x.name, value: x.name })));
            return x
                .addStringOption((x) =>
                    x
                        .setName('log')
                        .setDescription('What log to get')
                        .setRequired(true)
                        .addChoices(...logs),
                )
                .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
                .toJSON();
        },
        func: async ({ interaction, db }) => {
            const logType = interaction.options.getString('log', true);
            const log = await commandFn(logType, db);
            interaction.reply({ ...log, ephemeral: true });
        },
    },
);
