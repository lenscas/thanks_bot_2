/* @name update_thank_time */
INSERT INTO server_config (server_id, time_between_thanking)
VALUES (:server_id,:time_in_minutes)
ON CONFLICT ON CONSTRAINT server_config_pk
DO
UPDATE SET time_between_thanking=:time_in_minutes;

/* @name set_command_channel */
INSERT INTO server_config (server_id, command_channel)
VALUES (:server_id, :channel_id)
ON CONFLICT ON CONSTRAINT server_config_pk
DO
UPDATE SET command_channel=:channel_id;