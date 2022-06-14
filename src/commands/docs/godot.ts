import { create_command } from '../../command';
import { IDB } from '../../db';
import { getAutocompleteClass, getAutocompleteMethod } from './quries.queries';
import { create_documentation_url } from './_base';

const godot_doc_url = 'https://docs.godotengine.org/en/stable/classes/class_';

const commandFunc = (args: Array<string | undefined>, db: IDB) =>
    create_documentation_url(
        { class: args[0], method: args[1], site: 'godot' },
        godot_doc_url,
        (x) => x.toLowerCase(),
        db,
    );

export const command = create_command(
    async ({ args, db }) => commandFunc(args, db),
    'Returns a link to the documentation for a specific godot class.',
    ['gdhelp', 'gd', 'godothelp', 'gddocs', 'gdocs'],
    undefined,
    undefined,
    {
        config: (x) =>
            x
                .addStringOption((x) =>
                    x
                        .setName('class')
                        .setDescription('The class name to link to')
                        .setRequired(true)
                        .setAutocomplete(true),
                )
                .addStringOption((x) =>
                    x
                        .setName('member')
                        .setDescription('The method,field, signal,etc to link to')
                        .setRequired(false)
                        .setAutocomplete(true),
                )
                .toJSON(),
        func: async ({ interaction, db }) => {
            const className = interaction.options.getString('class', true);
            const methodName = interaction.options.getString('member') ?? undefined;
            return {
                ephemeral: false,
                content: await commandFunc([className, methodName], db),
            };
        },
        autoComplete: async ({ interaction, db }) => {
            const autoComplete = interaction.options.getFocused(true);
            let searchingFunc = async (): Promise<Array<{ name: string }>> => [];
            if (autoComplete.name == 'class') {
                searchingFunc = () =>
                    getAutocompleteClass.run(
                        { doc_for: 'godot', searching_for: `%${interaction.options.getFocused().toString()}%` },
                        db,
                    );
            } else {
                const className = interaction.options.getString('class', true);
                searchingFunc = () =>
                    getAutocompleteMethod.run(
                        {
                            class_name: className,
                            method_name: `%${interaction.options.getFocused().toString()}%`,
                            site_name: 'godot',
                        },
                        db,
                    );
            }
            return (await searchingFunc()).map((x) => ({ value: x.name, name: x.name }));
        },
    },
);
