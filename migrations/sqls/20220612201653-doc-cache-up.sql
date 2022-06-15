CREATE TABLE public.docs_for (
	id serial NOT NULL,
	name varchar NOT NULL,
	CONSTRAINT docs_for_pk PRIMARY KEY (id)
);

ALTER TABLE public.docs_for ADD last_time_crawled timestamp NOT NULL;

CREATE TABLE public.doc_cache_classes (
	id serial NOT NULL,
	for_site integer NOT NULL,
	class_name varchar NOT NULL,
	CONSTRAINT doc_cache_classes_pk PRIMARY KEY (id),
	CONSTRAINT doc_cache_classes_un UNIQUE (for_site,class_name)
);

CREATE TABLE public.doc_cache_methods (
	for_class integer NOT NULL,
	method_name varchar NOT NULL,
	CONSTRAINT doc_cache_methods_pk PRIMARY KEY (for_class,method_name),
	CONSTRAINT doc_cache_methods_fk FOREIGN KEY (for_class) REFERENCES public.doc_cache_classes(id)
);

ALTER TABLE public.doc_cache_methods DROP CONSTRAINT doc_cache_methods_fk;
ALTER TABLE public.doc_cache_methods ADD CONSTRAINT doc_cache_methods_fk FOREIGN KEY (for_class) REFERENCES public.doc_cache_classes(id) ON DELETE CASCADE;
ALTER TABLE public.docs_for ADD CONSTRAINT docs_for_un UNIQUE ("name");
ALTER TABLE public.doc_cache_classes ADD CONSTRAINT doc_cache_classes_fk FOREIGN KEY (for_site) REFERENCES public.docs_for(id);

CREATE TABLE public.crawler_log (
	log_time timestamp NOT NULL DEFAULT Current_timestamp,
	"for" integer NOT NULL,
	message text NOT NULL,
	CONSTRAINT crawler_log_pk PRIMARY KEY (log_time,"for"),
	CONSTRAINT crawler_log_fk FOREIGN KEY ("for") REFERENCES public.docs_for(id)
);

ALTER TABLE public.doc_cache_methods ADD element_id varchar NOT NULL;