/** Types generated for queries found in "src/commands/moderators/crawlers/queries.sql" */
import { PreparedQuery } from '@pgtyped/query';

/** 'GetLastCrawledTime' parameters type */
export interface IGetLastCrawledTimeParams {
  name: string | null | void;
}

/** 'GetLastCrawledTime' return type */
export interface IGetLastCrawledTimeResult {
  last_time_crawled: Date;
}

/** 'GetLastCrawledTime' query type */
export interface IGetLastCrawledTimeQuery {
  params: IGetLastCrawledTimeParams;
  result: IGetLastCrawledTimeResult;
}

const getLastCrawledTimeIR: any = {"usedParamSet":{"name":true},"params":[{"name":"name","required":false,"transform":{"type":"scalar"},"locs":[{"a":54,"b":58}]}],"statement":"SELECT last_time_crawled\nFROM docs_for\nWHERE \"name\" = :name"};

/**
 * Query generated from SQL:
 * ```
 * SELECT last_time_crawled
 * FROM docs_for
 * WHERE "name" = :name
 * ```
 */
export const getLastCrawledTime = new PreparedQuery<IGetLastCrawledTimeParams,IGetLastCrawledTimeResult>(getLastCrawledTimeIR);


/** 'SetCrawledTime' parameters type */
export interface ISetCrawledTimeParams {
  name: string | null | void;
}

/** 'SetCrawledTime' return type */
export interface ISetCrawledTimeResult {
  id: number;
}

/** 'SetCrawledTime' query type */
export interface ISetCrawledTimeQuery {
  params: ISetCrawledTimeParams;
  result: ISetCrawledTimeResult;
}

const setCrawledTimeIR: any = {"usedParamSet":{"name":true},"params":[{"name":"name","required":false,"transform":{"type":"scalar"},"locs":[{"a":55,"b":59}]}],"statement":"INSERT INTO docs_for\n(\"name\",last_time_crawled)\nVALUES(:name,Current_timestamp)\nON CONFLICT ON CONSTRAINT docs_for_un\nDO\nUPDATE SET last_time_crawled=Current_timestamp\nRETURNING id"};

/**
 * Query generated from SQL:
 * ```
 * INSERT INTO docs_for
 * ("name",last_time_crawled)
 * VALUES(:name,Current_timestamp)
 * ON CONFLICT ON CONSTRAINT docs_for_un
 * DO
 * UPDATE SET last_time_crawled=Current_timestamp
 * RETURNING id
 * ```
 */
export const setCrawledTime = new PreparedQuery<ISetCrawledTimeParams,ISetCrawledTimeResult>(setCrawledTimeIR);


/** 'GetAllDocClasses' parameters type */
export interface IGetAllDocClassesParams {
  for: number | null | void;
}

/** 'GetAllDocClasses' return type */
export interface IGetAllDocClassesResult {
  class_name: string;
  id: number;
}

/** 'GetAllDocClasses' query type */
export interface IGetAllDocClassesQuery {
  params: IGetAllDocClassesParams;
  result: IGetAllDocClassesResult;
}

const getAllDocClassesIR: any = {"usedParamSet":{"for":true},"params":[{"name":"for","required":false,"transform":{"type":"scalar"},"locs":[{"a":61,"b":64}]}],"statement":"SELECT id,class_name\nFROM doc_cache_classes\nWHERE for_site = :for"};

/**
 * Query generated from SQL:
 * ```
 * SELECT id,class_name
 * FROM doc_cache_classes
 * WHERE for_site = :for
 * ```
 */
export const getAllDocClasses = new PreparedQuery<IGetAllDocClassesParams,IGetAllDocClassesResult>(getAllDocClassesIR);


/** 'DeleteRemovedClassNames' parameters type */
export interface IDeleteRemovedClassNamesParams {
  id: number | null | void;
}

/** 'DeleteRemovedClassNames' return type */
export type IDeleteRemovedClassNamesResult = void;

