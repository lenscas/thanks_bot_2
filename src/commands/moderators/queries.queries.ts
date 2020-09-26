/** Types generated for queries found in "./src/commands/moderators/queries.sql" */
import { PreparedQuery } from '@pgtyped/query';

/** 'UpdateThankTime' parameters type */
export interface IUpdateThankTimeParams {
  server_id: string | null | void;
  time_in_minutes: string | null | void;
}

/** 'UpdateThankTime' return type */
export type IUpdateThankTimeResult = void;

/** 'UpdateThankTime' query type */
export interface IUpdateThankTimeQuery {
  params: IUpdateThankTimeParams;
  result: IUpdateThankTimeResult;
}

const updateThankTimeIR: any = {"name":"update_thank_time","params":[{"name":"server_id","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":100,"b":108,"line":3,"col":9}]}},{"name":"time_in_minutes","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":111,"b":125,"line":3,"col":20},{"a":208,"b":222,"line":6,"col":34}]}}],"usedParamSet":{"server_id":true,"time_in_minutes":true},"statement":{"body":"INSERT INTO server_config (server_id, time_between_thanking)\nVALUES (:server_id,:time_in_minutes)\nON CONFLICT ON CONSTRAINT server_config_pk\nDO\nUPDATE SET time_between_thanking=:time_in_minutes","loc":{"a":30,"b":222,"line":2,"col":0}}};

/**
 * Query generated from SQL:
 * ```
 * INSERT INTO server_config (server_id, time_between_thanking)
 * VALUES (:server_id,:time_in_minutes)
 * ON CONFLICT ON CONSTRAINT server_config_pk
 * DO
 * UPDATE SET time_between_thanking=:time_in_minutes
 * ```
 */
export const updateThankTime = new PreparedQuery<IUpdateThankTimeParams,IUpdateThankTimeResult>(updateThankTimeIR);


