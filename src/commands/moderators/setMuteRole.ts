import { create_moderator_command } from '../../command';
import { setMuteRole } from './queries.queries';

export const command = create_moderator_command(
    async ({ message, db }) => {
        const mentionedRolesAsArr = message.mentions.roles.array();
        if (mentionedRolesAsArr.length > 1) {
            return 'Only 1 mute role can be set';
        }
        if (mentionedRolesAsArr.length == 0) {
            return 'Once the mute role is set it can not be unset. Set it to another role instead. The default is most likely wrong anyway.';
        }
        await setMuteRole.run({ server_id: message.guild?.id, role_id: mentionedRolesAsArr[0].id }, db);
        return 'Done';
    },
    'Set a role to be used to mute people',
    ['setMut', 'muteRole'],
);
