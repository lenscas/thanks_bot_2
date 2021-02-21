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

const topIR: any = {"name":"top","params":[{"name":"user_id","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":87,"b":93,"line":6,"col":18}]}},{"name":"server_id","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":112,"b":120,"line":7,"col":17}]}}],"usedParamSet":{"user_id":true,"server_id":true},"statement":{"body":"SELECT\n      user_id,\n      times\nFROM thanked_users\nWHERE user_id != :user_id\nAND server_id = :server_id\nORDER BY times DESC\nLIMIT 10","loc":{"a":16,"b":149,"line":2,"col":0}}};

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

const getCooldownTimeForThankingIR: any = {"name":"get_cooldown_time_for_thanking","params":[{"name":"server_id","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":262,"b":270,"line":14,"col":18}]}}],"usedParamSet":{"server_id":true},"statement":{"body":"SELECT time_between_thanking\nFROM server_config\nWHERE server_id =:server_id","loc":{"a":196,"b":270,"line":12,"col":0}}};

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
  thanker_id: string | null | void;
  getting_thanked_id: string | null | void;
  time_since: string | null | void;
  server_id: string | null | void;
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

const checkIfUserThankedIR: any = {"name":"check_if_user_thanked","params":[{"name":"thanker_id","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":370,"b":379,"line":19,"col":17}]}},{"name":"getting_thanked_id","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":398,"b":415,"line":20,"col":17}]}},{"name":"time_since","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":432,"b":441,"line":21,"col":15}]}},{"name":"server_id","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":460,"b":468,"line":22,"col":17}]}}],"usedParamSet":{"thanker_id":true,"getting_thanked_id":true,"time_since":true,"server_id":true},"statement":{"body":"SELECT COUNT(*) AS count\nFROM recent_thanked\nWHERE user_id = :thanker_id\nAND did_thank = :getting_thanked_id\nAND at_time > :time_since\nAND server_id = :server_id","loc":{"a":308,"b":468,"line":17,"col":0}}};

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

const insertThanksIR: any = {"name":"insert_thanks","params":[{"name":"getting_thanked_id","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":559,"b":576,"line":26,"col":8}]}},{"name":"server_id","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":579,"b":587,"line":26,"col":28}]}}],"usedParamSet":{"getting_thanked_id":true,"server_id":true},"statement":{"body":"INSERT INTO thanked_users (user_id,server_id, times)\nVALUES(:getting_thanked_id,:server_id,1)\nON CONFLICT ON CONSTRAINT thanked_users_pk\nDO\nUPDATE SET times = thanked_users.times + 1","loc":{"a":498,"b":679,"line":25,"col":0}}};

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
  thanker_id: string | null | void;
  being_thanked_id: string | null | void;
  server_id: string | null | void;
  at_time: string | null | void;
}

/** 'InsertHavingThanked' return type */
export type IInsertHavingThankedResult = void;

/** 'InsertHavingThanked' query type */
export interface IInsertHavingThankedQuery {
  params: IInsertHavingThankedParams;
  result: IInsertHavingThankedResult;
}

const insertHavingThankedIR: any = {"name":"insert_having_thanked","params":[{"name":"thanker_id","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":794,"b":803,"line":33,"col":9}]}},{"name":"being_thanked_id","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":806,"b":821,"line":33,"col":21}]}},{"name":"server_id","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":824,"b":832,"line":33,"col":39}]}},{"name":"at_time","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":835,"b":841,"line":33,"col":50},{"a":913,"b":919,"line":36,"col":22}]}}],"usedParamSet":{"thanker_id":true,"being_thanked_id":true,"server_id":true,"at_time":true},"statement":{"body":"INSERT INTO recent_thanked (user_id, did_thank, server_id, at_time)\nVALUES (:thanker_id,:being_thanked_id,:server_id,:at_time)\nON CONFLICT ON CONSTRAINT recent_thanked_pk\nDO\nUPDATE SET at_time = :at_time","loc":{"a":717,"b":919,"line":32,"col":0}}};

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
  times: string;
  rank: string | null;
}

/** 'GetRankOfUser' query type */
export interface IGetRankOfUserQuery {
  params: IGetRankOfUserParams;
  result: IGetRankOfUserResult;
}

const getRankOfUserIR: any = {"name":"get_rank_of_user","params":[{"name":"server_id","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":1231,"b":1239,"line":48,"col":39},{"a":1319,"b":1327,"line":50,"col":35},{"a":1495,"b":1503,"line":56,"col":31}]}},{"name":"user_id","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":1276,"b":1282,"line":49,"col":35},{"a":1456,"b":1462,"line":55,"col":31}]}}],"usedParamSet":{"server_id":true,"user_id":true},"statement":{"body":"SELECT\n    thanked_users.times,\n    (\n        SELECT COUNT(*) FROM (\n            SELECT times,server_id\n            FROM thanked_users\n                WHERE times >= (\n                    SELECT times\n                    FROM thanked_users\n                    WHERE server_id = :server_id\n                    AND user_id = :user_id\n                ) AND server_id = :server_id\n                GROUP BY times,server_id\n        ) as rankings\n    ) AS rank\nFROM thanked_users\nWHERE thanked_users.user_id = :user_id\nAND thanked_users.server_id = :server_id\nGROUP BY thanked_users.times","loc":{"a":952,"b":1532,"line":39,"col":0}}};

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


