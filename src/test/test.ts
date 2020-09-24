import { Pool } from 'pg';
import { testQuery } from './test.queries';

export async function test(pool: Pool): Promise<undefined> {
    const x = await testQuery.run(undefined, pool);
    console.log(x);
    return;
}
