import { create_command_for_command_channel } from '../../command';
import { top } from './queries.queries';
import Table from 'cli-table3';

export const command = create_command_for_command_channel(
    async ({ client, message, db }) => {
        const res = await Promise.all(
            await top.run({ server_id: message.guild?.id, user_id: client.user?.id }, db).then((x) =>
                x.map(async (x) => {
                    const user = await message.guild?.members.fetch(x.user_id);
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
        await message.channel.send(['The top most thanked users are\n', '```', table.toString(), '```']);
    },
    'Show the people who got thanked the most, mostly for the mods so they can give rewards.',
    ['list'],
    async ({ message }) => !!(message.guild && message.member),
);
