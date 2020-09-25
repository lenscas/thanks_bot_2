import { Pool, PoolClient, PoolConfig } from 'pg';

export class ClientWrapper {
    onTransactionError: 'rollback' | 'commit' = 'rollback';
    onTransactionSuccess: 'rollback' | 'commit' = 'commit';
    client: PoolClient;

    constructor(client: PoolClient | ClientWrapper) {
        if ('client' in client) {
            this.client = client.client;
        } else {
            this.client = client;
        }
    }

    newLayer = (): ClientWrapper => new ClientWrapper(this);

    startTransaction = async <T>(func: (client: ClientWrapper) => Promise<T>): Promise<T> => {
        this.onTransactionError = 'rollback';
        this.onTransactionSuccess = 'commit';
        await this.client.query('BEGIN');
        try {
            const res = await func(this);
            await this.client.query(this.onTransactionSuccess);
            return res;
        } catch (e) {
            await this.client.query(this.onTransactionError);
            throw e;
        }
    };
}

export class PoolWrapper extends Pool {
    constructor(config: PoolConfig) {
        super(config);
    }
    getCon = async <T>(func: (client: ClientWrapper) => Promise<T>): Promise<T> => {
        const connection = await this.connect();
        const wrapper = new ClientWrapper(connection);
        try {
            const res = await func(wrapper);
            return res;
        } finally {
            connection.release();
        }
    };
    prepare = async <T>(func: (client: ClientWrapper) => Promise<T>): Promise<T> => {
        return this.getCon((v) => v.startTransaction(func));
    };
}
