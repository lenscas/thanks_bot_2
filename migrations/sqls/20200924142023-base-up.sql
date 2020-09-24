CREATE TABLE public.recent_thanked (
    user_id bigint NOT NULL,
    did_thank bigint NOT NULL,
    server_id bigint NOT NULL,
    at_time bigint NOT NULL
);

CREATE TABLE public.server_config (
    server_id bigint NOT NULL,
    time_between_thanking bigint NOT NULL
);


--
-- Name: thanked_users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.thanked_users (
    user_id bigint NOT NULL,
    server_id bigint NOT NULL,
    times bigint NOT NULL
);


--
-- Name: recent_thanked recent_thanked_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.recent_thanked
    ADD CONSTRAINT recent_thanked_pk PRIMARY KEY (user_id,server_id,did_thank);

ALTER TABLE ONLY public.server_config
    ADD CONSTRAINT server_config_pk PRIMARY KEY (server_id);

--
-- Name: thanked_users thanked_users_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.thanked_users
    ADD CONSTRAINT thanked_users_pk PRIMARY KEY (user_id, server_id);


--
-- Name: recent_thanked recent_thanked_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.recent_thanked
    ADD CONSTRAINT recent_thanked_fk FOREIGN KEY (did_thank, server_id) REFERENCES public.thanked_users(user_id,server_id);

CREATE INDEX recent_thanked_at_time_idx ON public.recent_thanked (at_time);
CREATE INDEX thanked_users_times_idx ON public.thanked_users (times);


--
-- PostgreSQL database dump complete
--

