import { create_command } from '../../command';

const message = `**__Learn The Basics of Programming__**
*These following courses explain the basics of programming, and give you a solid base.*

<https://www.edx.org/course/cs50s-introduction-computer-science-harvardx-cs50x>
<https://www.reddit.com/r/learnprogramming/comments/61oly8/new_read_me_first/>
<https://www.reddit.com/r/learnprogramming/wiki/faq#wiki_getting_started>

*I am not affiliated with these courses in any way.*`;

export const command = create_command(
    async () => message,
    'Gives handy programming links',
    ['learn'],
    undefined,
    undefined,
    {
        config: (x) => x.toJSON(),
        func: async () => ({ ephemeral: false, content: message }),
    },
);
