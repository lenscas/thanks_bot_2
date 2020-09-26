import { Client, Message } from 'discord.js';
import { readdir, lstat } from 'fs/promises';
import path from 'path';
import { PoolWrapper } from './db';

export type CommandParams = {
    client: Client;
    message: Message;
    args: string[];
    db: PoolWrapper;
};

export type Command = {
    aliases: string[];
    help_text: string;
    check: (params: CommandParams) => Promise<boolean>;
    run: (params: CommandParams) => Promise<void>;
};

export function create_command(
    run: Command['run'],
    help_text: Command['help_text'],
    aliases?: Command['aliases'],
    check?: Command['check'],
): Command {
    return {
        run,
        help_text,
        aliases: aliases ?? [],
        check: check ?? (async () => true),
    };
}

export function create_mod_command(
    run: Command['run'],
    help_text: Command['help_text'],
    aliases?: Command['aliases'],
    check?: Command['check'],
): Command {
    return create_command(run, help_text, aliases, check);
}

export type CommandTree = { group: string; commands: Array<{ name: string; command: Command } | CommandTree> };

export async function get_commands_in(dir: string, group = ''): Promise<CommandTree> {
    const files = await readdir(dir);
    console.log(files);
    const commands = await Promise.all(
        (
            await Promise.all(
                files.map(async (file) => {
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
            .filter((x) => x.file.isDirectory() || x.parsed_path.ext != '.sql')
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

export function find_command(command: string, tree: CommandTree): Command | undefined {
    console.log(tree);
    for (const candidate of tree.commands) {
        if ('name' in candidate) {
            console.log(candidate, command);
            if (candidate.name == command || candidate.command.aliases.some((alias) => command == alias)) {
                return candidate.command;
            }
        } else {
            const found = find_command(command, candidate);
            if (found) {
                return found;
            }
        }
    }
}

export function find_something(command: string, tree: CommandTree): Command | CommandTree | undefined {
    for (const candidate of tree.commands) {
        console.log(candidate);
        if ('name' in candidate) {
            console.log(candidate, command);
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
    console.log(tree);
    console.log(needles);
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
