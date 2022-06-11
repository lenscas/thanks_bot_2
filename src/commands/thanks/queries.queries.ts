/** Types generated for queries found in "src/commands/thanks/queries.sql" */
import { PreparedQuery } from '@pgtyped/query';

/** 'Top' parameters type */
export interface ITopParams {
  server_id: string | null | void;
  user_id: string | null | void;
}

/** 'Top' return type */
export interface ITopResult {
  times: string;
  user_id: string;
}

/** 'Top' query type */
export interface ITopQuery {
  params: ITopParams;
  result: ITopResult;
}

const topIR: any = {"usedParamSet":{"user_id":true,"server_id":true},"params":[{"name":"user_id","required":false,"transform":{"type":"scalar"},"locs":[{"a":70,"b":77}]},{"name":"server_id","required":false,"transform":{"type":"scalar"},"locs":[{"a":95,"b":104}]}],"statement":"SELECT\n      user_id,\n      times\nFROM thanked_users\nWHERE user_id != :user_id\nAND server_id = :server_id\nORDER BY times DESC\nLIMIT 10"};

/**
 * Query generated from SQL:
 * ```
 * SELECT
 *       user_id,
 *       times
 * FROM thanked_users
 * WHERE user_id != :user_id
 * AND server_id = :server_id
 * ORDER BY times DESC
 * LIMIT 10
 * ```
 */
export const top = new PreparedQuery<ITopParams,ITopResult>(topIR);


/** 'GetCooldownTimeForThanking' parameters type */
export interface IGetCooldownTimeForThankingParams {
  server_id: string | null | void;
}

/** 'GetCooldownTimeForThanking' return type */
export interface IGetCooldownTimeForThankingResult {
  time_between_thanking: string | null;
}

/** 'GetCooldownTimeForThanking' query type */
export interface IGetCooldownTimeForThankingQuery {
  params: IGetCooldownTimeForThankingParams;
  result: IGetCooldownTimeForThankingResult;
}

const getCooldownTimeForThankingIR: any = {"usedParamSet":{"server_id":true},"params":[{"name":"server_id","required":false,"transform":{"type":"scalar"},"locs":[{"a":65,"b":74}]}],"statement":"SELECT time_between_thanking\nFROM server_config\nWHERE server_id =:server_id"};

/**
 * Query generated from SQL:
 * ```
 * SELECT time_between_thanking
 * FROM server_config
 * WHERE server_id =:server_id
 * ```
 */
export const getCooldownTimeForThanking = new PreparedQuery<IGetCooldownTimeForThankingParams,IGetCooldownTimeForThankingResult>(getCooldownTimeForThankingIR);


/** 'CheckIfUserThanked' parameters type */
export interface ICheckIfUserThankedParams {
  getting_thanked_id: string | null | void;
  server_id: string | null | void;
  thanker_id: string | null | void;
  time_since: string | null | void;
}

/** 'CheckIfUserThanked' return type */
export interface ICheckIfUserThankedResult {
  count: string | null;
}

/** 'CheckIfUserThanked' query type */
export interface ICheckIfUserThankedQuery {
  params: ICheckIfUserThankedParams;
  result: ICheckIfUserThankedResult;
}

const checkIfUserThankedIR: any = {"usedParamSet":{"thanker_id":true,"getting_thanked_id":true,"time_since":true,"server_id":true},"params":[{"name":"thanker_id","required":false,"transform":{"type":"scalar"},"locs":[{"a":61,"b":71}]},{"name":"getting_thanked_id","required":false,"transform":{"type":"scalar"},"locs":[{"a":89,"b":107}]},{"name":"time_since","required":false,"transform":{"type":"scalar"},"locs":[{"a":123,"b":133}]},{"name":"server_id","required":false,"transform":{"type":"scalar"},"locs":[{"a":151,"b":160}]}],"statement":"SELECT COUNT(*) AS count\nFROM recent_thanked\nWHERE user_id = :thanker_id\nAND did_thank = :getting_thanked_id\nAND at_time > :time_since\nAND server_id = :server_id"};

/**
 * Query generated from SQL:
 * ```
 * SELECT COUNT(*) AS count
 * FROM recent_thanked
 * WHERE user_id = :thanker_id
 * AND did_thank = :getting_thanked_id
 * AND at_time > :time_since
 * AND server_id = :server_id
 * ```
 */
export const checkIfUserThanked = new PreparedQuery<ICheckIfUserThankedParams,ICheckIfUserThankedResult>(checkIfUserThankedIR);


/** 'InsertThanks' parameters type */
export interface IInsertThanksParams {
  getting_thanked_id: string | null | void;
  server_id: string | null | void;
}

/** 'InsertThanks' return type */
export type IInsertThanksResult = void;

/** 'InsertThanks' query type */
export interface IInsertThanksQuery {
  params: IInsertThanksParams;
  result: IInsertThanksResult;
}

