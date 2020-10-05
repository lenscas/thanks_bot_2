/* @name get_command_channel */
SELECT command_channel
FROM server_config
WHERE server_id = :server_id;

/* @name get_channel_to_copy_submissions_to */
SELECT stored_channel
FROM hidden_submissions
WHERE server_id = :server_id
AND from_channel = :current_channel;