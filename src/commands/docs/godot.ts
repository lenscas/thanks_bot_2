import { create_command } from '../../command';
import { create_documentation_url } from './_base';

const godot_doc_url = 'https://docs.godotengine.org/en/stable/classes/class_';

export const command = create_command(
    async ({ args }) => {
        return create_documentation_url(args, godot_doc_url, (x) => x.toLowerCase());
    },
    'Returns a link to the documentation for a specific godot class.',
    ['gdhelp', 'gd', 'godothelp', 'gddocs', 'gdocs'],
);
