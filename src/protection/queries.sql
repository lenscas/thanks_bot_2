/* @name get_protection_config */
SELECT channel_report_mutes, mute_role, muted_marker_role
FROM server_config
WHERE server_id = :server_id;

/* @name check_if_all_urls_are_whitelisted 
@param urls -> (...)
*/
SELECT count(*)
FROM safe_urls
WHERE "url" in :urls;
