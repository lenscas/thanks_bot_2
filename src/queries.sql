/* @name get_command_channel */
SELECT command_channel
FROM server_config
WHERE server_id = :server_id;

/* @name get_channel_to_copy_submissions_to */
SELECT stored_channel
FROM hidden_submissions
WHERE server_id = :server_id
AND from_channel = :current_channel;

/* @name get_command_to_run */
SELECT message 
FROM custom_commands
WHERE server_id = :server_id
AND (
    channel_id =:channel
    OR channel_id IS NULL
)
AND name = :name
LIMIT 1;

/* @name get_every_custom_command_name */
SELECT "name"
FROM custom_commands
WHERE server_id = :server_id;

/* @name enable_commands */
DELETE FROM servers_with_commands_disabled
WHERE server_id = :server_id;

/* @name disable_commands */
INSERT INTO servers_with_commands_disabled
(server_id) VALUES (:server_id);

/* @name get_servers_without_commands */
SELECT server_id
FROM servers_with_commands_disabled;