/** Types generated for queries found in "./src/test/test.sql" */
import { PreparedQuery } from '@pgtyped/query';

/** 'TestQuery' parameters type */
export type ITestQueryParams = void;

/** 'TestQuery' return type */
export interface ITestQueryResult {
  test: number | null;
}

/** 'TestQuery' query type */
export interface ITestQueryQuery {
  params: ITestQueryParams;
  result: ITestQueryResult;
}

const testQueryIR: any = {"name":"testQuery","params":[],"usedParamSet":{},"statement":{"body":"SELECT 1 AS test LIMIT 1","loc":{"a":22,"b":45,"line":2,"col":0}}};

/**
 * Query generated from SQL:
 * ```
 * SELECT 1 AS test LIMIT 1
 * ```
 */
export const testQuery = new PreparedQuery<ITestQueryParams,ITestQueryResult>(testQueryIR);


