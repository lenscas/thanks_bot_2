import {
    CommandTree,
    drill_until_found_something,
    Command,
    find_something,
    create_limit_to_command_channel_check,
    CommandParams,
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
export async function help(
    params: CommandParams,
    commandTree: CommandTree,
    db: PoolWrapper,
    server_id?: string,
): Promise<void> {
    if (!params.message.guild || !(await check_command_channel(params))) {
        console.log('got here?');
        return;
    }
    const { message, args } = params;
    if (args.length == 0) {
        let custom_commands = '';
        if (server_id) {
            custom_commands = await getCustomCommands(server_id, db).then(
                (custom_commands) =>
                    'CustomCommands: ' +
                    [custom_commands[0], custom_commands[1], custom_commands[2], custom_commands[4]]
                        .map((v) => '`' + v + '`')
                        .join(','),
            );
        }
        await message.channel.send(
            [start_message].concat(render_group(commandTree).concat(custom_commands)).join('\n'),
        );
    } else {
        let found_something: string[] | Command | CommandTree | undefined;
        if (args.length == 1 && server_id && args[0] == 'CustomCommands') {
            found_something = await getCustomCommands(server_id, db);
        } else {
            found_something =
                args.length == 1
                    ? find_something(args[0], commandTree)
                    : drill_until_found_something(args, commandTree);
        }
        if (!found_something) {
            if (server_id) {
                const doesNameExist =
                    (await checkIfCommandExists.run({ name: args[0], server_id: server_id }, db))[0].count != '0';
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
            await message.channel.send('Could not find that group/command');
            return;
        }
        if ('run' in found_something) {
            await message.channel.send(found_something.help_text);
        } else if (Array.isArray(found_something)) {
            await message.channel.send(['**Commands**'].concat(found_something.map((v) => '`' + v + '`')).join('\n'));
        } else {
            await message.channel.send(render_group(found_something).join('\n'));
        }
    }
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
