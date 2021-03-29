ALTER TABLE public.server_config
    ADD COLUMN channel_report_mutes bigint;
ALTER TABLE public.server_config
    ADD COLUMN muted_marker_role bigint;