/* @name get_command_channel */
SELECT command_channel
FROM server_config
WHERE server_id = :server_id;