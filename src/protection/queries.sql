/* @name get_protection_config */
SELECT channel_report_mutes, mute_role, muted_marker_role
FROM server_config
WHERE server_id = :server_id;