import { Guild } from 'discord.js';
import {
    CommandTree,
    drill_until_found_something,
    Command,
    find_something,
    create_limit_to_command_channel_check,
    TextCommandParams,
    isServerInDisableList,
    SlashCommandParams,
} from './command';
import { checkIfCommandExists } from './commands/moderators/queries.queries';
import { PoolWrapper } from './db';
import { getEveryCustomCommandName } from './queries.queries';

const start_message =
    "Hello! GameDev!\n\
I'm here to keep track of who is helpful so the mods can reward them with a special role.\n\
Did you recently get help and want to show your appreciation? Use the !thx command.\n\
If you want more information about a specific command, just pass the command as argument (!help thx).\n";

const check_command_channel = create_limit_to_command_channel_check();
export async function getHelpText(
    guild: Guild,
    db: PoolWrapper,
    commandTree: CommandTree,
    command: Array<string> | undefined,
): Promise<string> {
    if (!command) {
        const custom_commands = await getCustomCommands(guild.id, db).then(
            (custom_commands) =>
                'CustomCommands: ' +
                [custom_commands[0], custom_commands[1], custom_commands[2], custom_commands[4]]
                    .map((v) => '`' + v + '`')
                    .join(','),
        );
        return [start_message].concat(render_group(commandTree).concat(custom_commands)).join('\n');
    }
    let found_something: string[] | Command | CommandTree | undefined;
    if (command.length == 1 && guild.id && command[0] == 'CustomCommands') {
        found_something = await getCustomCommands(guild.id, db);
    } else {
        found_something =
            command.length == 1
                ? find_something(command[0], commandTree)
                : drill_until_found_something(command, commandTree);
    }
    if (!found_something) {
        if (guild.id) {
            const doesNameExist =
                (await checkIfCommandExists.run({ name: command[0], server_id: guild.id }, db))[0].count != '0';
            console.log(doesNameExist);
            if (doesNameExist) {
                found_something = {
                    aliases: [],
                    check: async () => true,
                    help_text: 'This is a custom command. It has no input and will always produce the same output.',
                    // eslint-disable-next-line @typescript-eslint/no-empty-function
                    run: async () => {},
                };
            }
        }
    }
    if (!found_something) {
        return 'Could not find that group/command';
    } else if ('run' in found_something) {
        return found_something.help_text;
    } else if (Array.isArray(found_something)) {
        return ['**Commands**'].concat(found_something.map((v) => '`' + v + '`')).join('\n');
    } else {
        return render_group(found_something).join('\n');
    }
}

export async function help_through_message(params: TextCommandParams, commandTree: CommandTree): Promise<void> {
    if (!params.message.guild) {
        return;
    }
    if (isServerInDisableList(params.message.guild.id)) {
        return;
    }
    if (!(await check_command_channel(params))) {
        return;
    }
    await params.message.reply(await getHelpText(params.message.guild, params.db, commandTree, params.args));
}
export async function help_through_slash(params: SlashCommandParams, commandTree: CommandTree): Promise<void> {
    if (!params.interaction.guild) {
        return;
    }
    const res = params.interaction.options.getString('search');
    const toSearchFor = res ? [res] : undefined;
    await params.interaction.reply({
        ephemeral: true,
        content: await getHelpText(params.interaction.guild, params.db, commandTree, toSearchFor),
    });
}

export function render_group(commandTree: CommandTree): string[] {
    const commands: Array<string> = [];
    const groups: Array<string> = [];
    commandTree.commands.forEach((v) => {
        if ('name' in v) {
            commands.push(`\`${v.name}\``);
        } else {
            const filtered = v.commands.filter((x): x is { name: string; command: Command } => {
                return 'name' in x;
            });
            const maxCommandsShown = 4;
            groups.push(
                v.group +
                    ' : ' +
                    filtered.slice(0, maxCommandsShown).map((x) => '`' + x.name + '`') +
                    (filtered < v.commands || filtered.length > maxCommandsShown ? '+ more' : ''),
            );
        }
    });
    return (commands.length > 0 ? ['**Commands** :'].concat(commands) : []).concat(
        groups.length > 0 ? ['**Groups** :'].concat(groups) : [],
    );
}
export async function getCustomCommands(server_id: string, db: PoolWrapper): Promise<string[]> {
    const res = await getEveryCustomCommandName.run({ server_id }, db);
    return res.map((v) => v.name);
}