const insertThanksIR: any = {"usedParamSet":{"getting_thanked_id":true,"server_id":true},"params":[{"name":"getting_thanked_id","required":false,"transform":{"type":"scalar"},"locs":[{"a":60,"b":78}]},{"name":"server_id","required":false,"transform":{"type":"scalar"},"locs":[{"a":80,"b":89}]}],"statement":"INSERT INTO thanked_users (user_id,server_id, times)\nVALUES(:getting_thanked_id,:server_id,1)\nON CONFLICT ON CONSTRAINT thanked_users_pk\nDO\nUPDATE SET times = thanked_users.times + 1"};

/**
 * Query generated from SQL:
 * ```
 * INSERT INTO thanked_users (user_id,server_id, times)
 * VALUES(:getting_thanked_id,:server_id,1)
 * ON CONFLICT ON CONSTRAINT thanked_users_pk
 * DO
 * UPDATE SET times = thanked_users.times + 1
 * ```
 */
export const insertThanks = new PreparedQuery<IInsertThanksParams,IInsertThanksResult>(insertThanksIR);


/** 'InsertHavingThanked' parameters type */
export interface IInsertHavingThankedParams {
  at_time: string | null | void;
  being_thanked_id: string | null | void;
  server_id: string | null | void;
  thanker_id: string | null | void;
}

/** 'InsertHavingThanked' return type */
export type IInsertHavingThankedResult = void;

/** 'InsertHavingThanked' query type */
export interface IInsertHavingThankedQuery {
  params: IInsertHavingThankedParams;
  result: IInsertHavingThankedResult;
}

const insertHavingThankedIR: any = {"usedParamSet":{"thanker_id":true,"being_thanked_id":true,"server_id":true,"at_time":true},"params":[{"name":"thanker_id","required":false,"transform":{"type":"scalar"},"locs":[{"a":76,"b":86}]},{"name":"being_thanked_id","required":false,"transform":{"type":"scalar"},"locs":[{"a":88,"b":104}]},{"name":"server_id","required":false,"transform":{"type":"scalar"},"locs":[{"a":106,"b":115}]},{"name":"at_time","required":false,"transform":{"type":"scalar"},"locs":[{"a":117,"b":124},{"a":195,"b":202}]}],"statement":"INSERT INTO recent_thanked (user_id, did_thank, server_id, at_time)\nVALUES (:thanker_id,:being_thanked_id,:server_id,:at_time)\nON CONFLICT ON CONSTRAINT recent_thanked_pk\nDO\nUPDATE SET at_time = :at_time"};

/**
 * Query generated from SQL:
 * ```
 * INSERT INTO recent_thanked (user_id, did_thank, server_id, at_time)
 * VALUES (:thanker_id,:being_thanked_id,:server_id,:at_time)
 * ON CONFLICT ON CONSTRAINT recent_thanked_pk
 * DO
 * UPDATE SET at_time = :at_time
 * ```
 */
export const insertHavingThanked = new PreparedQuery<IInsertHavingThankedParams,IInsertHavingThankedResult>(insertHavingThankedIR);


/** 'GetRankOfUser' parameters type */
export interface IGetRankOfUserParams {
  server_id: string | null | void;
  user_id: string | null | void;
}

/** 'GetRankOfUser' return type */
export interface IGetRankOfUserResult {
  rank: string | null;
  times: string;
}

/** 'GetRankOfUser' query type */
export interface IGetRankOfUserQuery {
  params: IGetRankOfUserParams;
  result: IGetRankOfUserResult;
}

const getRankOfUserIR: any = {"usedParamSet":{"server_id":true,"user_id":true},"params":[{"name":"server_id","required":false,"transform":{"type":"scalar"},"locs":[{"a":278,"b":287},{"a":366,"b":375},{"a":542,"b":551}]},{"name":"user_id","required":false,"transform":{"type":"scalar"},"locs":[{"a":323,"b":330},{"a":503,"b":510}]}],"statement":"SELECT\n    thanked_users.times,\n    (\n        SELECT COUNT(*) FROM (\n            SELECT times,server_id\n            FROM thanked_users\n                WHERE times >= (\n                    SELECT times\n                    FROM thanked_users\n                    WHERE server_id = :server_id\n                    AND user_id = :user_id\n                ) AND server_id = :server_id\n                GROUP BY times,server_id\n        ) as rankings\n    ) AS rank\nFROM thanked_users\nWHERE thanked_users.user_id = :user_id\nAND thanked_users.server_id = :server_id\nGROUP BY thanked_users.times"};

/**
 * Query generated from SQL:
 * ```
 * SELECT
 *     thanked_users.times,
 *     (
 *         SELECT COUNT(*) FROM (
 *             SELECT times,server_id
 *             FROM thanked_users
 *                 WHERE times >= (
 *                     SELECT times
 *                     FROM thanked_users
 *                     WHERE server_id = :server_id
 *                     AND user_id = :user_id
 *                 ) AND server_id = :server_id
 *                 GROUP BY times,server_id
 *         ) as rankings
 *     ) AS rank
 * FROM thanked_users
 * WHERE thanked_users.user_id = :user_id
 * AND thanked_users.server_id = :server_id
 * GROUP BY thanked_users.times
 * ```
 */
export const getRankOfUser = new PreparedQuery<IGetRankOfUserParams,IGetRankOfUserResult>(getRankOfUserIR);


