CREATE TABLE public.polls
(
   id bigserial NOT NULL,
   name character varying(30) NOT NULL,
   server_id bigint NOT NULL,
   channel_id bigint NOT NULL,
   react_emoji character varying(15) NOT NULL,
   PRIMARY KEY (id),
   UNIQUE (name, channel_id, server_id)
);

CREATE TABLE public.poll_messages
(
   poll_id bigint NOT NULL,
   message_id bigint NOT NULL,
   PRIMARY KEY (poll_id, message_id)
);

ALTER TABLE public.poll_messages
  ADD CONSTRAINT poll_foreign_key FOREIGN KEY (poll_id) REFERENCES public.polls (id)
   ON UPDATE NO ACTION ON DELETE CASCADE;

CREATE INDEX fki_poll_foreign_key
  ON public.poll_messages(poll_id);

