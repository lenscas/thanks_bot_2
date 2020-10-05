import { create_command } from '../../command';

export const command = create_command(async ({ message , args}) => {
    const search = args.join('+')

    message.channel.send(`Find your answer at <https://www.google.com/search?q=search%3F%3F%3F%3F&oq=ho&aqs=chrome.0.69i59l3j35i39j69i57j69i60l3.7034j0j1&sourceid=chrome&ie=UTF-8>!`)

}, 'Give users google results.');
