/** Types generated for queries found in "src/commands/moderators/queries.sql" */
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

const updateThankTimeIR: any = {"usedParamSet":{"server_id":true,"time_in_minutes":true},"params":[{"name":"server_id","required":false,"transform":{"type":"scalar"},"locs":[{"a":69,"b":78}]},{"name":"time_in_minutes","required":false,"transform":{"type":"scalar"},"locs":[{"a":80,"b":95},{"a":177,"b":192}]}],"statement":"INSERT INTO server_config (server_id, time_between_thanking)\nVALUES (:server_id,:time_in_minutes)\nON CONFLICT ON CONSTRAINT server_config_pk\nDO\nUPDATE SET time_between_thanking=:time_in_minutes"};

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
  channel_id: string | null | void;
  server_id: string | null | void;
}

/** 'SetCommandChannel' return type */
export type ISetCommandChannelResult = void;

/** 'SetCommandChannel' query type */
export interface ISetCommandChannelQuery {
  params: ISetCommandChannelParams;
  result: ISetCommandChannelResult;
}

const setCommandChannelIR: any = {"usedParamSet":{"server_id":true,"channel_id":true},"params":[{"name":"server_id","required":false,"transform":{"type":"scalar"},"locs":[{"a":63,"b":72}]},{"name":"channel_id","required":false,"transform":{"type":"scalar"},"locs":[{"a":75,"b":85},{"a":161,"b":171}]}],"statement":"INSERT INTO server_config (server_id, command_channel)\nVALUES (:server_id, :channel_id)\nON CONFLICT ON CONSTRAINT server_config_pk\nDO\nUPDATE SET command_channel=:channel_id"};

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
  role_id: string | null | void;
  server_id: string | null | void;
}

/** 'SetMuteRole' return type */
export type ISetMuteRoleResult = void;

/** 'SetMuteRole' query type */
export interface ISetMuteRoleQuery {
  params: ISetMuteRoleParams;
  result: ISetMuteRoleResult;
}

const setMuteRoleIR: any = {"usedParamSet":{"server_id":true,"role_id":true},"params":[{"name":"server_id","required":false,"transform":{"type":"scalar"},"locs":[{"a":57,"b":66}]},{"name":"role_id","required":false,"transform":{"type":"scalar"},"locs":[{"a":69,"b":76},{"a":146,"b":153}]}],"statement":"INSERT INTO server_config (server_id, mute_role)\nVALUES (:server_id, :role_id)\nON CONFLICT ON CONSTRAINT server_config_pk\nDO\nUPDATE SET mute_role=:role_id"};

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

const getMuteRoleIR: any = {"usedParamSet":{"server_id":true},"params":[{"name":"server_id","required":false,"transform":{"type":"scalar"},"locs":[{"a":54,"b":63}]}],"statement":"SELECT mute_role\nFROM server_config\nWHERE server_id = :server_id"};

/**
 * Query generated from SQL:
 * ```
 * SELECT mute_role
 * FROM server_config
 * WHERE server_id = :server_id
 * ```
 */
export const getMuteRole = new PreparedQuery<IGetMuteRoleParams,IGetMuteRoleResult>(getMuteRoleIR);


/** 'EnableSubmissionChannel' parameters type */
export interface IEnableSubmissionChannelParams {
  from_channel: string | null | void;
  server_id: string | null | void;
  to_channel: string | null | void;
}

/** 'EnableSubmissionChannel' return type */
export type IEnableSubmissionChannelResult = void;

/** 'EnableSubmissionChannel' query type */
export interface IEnableSubmissionChannelQuery {
  params: IEnableSubmissionChannelParams;
  result: IEnableSubmissionChannelResult;
}

const enableSubmissionChannelIR: any = {"usedParamSet":{"server_id":true,"from_channel":true,"to_channel":true},"params":[{"name":"server_id","required":false,"transform":{"type":"scalar"},"locs":[{"a":81,"b":90}]},{"name":"from_channel","required":false,"transform":{"type":"scalar"},"locs":[{"a":93,"b":105}]},{"name":"to_channel","required":false,"transform":{"type":"scalar"},"locs":[{"a":108,"b":118}]}],"statement":"INSERT INTO hidden_submissions (server_id, from_channel, stored_channel)\nVALUES (:server_id, :from_channel, :to_channel)"};

