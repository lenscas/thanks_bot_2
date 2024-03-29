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

/* @name set_mute_role */
INSERT INTO server_config (server_id, mute_role)
VALUES (:server_id, :role_id)
ON CONFLICT ON CONSTRAINT server_config_pk
DO
UPDATE SET mute_role=:role_id;

/* @name get_mute_role */
SELECT mute_role
FROM server_config
WHERE server_id = :server_id;

/* @name enable_submission_channel */
INSERT INTO hidden_submissions (server_id, from_channel, stored_channel)
VALUES (:server_id, :from_channel, :to_channel);

/* @name check_if_channels_are_already_used */
SELECT
    (
        SELECT count(*) AS from_channel_count
        FROM hidden_submissions
        WHERE server_id = :server_id
        AND from_channel = :from_channel
    ) AS from_channel_count,
    (
        SELECT count(*) AS stored_channel_count
        FROM hidden_submissions
        WHERE server_id = :server_id
        AND stored_channel = :to_channel
    ) as stored_channel_count;

/* @name end_submission */
DELETE FROM hidden_submissions
WHERE server_id = :server_id
AND from_channel = :from_channel
RETURNING stored_channel;

/* @name check_if_command_exists */
SELECT count(*) 
FROM custom_commands
WHERE server_id = :server_id
AND "name" = :name;

/* @name add_command */
INSERT INTO custom_commands (server_id, "name", "message", channel_id)
VALUES (:server_id, :name, :message, :channel_id);

/* @name delete_command */
DELETE FROM custom_commands
WHERE server_id = :server_id
AND "name" = :name;

/* @name edit_command */
UPDATE custom_commands
SET channel_id=:channel_id, message=:message
WHERE server_id = :server_id
AND "name"=:name;

/* @name insert_mute */
INSERT INTO muted_people (server_id, user_id, end_date)
VALUES (:server_id, :user_id, :end_date)
ON CONFLICT ON CONSTRAINT muted_people_pkey
DO
UPDATE SET end_date=:end_date, start_date = DEFAULT;

/* @name delete_mute */
DELETE FROM muted_people
WHERE server_id = :server_id
AND user_id = :user_id;

/* @name get_mutes */
SELECT server_id,user_id,end_date
FROM muted_people;