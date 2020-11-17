import { create_command_for_command_channel } from '../../command';

const optons = ['Nice!', 'AWESOME!', 'awesome!', 'nice!', 'GREAT!', 'amazing!', 'WOOO!'];

export const command = create_command_for_command_channel(async () => {
    return optons[Math.floor(Math.random() * optons.length)];
}, 'This is a basic test command');
