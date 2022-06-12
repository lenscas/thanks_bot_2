import { create_command } from '../../command';
import { createSlashCommand, create_documentation_url } from './_base';

const unity_documentation_url = 'https://docs.unity3d.com/ScriptReference/';

const commandFunc = (args: Array<string>) =>
    create_documentation_url(args, unity_documentation_url, capitalizeFirstLetter);

export const command = create_command(
    async ({ args }) => commandFunc(args),
    'Returns a link to the documentation for a specific unity class.',
    ['unityHelp', 'unityDocs'],
    undefined,
    undefined,
    {
        config: createSlashCommand,
        func: async ({ interaction }) => {
            const param = interaction.options.getString('class', true);
            return {
                ephemeral: false,
                content: commandFunc([param]),
            };
        },
    },
);

function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
