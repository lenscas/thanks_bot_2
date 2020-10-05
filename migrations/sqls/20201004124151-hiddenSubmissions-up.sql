CREATE TABLE public.hidden_submissions (
    server_id bigint NOT NULL,
    from_channel bigint NOT NULL,
    stored_channel bigint NOT NULL,
    UNIQUE(server_id, stored_channel)
);

ALTER TABLE ONLY public.hidden_submissions
    ADD CONSTRAINT hidden_submissions_pk PRIMARY KEY (server_id,from_channel);
