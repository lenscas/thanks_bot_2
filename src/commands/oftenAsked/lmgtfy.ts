import { create_command } from '../../command';

export const command = create_command(async ({ message , args}) => {
    const search = args.join(' ')

    message.channel.send(`Learn what the internet is and find your answer! <https://lmgtfy.app/?q=${search}>`)

}, 'Tell users what the internet is and help them find the answer to their problem(s).');