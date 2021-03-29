import { checkIfChannelIsText } from '../_base';
import { create_moderator_command } from '../../../command';
import { updateSpamProtectionConfig } from './queries.queries';
import { getMuteRole } from '../queries.queries';

export const command = create_moderator_command(
    async ({ message, db, client }) => {
        if (message.mentions.roles.size != 1) {
            return `I need exactly 1 role mention to configure which role I need to use as a marker on who I muted.\nI still use the configured muted role to actually mute people`;
        }
        if (message.mentions.channels.size != 1) {
            return 'I need exactly 1 channel mention that I can use to put context in on why I muted people';
        }
        const channel = message.mentions.channels.array()[0].id;
        const check = await checkIfChannelIsText(client, channel);
        if (check !== true) {
            return check;
        }
        const roleId = message.mentions.roles.array()[0].id;
        await updateSpamProtectionConfig.run(
            { channel_id: channel, role_id: roleId, server_id: message.guild?.id },
            db,
        );
        const muteRole = (await getMuteRole.run({ server_id: message.guild?.id }, db))[0];
        if (!muteRole.mute_role) {
            return 'Spam protection set BUT no mute role configured.\nThis will result in the protection ***NOT*** working.\nuse !setMuteRole to configure a mute role.';
        }

        return 'Updated spam protection.';
    },
    'Sets up which role to use as a marker on who I muted and where to report cases to.',
    [],
);
