import { Pool } from 'pg';
import { testQuery, ITestQueryResult } from './test.queries';

export async function test(pool: Pool): Promise<ITestQueryResult[]> {
    const x = await testQuery.run(undefined, pool);
    return x;
}
