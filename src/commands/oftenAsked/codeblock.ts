import { create_command } from '../../command';

const replyMessage = [
    '**Use Codeblocks To Paste Your Code**',
    'If the code is larger than 2,000 characters, then consider using a service such as <https://paste.myst.rs/>',
    '\\```scripting language',
    '    //your code here',
    '\\```',
    '```',
    '//your code here',
    '```',
].join('\n');

export const command = create_command(
    async () => replyMessage,
    'Explains how to paste code neatly',
    ['paste', 'code'],
    undefined,
    undefined,
    { config: (x) => x.toJSON(), func: async () => ({ ephemeral: false, content: replyMessage }) },
);
