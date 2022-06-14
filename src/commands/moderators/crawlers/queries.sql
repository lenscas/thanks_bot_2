/* @name get_last_crawled_time */
SELECT last_time_crawled
FROM docs_for
WHERE "name" = :name;
/* @name set_crawled_time */
INSERT INTO docs_for
("name",last_time_crawled)
VALUES(:name,Current_timestamp)
ON CONFLICT ON CONSTRAINT docs_for_un
DO
UPDATE SET last_time_crawled=Current_timestamp
RETURNING id;
/* @name get_all_doc_classes */
SELECT id,class_name
FROM doc_cache_classes
WHERE for_site = :for;

/* @name delete_removed_class_names */
DELETE FROM doc_cache_classes
WHERE id =:id;

/* @name insert_new_class_name */
INSERT INTO
    doc_cache_classes (class_name,for_site)
VALUES (:name,:site_id)
RETURNING id;

/* @name log_new_message */
INSERT INTO
    crawler_log ("for",message)
VALUES (:for,:message);

/* @name delete_old_logs */
DELETE FROM crawler_log
WHERE "for" = :for
AND log_time < NOW() - INTERVAL '2 hours';

/* @name insert_new_method */
INSERT INTO
    doc_cache_methods
    SELECT
        doc_cache_classes.id as for_class,
        :method_name as method_name,
		:element_id as element_id
    FROM doc_cache_classes
    WHERE doc_cache_classes.class_name = :class_name
ON CONFLICT ON CONSTRAINT doc_cache_methods_pk
DO
UPDATE SET element_id=:element_id;

/* @name delete_old_method */
DELETE FROM doc_cache_methods
WHERE doc_cache_methods.for_class IN (
	SELECT doc_cache_classes.id
	FROM doc_cache_classes
	WHERE doc_cache_classes.class_name = :class_name
)
AND doc_cache_methods.method_name = :method_name;

/* @name get_methods_of_class */
SELECT doc_cache_methods.method_name
FROM doc_cache_methods
INNER JOIN doc_cache_classes
ON doc_cache_classes.id = doc_cache_methods.for_class
WHERE doc_cache_classes.class_name = :class_name;

/* @name get_log */
select string_agg(message,E'\n') as log_message
from(
	select 
		1 as dumb,
		concat(cl.log_time,' : ', cl.message) as message
	from crawler_log cl
	inner join docs_for df 
	on df.id =cl."for"
	where df."name" =:name
	order by cl.log_time desc 
	limit 10000
) logCollector
group  by dumb;

/* @name get_available_logs */
SELECT 
	docs_for.name
FROM crawler_log
INNER JOIN docs_for
ON docs_for.id = crawler_log."for"
GROUP BY docs_for.name;