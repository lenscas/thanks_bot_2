/** Types generated for queries found in "src/commands/moderators/spamProtection/queries.sql" */
import { PreparedQuery } from '@pgtyped/query';

/** 'UpdateSpamProtectionConfig' parameters type */
export interface IUpdateSpamProtectionConfigParams {
  channel_id: string | null | void;
  role_id: string | null | void;
  server_id: string | null | void;
}

/** 'UpdateSpamProtectionConfig' return type */
export type IUpdateSpamProtectionConfigResult = void;

/** 'UpdateSpamProtectionConfig' query type */
export interface IUpdateSpamProtectionConfigQuery {
  params: IUpdateSpamProtectionConfigParams;
  result: IUpdateSpamProtectionConfigResult;
}

const updateSpamProtectionConfigIR: any = {"usedParamSet":{"server_id":true,"channel_id":true,"role_id":true},"params":[{"name":"server_id","required":false,"transform":{"type":"scalar"},"locs":[{"a":87,"b":96}]},{"name":"channel_id","required":false,"transform":{"type":"scalar"},"locs":[{"a":99,"b":109},{"a":207,"b":217}]},{"name":"role_id","required":false,"transform":{"type":"scalar"},"locs":[{"a":112,"b":119},{"a":242,"b":249}]}],"statement":"INSERT INTO server_config (server_id, channel_report_mutes, muted_marker_role)\nVALUES (:server_id, :channel_id, :role_id)\nON CONFLICT ON CONSTRAINT server_config_pk\nDO\nUPDATE SET \n    channel_report_mutes = :channel_id,\n    muted_marker_role=:role_id"};

/**
 * Query generated from SQL:
 * ```
 * INSERT INTO server_config (server_id, channel_report_mutes, muted_marker_role)
 * VALUES (:server_id, :channel_id, :role_id)
 * ON CONFLICT ON CONSTRAINT server_config_pk
 * DO
 * UPDATE SET 
 *     channel_report_mutes = :channel_id,
 *     muted_marker_role=:role_id
 * ```
 */
export const updateSpamProtectionConfig = new PreparedQuery<IUpdateSpamProtectionConfigParams,IUpdateSpamProtectionConfigResult>(updateSpamProtectionConfigIR);


