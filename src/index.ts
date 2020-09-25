import { Pool } from 'pg';
import { test } from './test/test';
import db_config from '../database.json';

const pool = new Pool(db_config.dev);

console.log('Hello world');
test(pool);
