import {
    CommandTree,
    drill_until_found_something,
    Command,
    find_something,
    create_limit_to_command_channel_check,
    CommandParams,
} from './command';

const start_message =
    "Hello! GameDev!\n\
I'm here to keep track of who is helpful so the mods can reward them with a special role.\n\
Did you recently get help and want to show your appreciation? Use the !thx command.\n\
If you want more information about a specific command, just pass the command as argument (!help thx).\n";

const check_command_channel = create_limit_to_command_channel_check();
export async function help(params: CommandParams, commandTree: CommandTree): Promise<void> {
    if (!params.message.guild || !(await check_command_channel(params))) {
        console.log('got here?');
        return;
    }
    const { message, args } = params;
    if (args.length == 0) {
        await message.channel.send([start_message].concat(render_group(commandTree)));
    } else {
        const found_something =
            args.length == 1 ? find_something(args[0], commandTree) : drill_until_found_something(args, commandTree);
        if (!found_something) {
            await message.channel.send('Could not find that group/command');
            return;
        }
        if ('run' in found_something) {
            await message.channel.send(found_something.help_text);
        } else {
            await message.channel.send(render_group(found_something));
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