/** 'DeleteRemovedClassNames' query type */
export interface IDeleteRemovedClassNamesQuery {
  params: IDeleteRemovedClassNamesParams;
  result: IDeleteRemovedClassNamesResult;
}

const deleteRemovedClassNamesIR: any = {"usedParamSet":{"id":true},"params":[{"name":"id","required":false,"transform":{"type":"scalar"},"locs":[{"a":40,"b":42}]}],"statement":"DELETE FROM doc_cache_classes\nWHERE id =:id"};

/**
 * Query generated from SQL:
 * ```
 * DELETE FROM doc_cache_classes
 * WHERE id =:id
 * ```
 */
export const deleteRemovedClassNames = new PreparedQuery<IDeleteRemovedClassNamesParams,IDeleteRemovedClassNamesResult>(deleteRemovedClassNamesIR);


/** 'InsertNewClassName' parameters type */
export interface IInsertNewClassNameParams {
  name: string | null | void;
  site_id: number | null | void;
}

/** 'InsertNewClassName' return type */
export interface IInsertNewClassNameResult {
  id: number;
}

/** 'InsertNewClassName' query type */
export interface IInsertNewClassNameQuery {
  params: IInsertNewClassNameParams;
  result: IInsertNewClassNameResult;
}

const insertNewClassNameIR: any = {"usedParamSet":{"name":true,"site_id":true},"params":[{"name":"name","required":false,"transform":{"type":"scalar"},"locs":[{"a":64,"b":68}]},{"name":"site_id","required":false,"transform":{"type":"scalar"},"locs":[{"a":70,"b":77}]}],"statement":"INSERT INTO\n    doc_cache_classes (class_name,for_site)\nVALUES (:name,:site_id)\nRETURNING id"};

/**
 * Query generated from SQL:
 * ```
 * INSERT INTO
 *     doc_cache_classes (class_name,for_site)
 * VALUES (:name,:site_id)
 * RETURNING id
 * ```
 */
export const insertNewClassName = new PreparedQuery<IInsertNewClassNameParams,IInsertNewClassNameResult>(insertNewClassNameIR);


/** 'LogNewMessage' parameters type */
export interface ILogNewMessageParams {
  for: number | null | void;
  message: string | null | void;
}

/** 'LogNewMessage' return type */
export type ILogNewMessageResult = void;

/** 'LogNewMessage' query type */
export interface ILogNewMessageQuery {
  params: ILogNewMessageParams;
  result: ILogNewMessageResult;
}

const logNewMessageIR: any = {"usedParamSet":{"for":true,"message":true},"params":[{"name":"for","required":false,"transform":{"type":"scalar"},"locs":[{"a":52,"b":55}]},{"name":"message","required":false,"transform":{"type":"scalar"},"locs":[{"a":57,"b":64}]}],"statement":"INSERT INTO\n    crawler_log (\"for\",message)\nVALUES (:for,:message)"};

/**
 * Query generated from SQL:
 * ```
 * INSERT INTO
 *     crawler_log ("for",message)
 * VALUES (:for,:message)
 * ```
 */
export const logNewMessage = new PreparedQuery<ILogNewMessageParams,ILogNewMessageResult>(logNewMessageIR);


/** 'DeleteOldLogs' parameters type */
export interface IDeleteOldLogsParams {
  for: number | null | void;
}

/** 'DeleteOldLogs' return type */
export type IDeleteOldLogsResult = void;

/** 'DeleteOldLogs' query type */
export interface IDeleteOldLogsQuery {
  params: IDeleteOldLogsParams;
  result: IDeleteOldLogsResult;
}

const deleteOldLogsIR: any = {"usedParamSet":{"for":true},"params":[{"name":"for","required":false,"transform":{"type":"scalar"},"locs":[{"a":38,"b":41}]}],"statement":"DELETE FROM crawler_log\nWHERE \"for\" = :for\nAND log_time < NOW() - INTERVAL '2 hours'"};

