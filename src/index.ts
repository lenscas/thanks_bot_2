import { Pool } from 'pg';
import { test } from './test/test';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const db_config = require('../database.json') as {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    dev: any;
};

const pool = new Pool(db_config.dev);

console.log('Hello world');
test(pool);
