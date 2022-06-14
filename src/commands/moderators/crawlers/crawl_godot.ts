import axios from 'axios';
import { PermissionFlagsBits } from 'discord-api-types/v10';
import { create_moderator_command } from '../../../command';
import { PoolWrapper } from '../../../db';
import {
    deleteOldMethod,
    deleteRemovedClassNames,
    getAllDocClasses,
    getLastCrawledTime,
    getMethodsOfClass,
    insertNewClassName,
    insertNewMethod,
    setCrawledTime,
} from './queries.queries';
import { parse } from 'node-html-parser';
import { create_log, getDiffrence, Waiter } from './_shared';

const name = 'godot';
const godotUrl = 'https://docs.godotengine.org/en/stable/';

const commandFunc = async (db: PoolWrapper, password: string) => {
    if (password != 'please') {
        return 'I am not going to crawl without a please!';
    }
    const lastTime = await getLastCrawledTime
        .run({ name }, db)
        .then((x) => (x[0] ? x[0].last_time_crawled : new Date(0)));
    const toCompareAgainst = new Date();
    toCompareAgainst.setHours(toCompareAgainst.getHours() - 2);
    if (lastTime > toCompareAgainst) {
        return 'Too recent since last crawl';
    }
    const doc_id = await setCrawledTime.run({ name }, db).then((x) => {
        return x[0].id;
    });
    const logger = await create_log(doc_id, db);
    const waiter = new Waiter(logger);
    await logger(`Started work for ${name}`);
    setTimeout(async () => {
        try {
            const base = await axios.get(godotUrl + 'classes/index.html');
            const parsed = parse(base.data);
            const urls = parsed
                .getElementById('toc-class-ref')
                .querySelectorAll('a.reference')
                .map((x) => [x.text, x.attributes['href']]);
            const currentKnownClasses = await getAllDocClasses.run({ for: doc_id }, db);
            const newClassNames = urls.map((x) => x[0]);
            const { toDelete, toKeep } = getDiffrence(currentKnownClasses, newClassNames, (x, y) => x.class_name == y);
            for (const deleting of toDelete) {
                await logger(`deleting class name ${deleting.class_name}`);
                await deleteRemovedClassNames.run({ id: deleting.id }, db);
            }
            for (const name of toKeep) {
                await logger(`inserting class name ${name}`);
                await insertNewClassName.run({ name, site_id: doc_id }, db);
            }
            for (const [name, url] of urls) {
                await waiter.WaitLog(`Starting with class ${name}`);
                const classPageReq = await axios.get(godotUrl + `classes/${url}`);
                const classPageParsed = parse(classPageReq.data);
                const newMethods = classPageParsed
                    .querySelectorAll('section#method-descriptions ul.simple')
                    .concat(classPageParsed.querySelectorAll('section#property-descriptions ul.simple'))
                    .concat(classPageParsed.querySelectorAll('section#signals ul.simple'))
                    .map((methodHtml) => ({
                        id: methodHtml.attributes['id'],
                        name: methodHtml.querySelectorAll('p strong').find((x) => x.text != '(' && x.text != ')')?.text,
                    }));
                const oldMethods = await getMethodsOfClass.run({ class_name: name }, db);
                const { toDelete, toKeep } = getDiffrence(oldMethods, newMethods, (x, y) => x.method_name == y.name);
                for (const methodToDelete of toDelete) {
                    await logger(`deleting method  ${name}.${methodToDelete.method_name}`);
                    await deleteOldMethod.run({ class_name: name, method_name: methodToDelete.method_name }, db);
                }
                for (const methodToUpsert of toKeep) {
                    if (!methodToUpsert.name) {
                        await logger(`Could not find name for method with id ${methodToUpsert.id} of class ${name}`);
                        continue;
                    }
                    if (!methodToUpsert.id) {
                        await logger(`member ${name}.${methodToUpsert.name} has no id`);
                        continue;
                    }
                    await logger(`saving method ${name}.${methodToUpsert.name}`);
                    await insertNewMethod.run(
                        { class_name: name, element_id: methodToUpsert.id, method_name: methodToUpsert.name },
                        db,
                    );
                }
            }
        } catch (e) {
            await logger(String(e));
            await logger('Got an error');
            console.error(e);
        }
    });
    return 'Started crawler';
};

export const command = create_moderator_command(
    async ({ args, db }) => {
        return await commandFunc(db, args[0]);
    },
    'Starts crawling the godot documentation for autocomplete suggestions',
    undefined,
    undefined,
    {
        config: (x) =>
            x
                .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
                .addStringOption((x) =>
                    x.setName('confirm').setDescription('type `please` to confirm you want to crawl'),
                )
                .toJSON(),
        func: async ({ interaction, db }) => {
            return { ephemeral: true, content: await commandFunc(db, interaction.options.getString('confirm') ?? '') };
        },
    },
);