/**
 * Query generated from SQL:
 * ```
 * DELETE FROM crawler_log
 * WHERE "for" = :for
 * AND log_time < NOW() - INTERVAL '2 hours'
 * ```
 */
export const deleteOldLogs = new PreparedQuery<IDeleteOldLogsParams,IDeleteOldLogsResult>(deleteOldLogsIR);


/** 'InsertNewMethod' parameters type */
export interface IInsertNewMethodParams {
  class_name: string | null | void;
  element_id: string | null | void;
  method_name: string | null | void;
}

/** 'InsertNewMethod' return type */
export type IInsertNewMethodResult = void;

/** 'InsertNewMethod' query type */
export interface IInsertNewMethodQuery {
  params: IInsertNewMethodParams;
  result: IInsertNewMethodResult;
}

const insertNewMethodIR: any = {"usedParamSet":{"method_name":true,"element_id":true,"class_name":true},"params":[{"name":"method_name","required":false,"transform":{"type":"scalar"},"locs":[{"a":96,"b":107}]},{"name":"element_id","required":false,"transform":{"type":"scalar"},"locs":[{"a":127,"b":137},{"a":305,"b":315}]},{"name":"class_name","required":false,"transform":{"type":"scalar"},"locs":[{"a":221,"b":231}]}],"statement":"INSERT INTO\n    doc_cache_methods\n    SELECT\n        doc_cache_classes.id as for_class,\n        :method_name as method_name,\n\t\t:element_id as element_id\n    FROM doc_cache_classes\n    WHERE doc_cache_classes.class_name = :class_name\nON CONFLICT ON CONSTRAINT doc_cache_methods_pk\nDO\nUPDATE SET element_id=:element_id"};

/**
 * Query generated from SQL:
 * ```
 * INSERT INTO
 *     doc_cache_methods
 *     SELECT
 *         doc_cache_classes.id as for_class,
 *         :method_name as method_name,
 * 		:element_id as element_id
 *     FROM doc_cache_classes
 *     WHERE doc_cache_classes.class_name = :class_name
 * ON CONFLICT ON CONSTRAINT doc_cache_methods_pk
 * DO
 * UPDATE SET element_id=:element_id
 * ```
 */
export const insertNewMethod = new PreparedQuery<IInsertNewMethodParams,IInsertNewMethodResult>(insertNewMethodIR);


/** 'DeleteOldMethod' parameters type */
export interface IDeleteOldMethodParams {
  class_name: string | null | void;
  method_name: string | null | void;
}

/** 'DeleteOldMethod' return type */
export type IDeleteOldMethodResult = void;

/** 'DeleteOldMethod' query type */
export interface IDeleteOldMethodQuery {
  params: IDeleteOldMethodParams;
  result: IDeleteOldMethodResult;
}

const deleteOldMethodIR: any = {"usedParamSet":{"class_name":true,"method_name":true},"params":[{"name":"class_name","required":false,"transform":{"type":"scalar"},"locs":[{"a":160,"b":170}]},{"name":"method_name","required":false,"transform":{"type":"scalar"},"locs":[{"a":210,"b":221}]}],"statement":"DELETE FROM doc_cache_methods\nWHERE doc_cache_methods.for_class IN (\n\tSELECT doc_cache_classes.id\n\tFROM doc_cache_classes\n\tWHERE doc_cache_classes.class_name = :class_name\n)\nAND doc_cache_methods.method_name = :method_name"};

/**
 * Query generated from SQL:
 * ```
 * DELETE FROM doc_cache_methods
 * WHERE doc_cache_methods.for_class IN (
 * 	SELECT doc_cache_classes.id
 * 	FROM doc_cache_classes
 * 	WHERE doc_cache_classes.class_name = :class_name
 * )
 * AND doc_cache_methods.method_name = :method_name
 * ```
 */
export const deleteOldMethod = new PreparedQuery<IDeleteOldMethodParams,IDeleteOldMethodResult>(deleteOldMethodIR);


