ALTER TABLE public.server_config
    ADD COLUMN command_channel bigint;
ALTER TABLE public.server_config
    ALTER COLUMN time_between_thanking DROP NOT NULL;