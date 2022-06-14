import { SlashCommandBuilder } from '@discordjs/builders';
import { RESTPostAPIApplicationCommandsJSONBody } from 'discord-api-types/v10';
import { IDB } from '../../db';
import { getMethodId } from './quries.queries';

export type SearchParams = {
    site: string;
    class: string | undefined;
    method: string | undefined;
};

export const create_documentation_url = async (
    searchParams: SearchParams,
    base_url: string,
    mod_class_name: (_: string) => string,
    db: IDB,
): Promise<string> => {
    if (!searchParams.class) {
        return 'Missing class name';
    }
    const moddedName = mod_class_name(searchParams.class);
    let methodLink = '';
    if (searchParams.method) {
        methodLink =
            '#' +
            (await getMethodId
                .run(
                    {
                        class_name: searchParams.class,
                        method_name: searchParams.method,
                        site_name: searchParams.site,
                    },
                    db,
                )
                .then((x) => x[0]?.element_id ?? ''));
    }
    return `documentation: <${base_url}${moddedName}.html${methodLink}>`;
};

export const createSlashCommand = (x: SlashCommandBuilder): RESTPostAPIApplicationCommandsJSONBody =>
    x.addStringOption((x) => x.setName('class').setDescription('The class name to link to').setRequired(true)).toJSON();
