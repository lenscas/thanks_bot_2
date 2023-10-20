import { create_command_for_command_channel } from '../../command';
import { Client, Guild, MessageEmbed, MessageOptions, MessagePayload, User } from 'discord.js';

const commandFunc = async (person_to_get_pfp_from: User) => {
    const img = person_to_get_pfp_from.displayAvatarURL({ size: 2048, dynamic: true });
    return new MessageEmbed()
        .setTitle(`${person_to_get_pfp_from.username}'s avatar`)
        .setImage(img)
        .setColor('NOT_QUITE_BLACK')
        .setAuthor(person_to_get_pfp_from.username);
};

export const command = create_command_for_command_channel(
    async ({ message }) => {
        if (!message.guild) {
            return;
        }
        const user = message.mentions.users.first();
        if (!user) {
            return 'You have to ping the person you want to get the image from';
        }
        const embed = await commandFunc(user);
        const payload: MessageOptions = { embeds: [embed] };
        return payload;
    },
    'Gets someones pfp',
    [],
    undefined,
    {
        config: (x) =>
            x
                .addUserOption((x) => x.setName('user').setRequired(true).setDescription('User you want the pfp from'))
                .toJSON(),
        func: async ({ interaction }) => {
            if (!interaction.guild) {
                return;
            }
            const user = interaction.options.getUser('user');
            if (!user) {
                return { ephemeral: true, content: 'You have to supply an user you want the pfp for' };
            }
            const embed = await commandFunc(user);
            return {
                ephemeral: true,
                embeds: [embed],
            };
        },
    },
);