/** 'GetMethodsOfClass' parameters type */
export interface IGetMethodsOfClassParams {
  class_name: string | null | void;
}

/** 'GetMethodsOfClass' return type */
export interface IGetMethodsOfClassResult {
  method_name: string;
}

/** 'GetMethodsOfClass' query type */
export interface IGetMethodsOfClassQuery {
  params: IGetMethodsOfClassParams;
  result: IGetMethodsOfClassResult;
}

const getMethodsOfClassIR: any = {"usedParamSet":{"class_name":true},"params":[{"name":"class_name","required":false,"transform":{"type":"scalar"},"locs":[{"a":180,"b":190}]}],"statement":"SELECT doc_cache_methods.method_name\nFROM doc_cache_methods\nINNER JOIN doc_cache_classes\nON doc_cache_classes.id = doc_cache_methods.for_class\nWHERE doc_cache_classes.class_name = :class_name"};

/**
 * Query generated from SQL:
 * ```
 * SELECT doc_cache_methods.method_name
 * FROM doc_cache_methods
 * INNER JOIN doc_cache_classes
 * ON doc_cache_classes.id = doc_cache_methods.for_class
 * WHERE doc_cache_classes.class_name = :class_name
 * ```
 */
export const getMethodsOfClass = new PreparedQuery<IGetMethodsOfClassParams,IGetMethodsOfClassResult>(getMethodsOfClassIR);


/** 'GetLog' parameters type */
export interface IGetLogParams {
  name: string | null | void;
}

/** 'GetLog' return type */
export interface IGetLogResult {
  log_message: string | null;
}

/** 'GetLog' query type */
export interface IGetLogQuery {
  params: IGetLogParams;
  result: IGetLogResult;
}

const getLogIR: any = {"usedParamSet":{"name":true},"params":[{"name":"name","required":false,"transform":{"type":"scalar"},"locs":[{"a":211,"b":215}]}],"statement":"select string_agg(message,E'\\n') as log_message\nfrom(\n\tselect \n\t\t1 as dumb,\n\t\tconcat(cl.log_time,' : ', cl.message) as message\n\tfrom crawler_log cl\n\tinner join docs_for df \n\ton df.id =cl.\"for\"\n\twhere df.\"name\" =:name\n\torder by cl.log_time desc \n\tlimit 10000\n) logCollector\ngroup  by dumb"};

/**
 * Query generated from SQL:
 * ```
 * select string_agg(message,E'\n') as log_message
 * from(
 * 	select 
 * 		1 as dumb,
 * 		concat(cl.log_time,' : ', cl.message) as message
 * 	from crawler_log cl
 * 	inner join docs_for df 
 * 	on df.id =cl."for"
 * 	where df."name" =:name
 * 	order by cl.log_time desc 
 * 	limit 10000
 * ) logCollector
 * group  by dumb
 * ```
 */
export const getLog = new PreparedQuery<IGetLogParams,IGetLogResult>(getLogIR);


/** 'GetAvailableLogs' parameters type */
export type IGetAvailableLogsParams = void;

/** 'GetAvailableLogs' return type */
export interface IGetAvailableLogsResult {
  name: string;
}

/** 'GetAvailableLogs' query type */
export interface IGetAvailableLogsQuery {
  params: IGetAvailableLogsParams;
  result: IGetAvailableLogsResult;
}

const getAvailableLogsIR: any = {"usedParamSet":{},"params":[],"statement":"SELECT \n\tdocs_for.name\nFROM crawler_log\nINNER JOIN docs_for\nON docs_for.id = crawler_log.\"for\"\nGROUP BY docs_for.name"};

/**
 * Query generated from SQL:
 * ```
 * SELECT 
 * 	docs_for.name
 * FROM crawler_log
 * INNER JOIN docs_for
 * ON docs_for.id = crawler_log."for"
 * GROUP BY docs_for.name
 * ```
 */
export const getAvailableLogs = new PreparedQuery<IGetAvailableLogsParams,IGetAvailableLogsResult>(getAvailableLogsIR);


