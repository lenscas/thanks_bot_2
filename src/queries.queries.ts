/** Types generated for queries found in "src/queries.sql" */
import { PreparedQuery } from '@pgtyped/query';

/** 'GetCommandChannel' parameters type */
export interface IGetCommandChannelParams {
  server_id: string | null | void;
}

/** 'GetCommandChannel' return type */
export interface IGetCommandChannelResult {
  command_channel: string | null;
}

/** 'GetCommandChannel' query type */
export interface IGetCommandChannelQuery {
  params: IGetCommandChannelParams;
  result: IGetCommandChannelResult;
}

const getCommandChannelIR: any = {"usedParamSet":{"server_id":true},"params":[{"name":"server_id","required":false,"transform":{"type":"scalar"},"locs":[{"a":60,"b":69}]}],"statement":"SELECT command_channel\nFROM server_config\nWHERE server_id = :server_id"};

/**
 * Query generated from SQL:
 * ```
 * SELECT command_channel
 * FROM server_config
 * WHERE server_id = :server_id
 * ```
 */
export const getCommandChannel = new PreparedQuery<IGetCommandChannelParams,IGetCommandChannelResult>(getCommandChannelIR);


/** 'GetChannelToCopySubmissionsTo' parameters type */
export interface IGetChannelToCopySubmissionsToParams {
  current_channel: string | null | void;
  server_id: string | null | void;
}

/** 'GetChannelToCopySubmissionsTo' return type */
export interface IGetChannelToCopySubmissionsToResult {
  stored_channel: string;
}

/** 'GetChannelToCopySubmissionsTo' query type */
export interface IGetChannelToCopySubmissionsToQuery {
  params: IGetChannelToCopySubmissionsToParams;
  result: IGetChannelToCopySubmissionsToResult;
}

const getChannelToCopySubmissionsToIR: any = {"usedParamSet":{"server_id":true,"current_channel":true},"params":[{"name":"server_id","required":false,"transform":{"type":"scalar"},"locs":[{"a":64,"b":73}]},{"name":"current_channel","required":false,"transform":{"type":"scalar"},"locs":[{"a":94,"b":109}]}],"statement":"SELECT stored_channel\nFROM hidden_submissions\nWHERE server_id = :server_id\nAND from_channel = :current_channel"};

/**
 * Query generated from SQL:
 * ```
 * SELECT stored_channel
 * FROM hidden_submissions
 * WHERE server_id = :server_id
 * AND from_channel = :current_channel
 * ```
 */
export const getChannelToCopySubmissionsTo = new PreparedQuery<IGetChannelToCopySubmissionsToParams,IGetChannelToCopySubmissionsToResult>(getChannelToCopySubmissionsToIR);


/** 'GetCommandToRun' parameters type */
export interface IGetCommandToRunParams {
  channel: string | null | void;
  name: string | null | void;
  server_id: string | null | void;
}

/** 'GetCommandToRun' return type */
export interface IGetCommandToRunResult {
  message: string;
}

/** 'GetCommandToRun' query type */
export interface IGetCommandToRunQuery {
  params: IGetCommandToRunParams;
  result: IGetCommandToRunResult;
}

const getCommandToRunIR: any = {"usedParamSet":{"server_id":true,"channel":true,"name":true},"params":[{"name":"server_id","required":false,"transform":{"type":"scalar"},"locs":[{"a":55,"b":64}]},{"name":"channel","required":false,"transform":{"type":"scalar"},"locs":[{"a":88,"b":95}]},{"name":"name","required":false,"transform":{"type":"scalar"},"locs":[{"a":136,"b":140}]}],"statement":"SELECT message \nFROM custom_commands\nWHERE server_id = :server_id\nAND (\n    channel_id =:channel\n    OR channel_id IS NULL\n)\nAND name = :name\nLIMIT 1"};

/**
 * Query generated from SQL:
 * ```
 * SELECT message 
 * FROM custom_commands
 * WHERE server_id = :server_id
 * AND (
 *     channel_id =:channel
 *     OR channel_id IS NULL
 * )
 * AND name = :name
 * LIMIT 1
 * ```
 */
