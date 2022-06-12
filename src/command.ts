import { SlashCommandBuilder } from '@discordjs/builders';
import { REST } from '@discordjs/rest';
import { RESTPostAPIApplicationCommandsJSONBody, Routes } from 'discord-api-types/v10';
import {
    Client,
    CommandInteraction,
    InteractionReplyOptions,
    Message,
    MessagePayload,
    Modal,
    ModalSubmitInteraction,
} from 'discord.js';
import { readdir, lstat } from 'fs/promises';
import path from 'path';
import { IDB, PoolWrapper } from './db';
import {
    getCommandChannel,
    enableCommands,
    disableCommands,
    getServersWithoutCommands,
    getEveryCustomCommandName,
} from './queries.queries';

export type CommandParams = {
    client: Client;
    db: PoolWrapper;
    rest: REST;
};

export type TextCommandParams = {
    message: Message;
    args: string[];
} & CommandParams;

export type SlashCommandParams = { interaction: CommandInteraction } & CommandParams;
export type ModalSubmitParams = { interaction: ModalSubmitInteraction } & CommandParams;

const serverIdsWithoutCommands = new Set<string>();

export const addServerToNoCommandsList = async (db: PoolWrapper, server_id: string): Promise<void> => {
    if (serverIdsWithoutCommands.has(server_id)) {
        return;
    }
    await disableCommands.run({ server_id }, db);
    serverIdsWithoutCommands.add(server_id);
};

export const removeServerFromNoCommandsList = async (db: PoolWrapper, server_id: string): Promise<void> => {
    if (serverIdsWithoutCommands.has(server_id)) {
        await enableCommands.run({ server_id }, db);
        serverIdsWithoutCommands.delete(server_id);
        return;
    }
};

export const isServerInDisableList = (serverId: string): boolean => serverIdsWithoutCommands.has(serverId);

export const FillServersWithoutCommands = async (db: PoolWrapper): Promise<void> => {
    const res = await getServersWithoutCommands.run(undefined, db);
    res.forEach((v) => serverIdsWithoutCommands.add(v.server_id));
};

export function create_limit_to_command_channel_check(check?: Command['check']): Command['check'] {
    return async (params) => {
        if (!params.message.guild) {
            return false;
        }
        const channel = await getCommandChannel
            .run({ server_id: params.message.guild.id }, params.db)
            .then((x) => x[0]?.command_channel);
        return (!channel || channel == params.message.channel.id) && (!check || (await check(params)));
    };
}

export type CommandModal = {
    modal_name: string;
    modal_builder: (_: Modal) => Modal;
    modal_handler: (_: ModalSubmitParams) => Promise<void | string | InteractionReplyOptions | MessagePayload>;
};

export type Command = {
    aliases: string[];
    help_text: string;
    check: (params: TextCommandParams) => Promise<boolean>;
    run: (params: TextCommandParams) => Promise<void | string>;
    slash_command?: {
        config: (
            x: SlashCommandBuilder,
            guild_id: string,
            db: IDB,
        ) => RESTPostAPIApplicationCommandsJSONBody | Promise<RESTPostAPIApplicationCommandsJSONBody>;
    } & (
        | {
              func: (params: SlashCommandParams) => Promise<void | string | InteractionReplyOptions | MessagePayload>;
          }
        | CommandModal
    );
};

export function create_command(
    run: Command['run'],
    help_text: Command['help_text'],
    aliases?: Command['aliases'],
    check?: Command['check'],
    overwriteNoCommands = false,
    slash_command?: Command['slash_command'],
): Command {
    if (!overwriteNoCommands) {
        const oldCheck = check;
        check = async (a) => {
            if (a.message.guild && serverIdsWithoutCommands.has(a.message.guild.id)) {
                return false;
            }
            return oldCheck == null ? true : await oldCheck(a);
        };
    }
    return {
        run,
        help_text,
        aliases: aliases ?? [],
        check: check ?? (async () => true),
        slash_command,
    };
}

export function create_command_for_command_channel(
    run: Command['run'],
    help_text: Command['help_text'],
    aliases?: Command['aliases'],
    check?: Command['check'],
    slash_command?: Command['slash_command'],
): Command {
    return create_command(run, help_text, aliases, create_limit_to_command_channel_check(check), false, slash_command);
}

export function create_moderator_command(
    run: Command['run'],
    help_text: Command['help_text'],
    aliases?: Command['aliases'],
    check?: Command['check'],
    slash_command?: Command['slash_command'],
): Command {
    return create_command(
        run,
        help_text,
        aliases,
        async (params) => {
            if (!(params.message.guild && params.message.member)) {
                return false;
            }
            const checkPermission = params.message.member.permissions.has.bind(params.message.member.permissions);

            if (
                !(checkPermission('BAN_MEMBERS') && checkPermission('KICK_MEMBERS') && checkPermission('MANAGE_ROLES'))
            ) {
                return false;
            }
            return check ? await check(params) : true;
        },
        true,
        slash_command,
    );
}
export type CommandWithName = {
    name: string;
    command: Command;
};

export type CommandTree = { group: string; commands: Array<CommandWithName | CommandTree> };

