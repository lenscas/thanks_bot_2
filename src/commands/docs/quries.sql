/* @name get_autocomplete_class */
SELECT doc_cache_classes.class_name AS name
FROM doc_cache_classes
INNER JOIN docs_for
ON docs_for.id = doc_cache_classes.for_site
WHERE docs_for.name = :doc_for
AND doc_cache_classes.class_name LIKE :searching_for
LIMIT 25;
/* @name get_autocomplete_method */
SELECT doc_cache_methods.method_name AS name
FROM doc_cache_methods
INNER JOIN doc_cache_classes
ON doc_cache_classes.id = doc_cache_methods."for_class"
INNER JOIN docs_for
ON docs_for.id = doc_cache_classes.for_site
WHERE doc_cache_classes.class_name = :class_name
AND docs_for."name"  = :site_name
AND doc_cache_methods.method_name LIKE :method_name
LIMIT 25;

/* @name get_method_id */
SELECT doc_cache_methods.element_id
FROM doc_cache_methods
INNER JOIN doc_cache_classes
ON doc_cache_classes.id = doc_cache_methods."for_class"
INNER JOIN docs_for
ON docs_for.id = doc_cache_classes.for_site
WHERE doc_cache_classes.class_name = :class_name
AND docs_for."name" = :site_name
AND doc_cache_methods.method_name = :method_name;