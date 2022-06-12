import { APIApplicationCommandOptionChoice, PermissionFlagsBits } from 'discord-api-types/v10';
import { CommandParams, create_moderator_command, register_commands_for } from '../../../command';
import { getEveryCustomCommandName } from '../../../queries.queries';
import { deleteCommand } from '../queries.queries';

const commandFunc = async ({ client, rest, db }: CommandParams, name: string, server_id: string) => {
    await deleteCommand.run({ name: name, server_id }, db);
    await register_commands_for(client, server_id, rest, db);
    return `Successfully deleted ${name}`;
};

export const command = create_moderator_command(
    async (params) => {
        const name = params.args[0];
        if (!name) {
            return 'Must provide the name for the command to delete';
        }
        if (!params.message.guild) {
            return;
        }
        return await commandFunc(params, name, params.message.guild.id);
    },
    `Deletes a custom command.`,
    undefined,
    undefined,
    {
        config: async (builder, guild_id, db) => {
            const names: Array<APIApplicationCommandOptionChoice<string>> = await getEveryCustomCommandName
                .run({ server_id: guild_id }, db)
                .then((x) =>
                    x.map((x) => ({
                        name: x.name,
                        value: x.name,
                    })),
                );
            return builder
                .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
                .addStringOption((x) =>
                    x
                        .setName('command_name')
                        .setDescription('Command to delete')
                        .addChoices(...names)
                        .setRequired(true),
                )
                .toJSON();
        },
        func: async (params) => {
            const interaction = params.interaction;
            if (!interaction.guild) {
                return;
            }
            const commandToDelete = interaction.options.getString('command_name', true);
            return {
                ephemeral: true,
                content: await commandFunc(params, commandToDelete, interaction.guild.id),
            };
        },
    },
);
