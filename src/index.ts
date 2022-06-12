import { Client, Intents, Modal } from 'discord.js';

import db_config from '../database.json';
import { commandPrefix, discordToken } from '../config.json';
import {
    get_commands_in,
    find_command,
    FillServersWithoutCommands,
    register_commands_for,
    find_modal_handler,
} from './command';
import path from 'path';
import { help_through_message, help_through_slash } from './help';
import { PoolWrapper } from './db';
import { enableGhostPingDetection } from './ghostPingDetection';
import { dealWithPossibleSubmission } from './hiddenSubmissionTrigger';
import { getCommandToRun } from './queries.queries';
import { checkSpam } from './protection/spam';
import { loadCheckScam } from './protection/scam';
import { setMutesAgain } from './commands/moderators/mute';
import { REST } from '@discordjs/rest';

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
    await register_slash_commands(client, db);
    client.on('interactionCreate', async (interaction) => {
        try {
            if (interaction.isModalSubmit()) {
                const command = find_modal_handler(interaction.customId, commands);
                try {
                    const res = await command.modal_handler({ db, client, interaction, rest });
                    if (res) {
                        interaction.reply(res);
                    }
                } catch (e) {
                    interaction.reply({ ephemeral: true, content: `Something has gone wrong. Error:${e}` });
                }
            }
            if (!interaction.isCommand()) return;
            if (interaction.commandName == 'help') {
                await help_through_slash({ db, client, interaction, rest }, commands);
                return;
            }
            const command = find_command(interaction.commandName, commands, true);
            if (command && command.slash_command) {
                if ('func' in command.slash_command) {
                    const res = await command.slash_command.func({ db, client, interaction, rest });
                    if (res) {
                        await interaction.reply(res);
                    }
                } else {
                    const builder = command.slash_command.modal_builder(
                        new Modal().setCustomId(command.slash_command.modal_name),
                    );
                    interaction.showModal(builder);
                }
            } else {
                console.log('got here!?');
                console.log(interaction.commandName, interaction.channel?.id, interaction.guild?.id);
                const res = await getCommandToRun.run(
                    {
                        name: interaction.commandName,
                        channel: interaction.channel?.id,
                        server_id: interaction.guild?.id,
                    },
                    db,
                );
                console.log(res);
                if (res[0]) {
                    await interaction.reply(res[0].message);
                }
            }
        } catch (e) {
            if (interaction.isRepliable()) {
                await interaction.reply(`Something has gone wrong.\nError:\n {e}`);
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
            const create_params = { args, client, db, message, rest };
            if (cmd == 'help') {
                await help_through_message(create_params, commands);
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
                    await message.channel.send(res);
                }
            }
        } catch (e) {
            console.error(e);
            await message.channel.send('Something has gone wrong :(');
        }
    });
    enableGhostPingDetection(client);
})();

async function register_slash_commands(client: Client, db: PoolWrapper) {
    try {
        const guilds = await client.guilds.fetch();
        for (const [guild] of guilds) {
            console.log(guild);
            await register_commands_for(client, guild, rest, db);
            console.log(guild);
        }
    } catch (e) {
        console.error('Could not register commands!');
        throw e;
    }
}
