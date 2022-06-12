import { Client, Intents } from 'discord.js';

import db_config from '../database.json';
import { commandPrefix, discordToken } from '../config.json';
import {
    get_commands_in,
    find_command,
    FillServersWithoutCommands,
    CommandTree,
    find_every_slash_command,
} from './command';
import path from 'path';
import { help } from './help';
import { PoolWrapper } from './db';
import { enableGhostPingDetection } from './ghostPingDetection';
import { dealWithPossibleSubmission } from './hiddenSubmissionTrigger';
import { getCommandToRun } from './queries.queries';
import { checkSpam } from './protection/spam';
import { loadCheckScam } from './protection/scam';
import { setMutesAgain } from './commands/moderators/mute';
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v10';

const rest = new REST().setToken(discordToken);

const client = new Client({
    intents: new Intents([Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_MESSAGES]),
});

(async () => {
    const commands = await get_commands_in(path.join(__dirname, 'commands'));
    const db = new PoolWrapper(db_config.dev);
    const checkScam = await loadCheckScam();
    await FillServersWithoutCommands(db);
    await client.login(discordToken);
    await setMutesAgain(db, client);
    await register_slash_commands(client, commands);
    client.on('interactionCreate', async (interaction) => {
        if (!interaction.isCommand()) return;

        const command = find_command(interaction.commandName, commands, true);
        if (command && command.slash_command) {
            const res = await command.slash_command.func({ db, client, interaction });
            if (res) {
                await interaction.reply(res);
            }
        }
    });
    client.on('messageCreate', async (message) => {
        try {
            if (await checkSpam(message)) {
                return;
            }
            if (!dealWithPossibleSubmission(message, db)) {
                return;
            }
            await checkScam(message, client, db);
            if (!message.content.startsWith(commandPrefix)) return;

            const messageArray = (message.content.split('\n')[0] ?? '').split(' ');

            const cmd = messageArray[0].replace(commandPrefix, '');
            const args = messageArray.slice(1);
            const create_params = { args, client, db, message };
            if (cmd == 'help') {
                await help(create_params, commands, db, message.guild?.id);
                return;
            }

            const command = find_command(cmd, commands);
            if (!command && message.channel && message.guild) {
                const res = await getCommandToRun.run(
                    { name: cmd, channel: message.channel.id, server_id: message.guild.id },
                    db,
                );
                if (res[0]) {
                    message.channel.send(res[0].message);
                }
            }
            if (await command?.check(create_params)) {
                const res = await command?.run(create_params);
                if (res) {
                    message.channel.send(res);
                }
            }
        } catch (e) {
            console.error(e);
            await message.channel.send('Something has gone wrong :(');
        }
    });
    enableGhostPingDetection(client);
})();

async function register_slash_commands(client: Client, commands: CommandTree) {
    const slash_commands = find_every_slash_command(commands).map((x) => {
        return x.command.slash_command?.config;
    });
    try {
        if (!client.user) {
            throw new Error('No user for the given client. Maybe not logged in?');
        }
        await rest.put(Routes.applicationGuildCommands(client.user?.id, '762689570848243712'), {
            body: slash_commands,
        });
    } catch (e) {
        console.error('Error while registering slash commands');
        console.error(e);
    }
}
