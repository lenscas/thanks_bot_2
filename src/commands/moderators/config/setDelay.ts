import { create_moderator_command } from '../../../command';
import { updateThankTime } from '../queries.queries';

export const command = create_moderator_command(
    async ({ message, args, db }) => {
        if (!message.guild) {
            return;
        }
        if (args.length == 0) {
            await message.channel.send('Missing time argument');
            return;
        }
        await updateThankTime.run({ server_id: message.guild.id, time_in_minutes: args[0] }, db);
        await message.channel.send('Configuration has been altered');
        return;
    },
    'Allows you to set the time between users being able to thank the same user (in minutes)',
    ['delay', 'change_spam_time'],
);
