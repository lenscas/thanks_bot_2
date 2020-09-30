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


