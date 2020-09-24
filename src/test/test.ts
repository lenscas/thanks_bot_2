import { Pool } from "pg"
import { testQuery } from "./test.queries"

export async function test(pool: Pool) {
    let connection = pool.connect()
    let x = await testQuery.run(undefined, pool)
    console.log(x)
}