import { create_command } from '../../command';

export const command = create_command(
    async ({ message }) => {
        await message.channel.send(`**__Learn The Basics of Programming__**
*These following courses explain the basics of programming, and give you a solid base.*

<https://www.edx.org/course/cs50s-introduction-computer-science-harvardx-cs50x>
<https://www.reddit.com/r/learnprogramming/comments/61oly8/new_read_me_first/>
<https://www.reddit.com/r/learnprogramming/wiki/faq#wiki_getting_started>

*This server is not affiliated with these courses in any way.*`);
    },
    'Gives handy programming links',
    ['learn'],
);
