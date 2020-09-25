import { Pool, PoolClient } from 'pg';
import { Readable, Writable } from 'stream';

const pool_client_mocked: PoolClient = {
    addListener() {
        return this;
    },
    async connect() {
        return;
    },
    copyFrom() {
        return new Writable();
    },
    copyTo() {
        return new Readable();
    },
    emit() {
        return false;
    },
    escapeIdentifier(str) {
        return str;
    },
    escapeLiteral(str) {
        return str;
    },
    eventNames() {
        return [];
    },
    getMaxListeners() {
        return 10;
    },
    listenerCount() {
        return 10;
    },
    listeners() {
        return [];
    },
    off() {
        return this;
    },
    on() {
        return this;
    },
    once() {
        return this;
    },
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    pauseDrain() {},
    prependListener() {
        return this;
    },
    prependOnceListener() {
        return this;
    },
    query<T>() {
        console.error('pool.query got executed. Returning undefined');
        console.trace();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return (undefined as any) as T;
    },
    rawListeners() {
        return [];
    },
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    release() {},
    removeAllListeners() {
        return this;
    },
    removeListener() {
        return this;
    },
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    resumeDrain() {},
    setMaxListeners() {
        return this;
    },
};

export const mocked_pool: Pool = {
    addListener() {
        return this;
    },
    async connect() {
        return pool_client_mocked;
    },
    emit() {
        return false;
    },
    async end() {
        return;
    },
    eventNames() {
        return [''];
    },
    getMaxListeners() {
        return 10;
    },
    listenerCount() {
        return 10;
    },
    listeners() {
        return [];
    },
    off() {
        return this;
    },
    idleCount: 10,
    on() {
        return this;
    },
    once() {
        return this;
    },
    prependListener() {
        return this;
    },
    prependOnceListener() {
        return this;
    },
    query<T>() {
        console.error('pool.query got executed. Returning undefined');
        console.trace();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return (undefined as any) as T;
    },
    rawListeners() {
        return [];
    },
    removeAllListeners() {
        return this;
    },
    removeListener() {
        return this;
    },
    setMaxListeners() {
        return this;
    },
    totalCount: 10,
    waitingCount: 10,
};