/**
 * Query generated from SQL:
 * ```
 * INSERT INTO hidden_submissions (server_id, from_channel, stored_channel)
 * VALUES (:server_id, :from_channel, :to_channel)
 * ```
 */
export const enableSubmissionChannel = new PreparedQuery<IEnableSubmissionChannelParams,IEnableSubmissionChannelResult>(enableSubmissionChannelIR);


/** 'CheckIfChannelsAreAlreadyUsed' parameters type */
export interface ICheckIfChannelsAreAlreadyUsedParams {
  from_channel: string | null | void;
  server_id: string | null | void;
  to_channel: string | null | void;
}

/** 'CheckIfChannelsAreAlreadyUsed' return type */
export interface ICheckIfChannelsAreAlreadyUsedResult {
  from_channel_count: string | null;
  stored_channel_count: string | null;
}

/** 'CheckIfChannelsAreAlreadyUsed' query type */
export interface ICheckIfChannelsAreAlreadyUsedQuery {
  params: ICheckIfChannelsAreAlreadyUsedParams;
  result: ICheckIfChannelsAreAlreadyUsedResult;
}

const checkIfChannelsAreAlreadyUsedIR: any = {"usedParamSet":{"server_id":true,"from_channel":true,"to_channel":true},"params":[{"name":"server_id","required":false,"transform":{"type":"scalar"},"locs":[{"a":117,"b":126},{"a":310,"b":319}]},{"name":"from_channel","required":false,"transform":{"type":"scalar"},"locs":[{"a":155,"b":167}]},{"name":"to_channel","required":false,"transform":{"type":"scalar"},"locs":[{"a":350,"b":360}]}],"statement":"SELECT\n    (\n        SELECT count(*) AS from_channel_count\n        FROM hidden_submissions\n        WHERE server_id = :server_id\n        AND from_channel = :from_channel\n    ) AS from_channel_count,\n    (\n        SELECT count(*) AS stored_channel_count\n        FROM hidden_submissions\n        WHERE server_id = :server_id\n        AND stored_channel = :to_channel\n    ) as stored_channel_count"};

/**
 * Query generated from SQL:
 * ```
 * SELECT
 *     (
 *         SELECT count(*) AS from_channel_count
 *         FROM hidden_submissions
 *         WHERE server_id = :server_id
 *         AND from_channel = :from_channel
 *     ) AS from_channel_count,
 *     (
 *         SELECT count(*) AS stored_channel_count
 *         FROM hidden_submissions
 *         WHERE server_id = :server_id
 *         AND stored_channel = :to_channel
 *     ) as stored_channel_count
 * ```
 */
export const checkIfChannelsAreAlreadyUsed = new PreparedQuery<ICheckIfChannelsAreAlreadyUsedParams,ICheckIfChannelsAreAlreadyUsedResult>(checkIfChannelsAreAlreadyUsedIR);


/** 'EndSubmission' parameters type */
export interface IEndSubmissionParams {
  from_channel: string | null | void;
  server_id: string | null | void;
}

/** 'EndSubmission' return type */
export interface IEndSubmissionResult {
  stored_channel: string;
}

/** 'EndSubmission' query type */
export interface IEndSubmissionQuery {
  params: IEndSubmissionParams;
  result: IEndSubmissionResult;
}

const endSubmissionIR: any = {"usedParamSet":{"server_id":true,"from_channel":true},"params":[{"name":"server_id","required":false,"transform":{"type":"scalar"},"locs":[{"a":49,"b":58}]},{"name":"from_channel","required":false,"transform":{"type":"scalar"},"locs":[{"a":79,"b":91}]}],"statement":"DELETE FROM hidden_submissions\nWHERE server_id = :server_id\nAND from_channel = :from_channel\nRETURNING stored_channel"};

/**
 * Query generated from SQL:
 * ```
 * DELETE FROM hidden_submissions
 * WHERE server_id = :server_id
 * AND from_channel = :from_channel
 * RETURNING stored_channel
 * ```
 */
export const endSubmission = new PreparedQuery<IEndSubmissionParams,IEndSubmissionResult>(endSubmissionIR);


/** 'CheckIfCommandExists' parameters type */
export interface ICheckIfCommandExistsParams {
  name: string | null | void;
  server_id: string | null | void;
}

