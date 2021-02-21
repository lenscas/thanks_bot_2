CREATE TABLE public.custom_commands
(
    server_id bigint NOT NULL,
    name character varying(255) NOT NULL,
    channel_id bigint,
    message text NOT NULL,
    PRIMARY KEY (server_id, name)
);