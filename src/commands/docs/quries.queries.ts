/** Types generated for queries found in "src/commands/docs/quries.sql" */
import { PreparedQuery } from '@pgtyped/query';

/** 'GetAutocompleteClass' parameters type */
export interface IGetAutocompleteClassParams {
  doc_for: string | null | void;
  searching_for: string | null | void;
}

/** 'GetAutocompleteClass' return type */
export interface IGetAutocompleteClassResult {
  name: string;
}

/** 'GetAutocompleteClass' query type */
export interface IGetAutocompleteClassQuery {
  params: IGetAutocompleteClassParams;
  result: IGetAutocompleteClassResult;
}

const getAutocompleteClassIR: any = {"usedParamSet":{"doc_for":true,"searching_for":true},"params":[{"name":"doc_for","required":false,"transform":{"type":"scalar"},"locs":[{"a":153,"b":160}]},{"name":"searching_for","required":false,"transform":{"type":"scalar"},"locs":[{"a":200,"b":213}]}],"statement":"SELECT doc_cache_classes.class_name AS name\nFROM doc_cache_classes\nINNER JOIN docs_for\nON docs_for.id = doc_cache_classes.for_site\nWHERE docs_for.name = :doc_for\nAND doc_cache_classes.class_name LIKE :searching_for\nLIMIT 25"};

/**
 * Query generated from SQL:
 * ```
 * SELECT doc_cache_classes.class_name AS name
 * FROM doc_cache_classes
 * INNER JOIN docs_for
 * ON docs_for.id = doc_cache_classes.for_site
 * WHERE docs_for.name = :doc_for
 * AND doc_cache_classes.class_name LIKE :searching_for
 * LIMIT 25
 * ```
 */
export const getAutocompleteClass = new PreparedQuery<IGetAutocompleteClassParams,IGetAutocompleteClassResult>(getAutocompleteClassIR);


/** 'GetAutocompleteMethod' parameters type */
export interface IGetAutocompleteMethodParams {
  class_name: string | null | void;
  method_name: string | null | void;
  site_name: string | null | void;
}

/** 'GetAutocompleteMethod' return type */
export interface IGetAutocompleteMethodResult {
  name: string;
}

/** 'GetAutocompleteMethod' query type */
export interface IGetAutocompleteMethodQuery {
  params: IGetAutocompleteMethodParams;
  result: IGetAutocompleteMethodResult;
}

const getAutocompleteMethodIR: any = {"usedParamSet":{"class_name":true,"site_name":true,"method_name":true},"params":[{"name":"class_name","required":false,"transform":{"type":"scalar"},"locs":[{"a":254,"b":264}]},{"name":"site_name","required":false,"transform":{"type":"scalar"},"locs":[{"a":289,"b":298}]},{"name":"method_name","required":false,"transform":{"type":"scalar"},"locs":[{"a":339,"b":350}]}],"statement":"SELECT doc_cache_methods.method_name AS name\nFROM doc_cache_methods\nINNER JOIN doc_cache_classes\nON doc_cache_classes.id = doc_cache_methods.\"for_class\"\nINNER JOIN docs_for\nON docs_for.id = doc_cache_classes.for_site\nWHERE doc_cache_classes.class_name = :class_name\nAND docs_for.\"name\"  = :site_name\nAND doc_cache_methods.method_name LIKE :method_name\nLIMIT 25"};

/**
 * Query generated from SQL:
 * ```
 * SELECT doc_cache_methods.method_name AS name
 * FROM doc_cache_methods
 * INNER JOIN doc_cache_classes
 * ON doc_cache_classes.id = doc_cache_methods."for_class"
 * INNER JOIN docs_for
 * ON docs_for.id = doc_cache_classes.for_site
 * WHERE doc_cache_classes.class_name = :class_name
 * AND docs_for."name"  = :site_name
 * AND doc_cache_methods.method_name LIKE :method_name
 * LIMIT 25
 * ```
 */
export const getAutocompleteMethod = new PreparedQuery<IGetAutocompleteMethodParams,IGetAutocompleteMethodResult>(getAutocompleteMethodIR);


/** 'GetMethodId' parameters type */
export interface IGetMethodIdParams {
  class_name: string | null | void;
  method_name: string | null | void;
  site_name: string | null | void;
}

/** 'GetMethodId' return type */
export interface IGetMethodIdResult {
  element_id: string;
}

/** 'GetMethodId' query type */
export interface IGetMethodIdQuery {
  params: IGetMethodIdParams;
  result: IGetMethodIdResult;
}

const getMethodIdIR: any = {"usedParamSet":{"class_name":true,"site_name":true,"method_name":true},"params":[{"name":"class_name","required":false,"transform":{"type":"scalar"},"locs":[{"a":245,"b":255}]},{"name":"site_name","required":false,"transform":{"type":"scalar"},"locs":[{"a":279,"b":288}]},{"name":"method_name","required":false,"transform":{"type":"scalar"},"locs":[{"a":326,"b":337}]}],"statement":"SELECT doc_cache_methods.element_id\nFROM doc_cache_methods\nINNER JOIN doc_cache_classes\nON doc_cache_classes.id = doc_cache_methods.\"for_class\"\nINNER JOIN docs_for\nON docs_for.id = doc_cache_classes.for_site\nWHERE doc_cache_classes.class_name = :class_name\nAND docs_for.\"name\" = :site_name\nAND doc_cache_methods.method_name = :method_name"};

/**
 * Query generated from SQL:
 * ```
 * SELECT doc_cache_methods.element_id
 * FROM doc_cache_methods
 * INNER JOIN doc_cache_classes
 * ON doc_cache_classes.id = doc_cache_methods."for_class"
 * INNER JOIN docs_for
 * ON docs_for.id = doc_cache_classes.for_site
 * WHERE doc_cache_classes.class_name = :class_name
 * AND docs_for."name" = :site_name
 * AND doc_cache_methods.method_name = :method_name
 * ```
 */
export const getMethodId = new PreparedQuery<IGetMethodIdParams,IGetMethodIdResult>(getMethodIdIR);


