import { PermissionFlagsBits } from 'discord-api-types/v10';
import { create_moderator_command } from '../../../command';
import { PoolWrapper } from '../../../db';
import { addUrlToWhitelist } from './queries.queries';

const commandFunc = async (db: PoolWrapper, url: string) => {
    try {
        await addUrlToWhitelist.run({ url }, db);
        return `url : ${url} added to the whitelist`;
    } catch (e) {
        console.error(e);
        return 'Something has gone wrong while adding the url';
    }
};

export const command = create_moderator_command(
    async ({ db, args }) => {
        const url = args[0];
        if (!url) {
            return 'Missing the url parameter';
        }
        return await commandFunc(db, url);
    },
    'Add a new url to the list of safe urls',
    undefined,
    undefined,
    {
        config: (x) =>
            x
                .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
                .addStringOption((x) =>
                    x.setName('url').setDescription('url to add. For example `google.com`').setRequired(true),
                )
                .toJSON(),
        func: async ({ interaction, db }) => {
            const url = interaction.options.getString('url', true);
            return {
                ephemeral: true,
                content: await commandFunc(db, url),
            };
        },
    },
);
