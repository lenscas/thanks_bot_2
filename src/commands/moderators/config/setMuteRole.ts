import { create_moderator_command } from '../../../command';
import { setMuteRole } from '../queries.queries';

export const command = create_moderator_command(
    async ({ message, db }) => {
        if (message.mentions.roles.size > 1) {
            return 'Only 1 mute role can be set';
        }
        const role_id = message.mentions.roles.first()?.id;
        if (!role_id) {
            return 'Once the mute role is set it can not be unset. Set it to another role instead. The default is most likely wrong anyway.';
        }
        setMuteRole.run({ server_id: message.guild?.id, role_id }, db);
        return 'Done';
    },
    'Set a role to be used to mute people',
    ['setMut', 'muteRole'],
);
