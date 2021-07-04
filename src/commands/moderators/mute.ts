import { create_command } from '../../command';
import { addMuteRole, getMutedRoleId } from './_base';

export const command = create_command(
    async ({ message, args, db }) => {
        const mentioned = message.mentions.members?.array();
        const guild = message.guild;
        if (!guild) {
            return;
        }
        if (!mentioned || mentioned.length == 0) {
            return "can't mute people without knowing WHO to mute. Please ping the user(s) who need to be muted";
        }
        const to_mute_for = args.map((x) => Number(x)).find((x) => !isNaN(x) && x < 10 && x > 0);
        if (!to_mute_for) {
            return 'Please give a time less than 10';
        }
        const res = await Promise.all(mentioned.map((x) => addMuteRole(x, guild, message.channel, db)));
        if (res) {
            setTimeout(async () => {
                const muteRole = await getMutedRoleId(guild, db);
                if (!muteRole) {
                    return;
                }
                await Promise.all(mentioned.map((x) => x.roles.remove(muteRole)));
            }, to_mute_for * 60000);
        }
    },
    'Mutes one or more people for X minutes',
    [],
    async ({ message }) => {
        return message.member?.hasPermission('MANAGE_ROLES') ?? false;
    },
);
