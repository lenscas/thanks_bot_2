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


/** 'SetCommandChannel' parameters type */
export interface ISetCommandChannelParams {
  server_id: string | null | void;
  channel_id: string | null | void;
}

/** 'SetCommandChannel' return type */
export type ISetCommandChannelResult = void;

/** 'SetCommandChannel' query type */
export interface ISetCommandChannelQuery {
  params: ISetCommandChannelParams;
  result: ISetCommandChannelResult;
}

const setCommandChannelIR: any = {"name":"set_command_channel","params":[{"name":"server_id","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":322,"b":330,"line":10,"col":9}]}},{"name":"channel_id","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":334,"b":343,"line":10,"col":21},{"a":420,"b":429,"line":13,"col":28}]}}],"usedParamSet":{"server_id":true,"channel_id":true},"statement":{"body":"INSERT INTO server_config (server_id, command_channel)\nVALUES (:server_id, :channel_id)\nON CONFLICT ON CONSTRAINT server_config_pk\nDO\nUPDATE SET command_channel=:channel_id","loc":{"a":258,"b":429,"line":9,"col":0}}};

/**
 * Query generated from SQL:
 * ```
 * INSERT INTO server_config (server_id, command_channel)
 * VALUES (:server_id, :channel_id)
 * ON CONFLICT ON CONSTRAINT server_config_pk
 * DO
 * UPDATE SET command_channel=:channel_id
 * ```
 */
export const setCommandChannel = new PreparedQuery<ISetCommandChannelParams,ISetCommandChannelResult>(setCommandChannelIR);


/** 'SetMuteRole' parameters type */
export interface ISetMuteRoleParams {
  server_id: string | null | void;
  role_id: string | null | void;
}

/** 'SetMuteRole' return type */
export type ISetMuteRoleResult = void;

/** 'SetMuteRole' query type */
export interface ISetMuteRoleQuery {
  params: ISetMuteRoleParams;
  result: ISetMuteRoleResult;
}

const setMuteRoleIR: any = {"name":"set_mute_role","params":[{"name":"server_id","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":517,"b":525,"line":17,"col":9}]}},{"name":"role_id","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":529,"b":535,"line":17,"col":21},{"a":606,"b":612,"line":20,"col":22}]}}],"usedParamSet":{"server_id":true,"role_id":true},"statement":{"body":"INSERT INTO server_config (server_id, mute_role)\nVALUES (:server_id, :role_id)\nON CONFLICT ON CONSTRAINT server_config_pk\nDO\nUPDATE SET mute_role=:role_id","loc":{"a":459,"b":612,"line":16,"col":0}}};

/**
 * Query generated from SQL:
 * ```
 * INSERT INTO server_config (server_id, mute_role)
 * VALUES (:server_id, :role_id)
 * ON CONFLICT ON CONSTRAINT server_config_pk
 * DO
 * UPDATE SET mute_role=:role_id
 * ```
 */
export const setMuteRole = new PreparedQuery<ISetMuteRoleParams,ISetMuteRoleResult>(setMuteRoleIR);


/** 'GetMuteRole' parameters type */
export interface IGetMuteRoleParams {
  server_id: string | null | void;
}

/** 'GetMuteRole' return type */
export interface IGetMuteRoleResult {
  mute_role: string | null;
}

/** 'GetMuteRole' query type */
export interface IGetMuteRoleQuery {
  params: IGetMuteRoleParams;
  result: IGetMuteRoleResult;
}

const getMuteRoleIR: any = {"name":"get_mute_role","params":[{"name":"server_id","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":697,"b":705,"line":25,"col":19}]}}],"usedParamSet":{"server_id":true},"statement":{"body":"SELECT mute_role\nFROM server_config\nWHERE server_id = :server_id","loc":{"a":642,"b":705,"line":23,"col":0}}};

/**
 * Query generated from SQL:
 * ```
 * SELECT mute_role
 * FROM server_config
 * WHERE server_id = :server_id
 * ```
 */
export const getMuteRole = new PreparedQuery<IGetMuteRoleParams,IGetMuteRoleResult>(getMuteRoleIR);


