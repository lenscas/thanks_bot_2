import { create_command } from '../../command';

const text = `Unity's autocomplete is often broken. Don't worry, there are fixes. Maybe this thread helps?
<https://forum.unity.com/threads/intellisense-not-working-with-visual-studio-fix.836599/>`;

export const command = create_command(
    async () => text,
    "Gives a link that should help with fixing unity's autocomplete.",
    ['fixUnityAuto', 'FUA', 'unity_broken_auto'],
    undefined,
    undefined,
    { config: (x) => x.toJSON(), func: async () => ({ ephemeral: false, content: text }) },
);

//
