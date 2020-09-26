import { create_command } from '../../command';

export const command = create_command(
    async ({ message }) => {
        await message.channel.send([
            '**Use Codeblocks To Paste Your Code**',
            'If the code is larger than 2,000 characters, then consider using a service such as <https://paste.myst.rs/>',
            '\\``` scripting language',
            '    //your code here',
            '\\````',
        ]);
    },
    'Explains how to paste code neatly',
    ['paste', 'code'],
);
