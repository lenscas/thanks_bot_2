/* @name updateSpamProtectionConfig */ 
INSERT INTO server_config (server_id, channel_report_mutes, muted_marker_role)
VALUES (:server_id, :channel_id, :role_id)
ON CONFLICT ON CONSTRAINT server_config_pk
DO
UPDATE SET 
    channel_report_mutes = :channel_id,
    muted_marker_role=:role_id;