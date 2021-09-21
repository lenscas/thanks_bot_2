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

const getCommandChannelIR: any = {"name":"get_command_channel","params":[{"name":"server_id","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":93,"b":101,"line":4,"col":19}]}}],"usedParamSet":{"server_id":true},"statement":{"body":"SELECT command_channel\nFROM server_config\nWHERE server_id = :server_id","loc":{"a":32,"b":101,"line":2,"col":0}}};

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
  server_id: string | null | void;
  current_channel: string | null | void;
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

const getChannelToCopySubmissionsToIR: any = {"name":"get_channel_to_copy_submissions_to","params":[{"name":"server_id","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":217,"b":225,"line":9,"col":19}]}},{"name":"current_channel","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":247,"b":261,"line":10,"col":20}]}}],"usedParamSet":{"server_id":true,"current_channel":true},"statement":{"body":"SELECT stored_channel\nFROM hidden_submissions\nWHERE server_id = :server_id\nAND from_channel = :current_channel","loc":{"a":152,"b":261,"line":7,"col":0}}};

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
  server_id: string | null | void;
  channel: string | null | void;
  name: string | null | void;
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

const getCommandToRunIR: any = {"name":"get_command_to_run","params":[{"name":"server_id","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":352,"b":360,"line":15,"col":19}]}},{"name":"channel","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":385,"b":391,"line":17,"col":17}]}},{"name":"name","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":433,"b":436,"line":20,"col":12}]}}],"usedParamSet":{"server_id":true,"channel":true,"name":true},"statement":{"body":"SELECT message \nFROM custom_commands\nWHERE server_id = :server_id\nAND (\n    channel_id =:channel\n    OR channel_id IS NULL\n)\nAND name = :name\nLIMIT 1","loc":{"a":296,"b":444,"line":13,"col":0}}};

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

const getEveryCustomCommandNameIR: any = {"name":"get_every_custom_command_name","params":[{"name":"server_id","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":544,"b":552,"line":26,"col":19}]}}],"usedParamSet":{"server_id":true},"statement":{"body":"SELECT \"name\"\nFROM custom_commands\nWHERE server_id = :server_id","loc":{"a":490,"b":552,"line":24,"col":0}}};

/**
 * Query generated from SQL:
 * ```
 * SELECT "name"
 * FROM custom_commands
 * WHERE server_id = :server_id
 * ```
 */
export const getEveryCustomCommandName = new PreparedQuery<IGetEveryCustomCommandNameParams,IGetEveryCustomCommandNameResult>(getEveryCustomCommandNameIR);


/** 'GetEveryTest' parameters type */
export type IGetEveryTestParams = void;

/** 'GetEveryTest' return type */
export interface IGetEveryTestResult {
  id: number;
}

/** 'GetEveryTest' query type */
export interface IGetEveryTestQuery {
  params: IGetEveryTestParams;
  result: IGetEveryTestResult;
}

const getEveryTestIR: any = {"name":"get_every_test","params":[],"usedParamSet":{},"statement":{"body":"SELECT \"id\"\nFROM test","loc":{"a":583,"b":603,"line":29,"col":0}}};

/**
 * Query generated from SQL:
 * ```
 * SELECT "id"
 * FROM test
 * ```
 */
export const getEveryTest = new PreparedQuery<IGetEveryTestParams,IGetEveryTestResult>(getEveryTestIR);


