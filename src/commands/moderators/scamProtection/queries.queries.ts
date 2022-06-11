/** Types generated for queries found in "src/commands/moderators/scamProtection/queries.sql" */
import { PreparedQuery } from '@pgtyped/query';

/** 'AddUrlToWhitelist' parameters type */
export interface IAddUrlToWhitelistParams {
  url: string | null | void;
}

/** 'AddUrlToWhitelist' return type */
export type IAddUrlToWhitelistResult = void;

/** 'AddUrlToWhitelist' query type */
export interface IAddUrlToWhitelistQuery {
  params: IAddUrlToWhitelistParams;
  result: IAddUrlToWhitelistResult;
}

const addUrlToWhitelistIR: any = {"usedParamSet":{"url":true},"params":[{"name":"url","required":false,"transform":{"type":"scalar"},"locs":[{"a":36,"b":39}]}],"statement":"INSERT INTO safe_urls (url) VALUES (:url)"};

/**
 * Query generated from SQL:
 * ```
 * INSERT INTO safe_urls (url) VALUES (:url)
 * ```
 */
export const addUrlToWhitelist = new PreparedQuery<IAddUrlToWhitelistParams,IAddUrlToWhitelistResult>(addUrlToWhitelistIR);


