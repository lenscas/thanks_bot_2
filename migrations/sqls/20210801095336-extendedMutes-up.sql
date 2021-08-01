CREATE TABLE public.muted_people (
	server_id bigint NOT NULL,
	user_id bigint NOT NULL,
	start_date timestamp with time zone NOT NULL DEFAULT NOW(),
	end_date timestamp with time zone NOT NULL,
    PRIMARY KEY (server_id, user_id)
);
