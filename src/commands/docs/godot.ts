import { create_command } from '../../command';
import { create_documentation_url } from './_base';

const godot_doc_url = 'https://docs.godotengine.org/en/stable/classes/class_';

const commandFunc = (args: Array<string>) => create_documentation_url(args, godot_doc_url, (x) => x.toLowerCase());

export const command = create_command(
    async ({ args }) => commandFunc(args),
    'Returns a link to the documentation for a specific godot class.',
    ['gdhelp', 'gd', 'godothelp', 'gddocs', 'gdocs'],
    undefined,
    undefined,
    {
        config: (x) =>
            x
                .addStringOption((x) =>
                    x.setName('class').setDescription('The class name to link to').setRequired(true),
                )
                .toJSON(),
        func: async ({ interaction }) => {
            const className = interaction.options.getString('class', true);
            return {
                ephemeral: false,
                content: commandFunc([className]),
            };
        },
    },
);
