/** Types generated for queries found in "src/commands/moderators/spamProtection/queries.sql" */
import { PreparedQuery } from '@pgtyped/query';

/** 'UpdateSpamProtectionConfig' parameters type */
export interface IUpdateSpamProtectionConfigParams {
  server_id: string | null | void;
  channel_id: string | null | void;
  role_id: string | null | void;
}

/** 'UpdateSpamProtectionConfig' return type */
export type IUpdateSpamProtectionConfigResult = void;

/** 'UpdateSpamProtectionConfig' query type */
export interface IUpdateSpamProtectionConfigQuery {
  params: IUpdateSpamProtectionConfigParams;
  result: IUpdateSpamProtectionConfigResult;
}

const updateSpamProtectionConfigIR: any = {"name":"updateSpamProtectionConfig","params":[{"name":"server_id","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":128,"b":136,"line":3,"col":9}]}},{"name":"channel_id","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":140,"b":149,"line":3,"col":21},{"a":248,"b":257,"line":7,"col":28}]}},{"name":"role_id","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":153,"b":159,"line":3,"col":34},{"a":283,"b":289,"line":8,"col":23}]}}],"usedParamSet":{"server_id":true,"channel_id":true,"role_id":true},"statement":{"body":"INSERT INTO server_config (server_id, channel_report_mutes, muted_marker_role)\nVALUES (:server_id, :channel_id, :role_id)\nON CONFLICT ON CONSTRAINT server_config_pk\nDO\nUPDATE SET \n    channel_report_mutes = :channel_id,\n    muted_marker_role=:role_id","loc":{"a":40,"b":289,"line":2,"col":0}}};

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


