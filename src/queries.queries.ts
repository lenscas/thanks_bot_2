/** Types generated for queries found in "./src/queries.sql" */
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