export async function get_commands_in(dir: string, group = ''): Promise<CommandTree> {
    const files = await readdir(dir);
    console.log(files);
    const commands = await Promise.all(
        (
            await Promise.all(
                files
                    .filter((file) => !file.startsWith('_'))
                    .map(async (file) => {
                        const full_path = path.join(dir, file);
                        return {
                            file: await lstat(full_path),
                            name: file,
                            path: full_path,
                            parsed_path: path.parse(full_path),
                        };
                    }),
            )
        )
            .filter((x) => x.file.isDirectory() || (x.parsed_path.ext != '.sql' && x.parsed_path.ext != '.map'))
            .filter((x) => {
                if (x.file.isDirectory()) {
                    return true;
                }
                // eslint-disable-next-line @typescript-eslint/no-var-requires
                return !!require(x.path).command;
            })
            .map(async (file) => {
                if (file.file.isDirectory()) {
                    return get_commands_in(file.path, file.name);
                } else {
                    return {
                        name: path.parse(file.path).name,
                        // eslint-disable-next-line @typescript-eslint/no-var-requires
                        command: require(file.path).command as Command,
                    };
                }
            }),
    );

    return {
        group,
        commands,
    };
}

export function find_command_with(tree: CommandTree, filter: (_: CommandWithName) => boolean): Command | undefined {
    for (const candidate of tree.commands) {
        if ('name' in candidate) {
            if (filter(candidate)) {
                return candidate.command;
            }
        } else {
            const found = find_command_with(candidate, filter);
            if (found) {
                return found;
            }
        }
    }
}

export function find_command(command: string, tree: CommandTree, is_slash_command?: boolean): Command | undefined {
    return find_command_with(
        tree,
        (candidate) =>
            candidate.name == command ||
            (is_slash_command && candidate.name.toLowerCase() == command) ||
            candidate.command.aliases.some((alias) => command == alias),
    );
}

export function find_modal_handler(modal_id: string, tree: CommandTree): CommandModal {
    const a = find_command_with(
        tree,
        (candidate) =>
            ('slash_command' in candidate.command &&
                candidate.command.slash_command &&
                'modal_name' in candidate.command.slash_command &&
                candidate.command.slash_command.modal_name == modal_id) ||
            false,
    );
    return a?.slash_command as CommandModal;
}

export function find_something(command: string, tree: CommandTree): Command | CommandTree | undefined {
    for (const candidate of tree.commands) {
        console.log(candidate);
        if ('name' in candidate) {
            if (candidate.name == command || candidate.command.aliases.some((alias) => command == alias)) {
                return candidate.command;
            }
        } else if (candidate.group == command) {
            return candidate;
        } else {
            const result = find_something(command, candidate);
            if (result) {
                return result;
            }
        }
    }
}

export function drill_until_found_something(needles: string[], tree: CommandTree): CommandTree | Command | undefined {
    let working_with = tree;
    for (const needle of needles) {
        let found = false;
        for (const candidate of working_with.commands) {
            if ('name' in candidate) {
                if (candidate.name == needle) {
                    return candidate.command;
                }
            } else {
                console.log(candidate.group, candidate.group == needle);
                if (candidate.group == needle) {
                    working_with = candidate;
                    found = true;
                    break;
                }
            }
        }
        if (!found) {
            return;
        }
    }
    return working_with;
}

export type SlashCommandConfig = RESTPostAPIApplicationCommandsJSONBody;

export async function find_every_slash_command_config(
    tree: CommandTree,
    guild_id: string,
    db: IDB,
): Promise<Array<SlashCommandConfig>> {
    let results: Array<SlashCommandConfig> = [];
    for (const candidate of tree.commands) {
        if ('name' in candidate) {
            if (candidate.command.slash_command) {
                const name = candidate.name.toLowerCase();
                const description = candidate.command.help_text;
                const builder = new SlashCommandBuilder().setName(name).setDescription(description);
                results.push(await candidate.command.slash_command.config(builder, guild_id, db));
            }
        } else {
            const result = await find_every_slash_command_config(candidate, guild_id, db);
            results = results.concat(result);
        }
    }
    return results;
}

async function getSlashCommandsFromCustomCommands(db: IDB, guild: string) {
    const commandNames = await getEveryCustomCommandName.run({ server_id: guild }, db);
    return commandNames.map((x) => new SlashCommandBuilder().setName(x.name).setDescription(x.name).toJSON());
}

export async function register_commands_for(client: Client, guild: string, rest: REST, db: IDB): Promise<void> {
    const foundCommands = await get_commands_in(path.join(__dirname, 'commands'));
    const [customCommands, slashCommands] = await Promise.all([
        getSlashCommandsFromCustomCommands(db, guild),
        find_every_slash_command_config(foundCommands, guild, db),
    ]);
    const commands = customCommands.concat(slashCommands).concat(
        new SlashCommandBuilder()
            .setName('help')
            .setDescription('shows help text')
            .addStringOption((x) => x.setName('search').setDescription('What command/group to search for'))
            .toJSON(),
    );
    if (!client.user) {
        throw new Error('No user for the given client. Maybe not logged in?');
    }
    //'762689570848243712'
    await rest.put(Routes.applicationGuildCommands(client.user?.id, guild), {
        body: commands,
    });
}
