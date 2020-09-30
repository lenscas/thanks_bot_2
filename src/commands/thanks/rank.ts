import { create_command_for_command_channel } from '../../command';
import { getRankOfUser } from './queries.queries';

export const command = create_command_for_command_channel(async ({ message, db }) => {
    const user_id = message.mentions.users.first()?.id ?? message.author.id;

    const res = await getRankOfUser.run({ user_id, server_id: message.guild?.id }, db).then((x) => x[0]);
    if (res) {
        await message.channel.send(`This user has been thanked **${res.times} times**. And is at rank ${res.rank} .`);
    } else {
        await message.channel.send('Sorry, no thanks are found for this user :(.');
    }
}, 'Shows how many times you got thanked and your current rank.\n It can also be used to get the rank of someone else.');