/** 'CheckIfCommandExists' return type */
export interface ICheckIfCommandExistsResult {
  count: string | null;
}

/** 'CheckIfCommandExists' query type */
export interface ICheckIfCommandExistsQuery {
  params: ICheckIfCommandExistsParams;
  result: ICheckIfCommandExistsResult;
}

const checkIfCommandExistsIR: any = {"usedParamSet":{"server_id":true,"name":true},"params":[{"name":"server_id","required":false,"transform":{"type":"scalar"},"locs":[{"a":56,"b":65}]},{"name":"name","required":false,"transform":{"type":"scalar"},"locs":[{"a":80,"b":84}]}],"statement":"SELECT count(*) \nFROM custom_commands\nWHERE server_id = :server_id\nAND \"name\" = :name"};

/**
 * Query generated from SQL:
 * ```
 * SELECT count(*) 
 * FROM custom_commands
 * WHERE server_id = :server_id
 * AND "name" = :name
 * ```
 */
export const checkIfCommandExists = new PreparedQuery<ICheckIfCommandExistsParams,ICheckIfCommandExistsResult>(checkIfCommandExistsIR);


/** 'AddCommand' parameters type */
export interface IAddCommandParams {
  channel_id: string | null | void;
  message: string | null | void;
  name: string | null | void;
  server_id: string | null | void;
}

/** 'AddCommand' return type */
export type IAddCommandResult = void;

/** 'AddCommand' query type */
export interface IAddCommandQuery {
  params: IAddCommandParams;
  result: IAddCommandResult;
}

const addCommandIR: any = {"usedParamSet":{"server_id":true,"name":true,"message":true,"channel_id":true},"params":[{"name":"server_id","required":false,"transform":{"type":"scalar"},"locs":[{"a":79,"b":88}]},{"name":"name","required":false,"transform":{"type":"scalar"},"locs":[{"a":91,"b":95}]},{"name":"message","required":false,"transform":{"type":"scalar"},"locs":[{"a":98,"b":105}]},{"name":"channel_id","required":false,"transform":{"type":"scalar"},"locs":[{"a":108,"b":118}]}],"statement":"INSERT INTO custom_commands (server_id, \"name\", \"message\", channel_id)\nVALUES (:server_id, :name, :message, :channel_id)"};

/**
 * Query generated from SQL:
 * ```
 * INSERT INTO custom_commands (server_id, "name", "message", channel_id)
 * VALUES (:server_id, :name, :message, :channel_id)
 * ```
 */
export const addCommand = new PreparedQuery<IAddCommandParams,IAddCommandResult>(addCommandIR);


/** 'DeleteCommand' parameters type */
export interface IDeleteCommandParams {
  name: string | null | void;
  server_id: string | null | void;
}

/** 'DeleteCommand' return type */
export type IDeleteCommandResult = void;

/** 'DeleteCommand' query type */
export interface IDeleteCommandQuery {
  params: IDeleteCommandParams;
  result: IDeleteCommandResult;
}

const deleteCommandIR: any = {"usedParamSet":{"server_id":true,"name":true},"params":[{"name":"server_id","required":false,"transform":{"type":"scalar"},"locs":[{"a":46,"b":55}]},{"name":"name","required":false,"transform":{"type":"scalar"},"locs":[{"a":70,"b":74}]}],"statement":"DELETE FROM custom_commands\nWHERE server_id = :server_id\nAND \"name\" = :name"};

/**
 * Query generated from SQL:
 * ```
 * DELETE FROM custom_commands
 * WHERE server_id = :server_id
 * AND "name" = :name
 * ```
 */
export const deleteCommand = new PreparedQuery<IDeleteCommandParams,IDeleteCommandResult>(deleteCommandIR);


/** 'EditCommand' parameters type */
export interface IEditCommandParams {
  channel_id: string | null | void;
  message: string | null | void;
  name: string | null | void;
  server_id: string | null | void;
}

/** 'EditCommand' return type */
export type IEditCommandResult = void;

/** 'EditCommand' query type */
export interface IEditCommandQuery {
  params: IEditCommandParams;
  result: IEditCommandResult;
}

