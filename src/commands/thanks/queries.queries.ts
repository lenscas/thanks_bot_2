/** Types generated for queries found in "src/commands/thanks/queries.sql" */
import { PreparedQuery } from '@pgtyped/query';

/** 'Top' parameters type */
export interface ITopParams {
  user_id: string | null | void;
  server_id: string | null | void;
}

/** 'Top' return type */
export interface ITopResult {
  user_id: string;
  times: string;
}

/** 'Top' query type */
export interface ITopQuery {
  params: ITopParams;
  result: ITopResult;
}

const topIR: any = {"name":"top","params":[{"name":"user_id","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":75,"b":81,"line":4,"col":18}]}},{"name":"server_id","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":100,"b":108,"line":5,"col":17}]}}],"usedParamSet":{"user_id":true,"server_id":true},"statement":{"body":"SELECT user_id, times\nFROM thanked_users\nWHERE user_id != :user_id\nAND server_id = :server_id\nORDER BY times DESC\nLIMIT 10","loc":{"a":16,"b":137,"line":2,"col":0}}};

/**
 * Query generated from SQL:
 * ```
 * SELECT user_id, times
 * FROM thanked_users
 * WHERE user_id != :user_id
 * AND server_id = :server_id
 * ORDER BY times DESC
 * LIMIT 10
 * ```
 */
export const top = new PreparedQuery<ITopParams,ITopResult>(topIR);