export const getCommandToRun = new PreparedQuery<IGetCommandToRunParams,IGetCommandToRunResult>(getCommandToRunIR);


/** 'GetEveryCustomCommandName' parameters type */
export interface IGetEveryCustomCommandNameParams {
  server_id: string | null | void;
}

/** 'GetEveryCustomCommandName' return type */
export interface IGetEveryCustomCommandNameResult {
  name: string;
}

/** 'GetEveryCustomCommandName' query type */
export interface IGetEveryCustomCommandNameQuery {
  params: IGetEveryCustomCommandNameParams;
  result: IGetEveryCustomCommandNameResult;
}

const getEveryCustomCommandNameIR: any = {"usedParamSet":{"server_id":true},"params":[{"name":"server_id","required":false,"transform":{"type":"scalar"},"locs":[{"a":53,"b":62}]}],"statement":"SELECT \"name\"\nFROM custom_commands\nWHERE server_id = :server_id"};

/**
 * Query generated from SQL:
 * ```
 * SELECT "name"
 * FROM custom_commands
 * WHERE server_id = :server_id
 * ```
 */
export const getEveryCustomCommandName = new PreparedQuery<IGetEveryCustomCommandNameParams,IGetEveryCustomCommandNameResult>(getEveryCustomCommandNameIR);


/** 'EnableCommands' parameters type */
export interface IEnableCommandsParams {
  server_id: string | null | void;
}

/** 'EnableCommands' return type */
export type IEnableCommandsResult = void;

/** 'EnableCommands' query type */
export interface IEnableCommandsQuery {
  params: IEnableCommandsParams;
  result: IEnableCommandsResult;
}

const enableCommandsIR: any = {"usedParamSet":{"server_id":true},"params":[{"name":"server_id","required":false,"transform":{"type":"scalar"},"locs":[{"a":61,"b":70}]}],"statement":"DELETE FROM servers_with_commands_disabled\nWHERE server_id = :server_id"};

/**
 * Query generated from SQL:
 * ```
 * DELETE FROM servers_with_commands_disabled
 * WHERE server_id = :server_id
 * ```
 */
export const enableCommands = new PreparedQuery<IEnableCommandsParams,IEnableCommandsResult>(enableCommandsIR);


/** 'DisableCommands' parameters type */
export interface IDisableCommandsParams {
  server_id: string | null | void;
}

/** 'DisableCommands' return type */
export type IDisableCommandsResult = void;

/** 'DisableCommands' query type */
export interface IDisableCommandsQuery {
  params: IDisableCommandsParams;
  result: IDisableCommandsResult;
}

const disableCommandsIR: any = {"usedParamSet":{"server_id":true},"params":[{"name":"server_id","required":false,"transform":{"type":"scalar"},"locs":[{"a":63,"b":72}]}],"statement":"INSERT INTO servers_with_commands_disabled\n(server_id) VALUES (:server_id)"};

/**
 * Query generated from SQL:
 * ```
 * INSERT INTO servers_with_commands_disabled
 * (server_id) VALUES (:server_id)
 * ```
 */
export const disableCommands = new PreparedQuery<IDisableCommandsParams,IDisableCommandsResult>(disableCommandsIR);


/** 'GetServersWithoutCommands' parameters type */
export type IGetServersWithoutCommandsParams = void;

/** 'GetServersWithoutCommands' return type */
export interface IGetServersWithoutCommandsResult {
  server_id: string;
}

/** 'GetServersWithoutCommands' query type */
export interface IGetServersWithoutCommandsQuery {
  params: IGetServersWithoutCommandsParams;
  result: IGetServersWithoutCommandsResult;
}

const getServersWithoutCommandsIR: any = {"usedParamSet":{},"params":[],"statement":"SELECT server_id\nFROM servers_with_commands_disabled"};

/**
 * Query generated from SQL:
 * ```
 * SELECT server_id
 * FROM servers_with_commands_disabled
 * ```
 */
export const getServersWithoutCommands = new PreparedQuery<IGetServersWithoutCommandsParams,IGetServersWithoutCommandsResult>(getServersWithoutCommandsIR);


