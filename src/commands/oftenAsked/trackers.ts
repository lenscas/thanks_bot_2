import { create_command } from '../../command';

const message = `The **si=** is the tracking part of the URL and if you remove it it tracks less people.

With **si=** it makes it roughly the same length as a **youtube.com** URL *(and the whole point of youtu.be is to be __shorter__)*`;

export const command = create_command(
    async () => message,
    'Explains how and why to remove youtube tracking (so Greenfoot doesnt have to)',
    ['url', 'youtube'],
    undefined,
    undefined,
    {
        config: (x) => x.toJSON(),
        func: async () => ({ ephemeral: false, content: message }),
    },
);
