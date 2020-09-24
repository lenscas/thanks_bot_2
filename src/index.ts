import { Pool } from "pg"
import { test } from "./test/test"

let db_config = require("../database.json") as {
    dev: any
}


const pool = new Pool(db_config.dev)

console.log("Hello world")
test(pool)