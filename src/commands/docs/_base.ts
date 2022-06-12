import { SlashCommandBuilder } from '@discordjs/builders';
import { RESTPostAPIApplicationCommandsJSONBody } from 'discord-api-types/v10';

export const create_documentation_url = (args: string[], base_url: string, mod_name: (_: string) => string): string => {
    const search = args[0];
    if (!search) {
        return 'Missing class name';
    }
    const moddedName = mod_name(search);
    return `documentation: <${base_url}${moddedName}.html>`;
};

export const createSlashCommand = (x: SlashCommandBuilder): RESTPostAPIApplicationCommandsJSONBody =>
    x.addStringOption((x) => x.setName('class').setDescription('The class name to link to').setRequired(true)).toJSON();
