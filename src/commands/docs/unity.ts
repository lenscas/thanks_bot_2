import { create_command } from '../../command';
import { create_documentation_url } from './_base';

const unity_documentation_url = 'https://docs.unity3d.com/ScriptReference/';

export const command = create_command(
    async ({ args }) => {
        return create_documentation_url(args, unity_documentation_url, capitalizeFirstLetter);
    },
    'Returns a link to the documentation for a specific unity class.',
    ['unityHelp', 'unityDocs'],
);

function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
