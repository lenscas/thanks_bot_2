import { create_moderator_command } from '../../../command';
import { peopleWhoSendPossibleScam } from '../../../protection/scam';

export const command = create_moderator_command(async ({ message }) => {
    const guild = message.guild;
    if (!guild) {
        return;
    }
    const guildObj = peopleWhoSendPossibleScam[guild.id] || {};
    message.mentions.members?.each((x) => delete guildObj[x.id]);
    return 'removed the strike';
}, 'Removes the strike of a scam message.');
