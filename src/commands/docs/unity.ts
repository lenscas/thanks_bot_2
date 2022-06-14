import { create_command } from '../../command';
import { IDB } from '../../db';
import { createSlashCommand, create_documentation_url } from './_base';

const unity_documentation_url = 'https://docs.unity3d.com/ScriptReference/';

const commandFunc = (args: Array<string>, db: IDB) =>
    create_documentation_url(
        { class: args[0], method: args[1], site: 'unity' },
        unity_documentation_url,
        capitalizeFirstLetter,
        db,
    );

export const command = create_command(
    async ({ args, db }) => commandFunc(args, db),
    'Returns a link to the documentation for a specific unity class.',
    ['unityHelp', 'unityDocs'],
    undefined,
    undefined,
    {
        config: createSlashCommand,
        func: async ({ interaction, db }) => {
            const param = interaction.options.getString('class', true);
            return {
                ephemeral: false,
                content: await commandFunc([param], db),
            };
        },
    },
);

function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
