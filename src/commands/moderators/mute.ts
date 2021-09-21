import { Client } from 'discord.js';
import { create_command } from '../../command';
import { PoolWrapper } from '../../db';
import { deleteMute, getMutes, insertMute } from './queries.queries';
import { addMuteRole, getMutedRole } from './_base';

export const command = create_command(
    async ({ message, args, db }) => {
        const guild = message.guild;
        if (!guild) {
            return;
        }
        if (!message.mentions.members || message.mentions.members.size == 0) {
            return "can't mute people without knowing WHO to mute. Please ping the user(s) who need to be muted";
        }
        const to_mute_for = args.map((x) => Number(x)).find((x) => !isNaN(x) && x > 0);
        if (!to_mute_for) {
            return 'Please give a number equal to the amount of minutes that this person needs to be muted for.';
        }
        const res = await Promise.all(
            message.mentions.members.map(async (x): Promise<string> => {
                try {
                    const z = await addMuteRole(x, guild, message.channel, db);
                    if (z[0]) {
                        const role = z[1];
                        const muteTime = to_mute_for * 60000;
                        setTimeout(async () => {
                            await deleteMute.run({ server_id: guild.id, user_id: x.id }, db);
                            await x.roles.remove(role);
                        }, muteTime);
                        const end_date = new Date(Date.now() + muteTime);
                        await insertMute.run({ end_date, server_id: guild.id, user_id: x.id }, db);
                        const formattedDate = new Intl.DateTimeFormat('nl-NL', {
                            year: 'numeric',
                            month: 'numeric',
                            day: 'numeric',
                            hour: 'numeric',
                            minute: 'numeric',
                            second: 'numeric',
                            timeZoneName: 'short',
                        }).format(end_date);
                        return `Muted ${x.toString()} until ${formattedDate}`;
                    }
                    return `Failed to mute ${x.toString()}, could not add mute role (check configuration!)`;
                } catch (e) {
                    return `Failed to mute ${x.toString()}, reason:\n${e}\n`;
                }
            }),
        );
        return res.join('\n');
    },
    'Mutes one or more people for X minutes',
    [],
    async ({ message }) => {
        return message.member?.permissions.has('MANAGE_ROLES') ?? false;
    },
);

export const setMutesAgain = async (db: PoolWrapper, client: Client): Promise<void> => {
    const mutedPeople = await getMutes.run(undefined, db);
    const now = Date.now();
    for (let i = 0; i < mutedPeople.length; i++) {
        const person = mutedPeople[i];
        console.log(person);

        let timeLeft = person.end_date.getTime() - now;
        if (timeLeft <= 0) {
            timeLeft = 1;
        }
        console.log(timeLeft);
        try {
            setTimeout(async () => {
                try {
                    const guild = await client.guilds.fetch(person.server_id);
                    if (!guild) {
                        return;
                    }
                    const member = await guild?.members.fetch(person.user_id);
                    await deleteMute.run({ server_id: guild.id, user_id: person.user_id }, db);
                    const role = await getMutedRole(guild, db);
                    if (!role) {
                        return;
                    }
                    await member.roles.remove(role);
                } catch (e) {
                    console.error(e);
                }
            }, timeLeft);
        } catch (_) {}
    }
};
