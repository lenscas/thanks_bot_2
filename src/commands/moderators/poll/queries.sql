/* @name create_poll*/
INSERT INTO
	polls (name, server_id,channel_id,react_emoji)
VALUES (:name,:server_id, :channel_id, :react_emoji)
RETURNING id;

/* @name add_message_to_poll */
INSERT INTO
	poll_messages (poll_id, message_id)
VALUES (:poll_id, :message_id);

/* @name get_messages_from_poll */
SELECT message_id
FROM poll_messages
WHERE poll_id = :poll_id;

/* @name get_polls_in_channel */
SELECT id,name,react_emoji
FROM polls
WHERE server_id = :server_id
AND channel_id = :channel_id;

/* @name get_poll */
SELECT
	polls.id as poll_id,
	name,
	react_emoji,
	poll_messages.message_id
FROM polls
INNER JOIN poll_messages
ON poll_messages.poll_id = polls.id
WHERE server_id = :server_id
AND channel_id = :channel_id
AND name = :name;

/* @name delete_poll */
DELETE
FROM polls
WHERE id = :poll_id;

/* @name get_react_emoji */
SELECT react_emoji
FROM polls
WHERE server_id = :server_id
AND channel_id = :channel_id
AND name = :name;