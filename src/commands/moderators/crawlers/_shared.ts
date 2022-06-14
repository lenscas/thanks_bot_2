import { IDB } from '../../../db';
import { deleteOldLogs, logNewMessage } from './queries.queries';

export class Waiter {
    did = 0;
    logger: (message: string) => Promise<void>;
    constructor(logger: (message: string) => Promise<void>) {
        this.logger = logger;
    }
    /**
     * Wait
     */
    public async Wait(): Promise<void> {
        this.did++;
        const waitTime = (1 + Math.floor(this.did / 10)) * 1000;
        await this.logger('start waiting');
        await new Promise((res) => setTimeout(res, waitTime));
        await this.logger('done waiting');
        return;
        //return new Promise((res) => setTimeout(res, waitTime));
    }
    public async WaitLog(message: string): Promise<void> {
        await this.Wait();
        await this.logger(message);
    }
}

export async function create_log(for_log: number, db: IDB): Promise<(message: string) => Promise<void>> {
    await deleteOldLogs.run({ for: for_log }, db);
    return async function (message: string): Promise<void> {
        await logNewMessage.run({ for: for_log, message }, db);
    };
}

export type Diffrence<T, T2> = {
    toDelete: T[];
    toKeep: T2[];
};

export function getDiffrence<T, T2>(old: T[], newE: T2[], compare: (old: T, newE: T2) => boolean): Diffrence<T, T2> {
    const toDelete = old.filter((x) => newE.every((y) => !compare(x, y)));
    const toKeep = newE.filter((x) => old.every((y) => compare(y, x)));
    return {
        toDelete,
        toKeep,
    };
}
