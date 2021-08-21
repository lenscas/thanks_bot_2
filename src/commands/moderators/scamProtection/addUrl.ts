import { create_moderator_command } from '../../../command';
import { addUrlToWhitelist } from './queries.queries';

export const command = create_moderator_command(async ({ db, args }) => {
    const url = args[0];
    if (!url) {
        return 'Missing the url parameter';
    }
    try {
        await addUrlToWhitelist.run({ url }, db);
        return `url : ${url} added to the whitelist`;
    } catch (e) {
        console.error(e);
        return 'Something has gone wrong while adding the url';
    }
}, 'Add a new url to the list of safe urls');
