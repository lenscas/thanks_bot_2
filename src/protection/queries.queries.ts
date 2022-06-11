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

const getProtectionConfigIR: any = {"usedParamSet":{"server_id":true},"params":[{"name":"server_id","required":false,"transform":{"type":"scalar"},"locs":[{"a":95,"b":104}]}],"statement":"SELECT channel_report_mutes, mute_role, muted_marker_role\nFROM server_config\nWHERE server_id = :server_id"};

/**
 * Query generated from SQL:
 * ```
 * SELECT channel_report_mutes, mute_role, muted_marker_role
 * FROM server_config
 * WHERE server_id = :server_id
 * ```
 */
export const getProtectionConfig = new PreparedQuery<IGetProtectionConfigParams,IGetProtectionConfigResult>(getProtectionConfigIR);


/** 'CheckIfAllUrlsAreWhitelisted' parameters type */
export interface ICheckIfAllUrlsAreWhitelistedParams {
  urls: readonly (string | null | void)[];
}

/** 'CheckIfAllUrlsAreWhitelisted' return type */
export interface ICheckIfAllUrlsAreWhitelistedResult {
  count: string | null;
}

/** 'CheckIfAllUrlsAreWhitelisted' query type */
export interface ICheckIfAllUrlsAreWhitelistedQuery {
  params: ICheckIfAllUrlsAreWhitelistedParams;
  result: ICheckIfAllUrlsAreWhitelistedResult;
}

const checkIfAllUrlsAreWhitelistedIR: any = {"usedParamSet":{"urls":true},"params":[{"name":"urls","required":false,"transform":{"type":"array_spread"},"locs":[{"a":46,"b":50}]}],"statement":"SELECT count(*)\nFROM safe_urls\nWHERE \"url\" in :urls"};

/**
 * Query generated from SQL:
 * ```
 * SELECT count(*)
 * FROM safe_urls
 * WHERE "url" in :urls
 * ```
 */
export const checkIfAllUrlsAreWhitelisted = new PreparedQuery<ICheckIfAllUrlsAreWhitelistedParams,ICheckIfAllUrlsAreWhitelistedResult>(checkIfAllUrlsAreWhitelistedIR);


