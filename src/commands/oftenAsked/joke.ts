import { create_command } from '../../command';
import jokes from 'discord-jokes';

export const command = create_command(
    async ({ message }) => {
        await message.channel.send(
            jokes.getRandomDadJoke (function(joke) {
                message.channel.send(joke);
            }),
        );
    },
    'Gives a random dad joke.',
    ['dadjoke'],
);
