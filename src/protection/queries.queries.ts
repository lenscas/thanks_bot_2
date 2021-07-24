/** Types generated for queries found in "src/protection/queries.sql" */
import { PreparedQuery } from '@pgtyped/query';

/** 'GetProtectionConfig' parameters type */
export interface IGetProtectionConfigParams {
  server_id: string | null | void;
}

/** 'GetProtectionConfig' return type */
export interface IGetProtectionConfigResult {
  channel_report_mutes: string | null;
  mute_role: string | null;
  muted_marker_role: string | null;
}

/** 'GetProtectionConfig' query type */
export interface IGetProtectionConfigQuery {
  params: IGetProtectionConfigParams;
  result: IGetProtectionConfigResult;
}

const getProtectionConfigIR: any = {"name":"get_protection_config","params":[{"name":"server_id","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":130,"b":138,"line":4,"col":19}]}}],"usedParamSet":{"server_id":true},"statement":{"body":"SELECT channel_report_mutes, mute_role, muted_marker_role\nFROM server_config\nWHERE server_id = :server_id","loc":{"a":34,"b":138,"line":2,"col":0}}};

/**
 * Query generated from SQL:
 * ```
 * SELECT channel_report_mutes, mute_role, muted_marker_role
 * FROM server_config
 * WHERE server_id = :server_id
 * ```
 */
export const getProtectionConfig = new PreparedQuery<IGetProtectionConfigParams,IGetProtectionConfigResult>(getProtectionConfigIR);