const editCommandIR: any = {"usedParamSet":{"channel_id":true,"message":true,"server_id":true,"name":true},"params":[{"name":"channel_id","required":false,"transform":{"type":"scalar"},"locs":[{"a":38,"b":48}]},{"name":"message","required":false,"transform":{"type":"scalar"},"locs":[{"a":59,"b":66}]},{"name":"server_id","required":false,"transform":{"type":"scalar"},"locs":[{"a":86,"b":95}]},{"name":"name","required":false,"transform":{"type":"scalar"},"locs":[{"a":108,"b":112}]}],"statement":"UPDATE custom_commands\nSET channel_id=:channel_id, message=:message\nWHERE server_id = :server_id\nAND \"name\"=:name"};

/**
 * Query generated from SQL:
 * ```
 * UPDATE custom_commands
 * SET channel_id=:channel_id, message=:message
 * WHERE server_id = :server_id
 * AND "name"=:name
 * ```
 */
export const editCommand = new PreparedQuery<IEditCommandParams,IEditCommandResult>(editCommandIR);


/** 'InsertMute' parameters type */
export interface IInsertMuteParams {
  end_date: Date | null | void;
  server_id: string | null | void;
  user_id: string | null | void;
}

/** 'InsertMute' return type */
export type IInsertMuteResult = void;

/** 'InsertMute' query type */
export interface IInsertMuteQuery {
  params: IInsertMuteParams;
  result: IInsertMuteResult;
}

const insertMuteIR: any = {"usedParamSet":{"server_id":true,"user_id":true,"end_date":true},"params":[{"name":"server_id","required":false,"transform":{"type":"scalar"},"locs":[{"a":64,"b":73}]},{"name":"user_id","required":false,"transform":{"type":"scalar"},"locs":[{"a":76,"b":83}]},{"name":"end_date","required":false,"transform":{"type":"scalar"},"locs":[{"a":86,"b":94},{"a":164,"b":172}]}],"statement":"INSERT INTO muted_people (server_id, user_id, end_date)\nVALUES (:server_id, :user_id, :end_date)\nON CONFLICT ON CONSTRAINT muted_people_pkey\nDO\nUPDATE SET end_date=:end_date, start_date = DEFAULT"};

/**
 * Query generated from SQL:
 * ```
 * INSERT INTO muted_people (server_id, user_id, end_date)
 * VALUES (:server_id, :user_id, :end_date)
 * ON CONFLICT ON CONSTRAINT muted_people_pkey
 * DO
 * UPDATE SET end_date=:end_date, start_date = DEFAULT
 * ```
 */
export const insertMute = new PreparedQuery<IInsertMuteParams,IInsertMuteResult>(insertMuteIR);


/** 'DeleteMute' parameters type */
export interface IDeleteMuteParams {
  server_id: string | null | void;
  user_id: string | null | void;
}

/** 'DeleteMute' return type */
export type IDeleteMuteResult = void;

/** 'DeleteMute' query type */
export interface IDeleteMuteQuery {
  params: IDeleteMuteParams;
  result: IDeleteMuteResult;
}

const deleteMuteIR: any = {"usedParamSet":{"server_id":true,"user_id":true},"params":[{"name":"server_id","required":false,"transform":{"type":"scalar"},"locs":[{"a":43,"b":52}]},{"name":"user_id","required":false,"transform":{"type":"scalar"},"locs":[{"a":68,"b":75}]}],"statement":"DELETE FROM muted_people\nWHERE server_id = :server_id\nAND user_id = :user_id"};

/**
 * Query generated from SQL:
 * ```
 * DELETE FROM muted_people
 * WHERE server_id = :server_id
 * AND user_id = :user_id
 * ```
 */
export const deleteMute = new PreparedQuery<IDeleteMuteParams,IDeleteMuteResult>(deleteMuteIR);


/** 'GetMutes' parameters type */
export type IGetMutesParams = void;

/** 'GetMutes' return type */
export interface IGetMutesResult {
  end_date: Date;
  server_id: string;
  user_id: string;
}

/** 'GetMutes' query type */
export interface IGetMutesQuery {
  params: IGetMutesParams;
  result: IGetMutesResult;
}

const getMutesIR: any = {"usedParamSet":{},"params":[],"statement":"SELECT server_id,user_id,end_date\nFROM muted_people"};

/**
 * Query generated from SQL:
 * ```
 * SELECT server_id,user_id,end_date
 * FROM muted_people
 * ```
 */
export const getMutes = new PreparedQuery<IGetMutesParams,IGetMutesResult>(getMutesIR);


