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

const addUrlToWhitelistIR: any = {"name":"add_url_to_whitelist","params":[{"name":"url","required":false,"transform":{"type":"scalar"},"codeRefs":{"used":[{"a":70,"b":72,"line":2,"col":37}]}}],"usedParamSet":{"url":true},"statement":{"body":"INSERT INTO safe_urls (url) VALUES (:url)","loc":{"a":33,"b":73,"line":2,"col":0}}};

/**
 * Query generated from SQL:
 * ```
 * INSERT INTO safe_urls (url) VALUES (:url)
 * ```
 */
export const addUrlToWhitelist = new PreparedQuery<IAddUrlToWhitelistParams,IAddUrlToWhitelistResult>(addUrlToWhitelistIR);


