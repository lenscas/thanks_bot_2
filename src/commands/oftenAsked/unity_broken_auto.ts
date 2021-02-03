import { create_command } from '../../command';

export const command = create_command(
    async ({}) => {
        return `Unity's autocomplete is often broken. Don't worry, there are fixes. Maybe this thread helps?
        <https://forum.unity.com/threads/intellisense-not-working-with-visual-studio-fix.836599/>
        `;
    },
    "Gives a link that should help with fixing unity's autocomplete.",
    ['fixUnityAuto', 'FUA'],
);

//
