/* @name top */
SELECT
      user_id,
      times
FROM thanked_users
WHERE user_id != :user_id
AND server_id = :server_id
ORDER BY times DESC
LIMIT 10;

/* @name get_cooldown_time_for_thanking */
SELECT time_between_thanking
FROM server_config
WHERE server_id =:server_id;

/* @name check_if_user_thanked */
SELECT COUNT(*) AS count
FROM recent_thanked
WHERE user_id = :thanker_id
AND did_thank = :getting_thanked_id
AND at_time > :time_since
AND server_id = :server_id;

/* @name insert_thanks */
INSERT INTO thanked_users (user_id,server_id, times)
VALUES(:getting_thanked_id,:server_id,1)
ON CONFLICT ON CONSTRAINT thanked_users_pk
DO
UPDATE SET times = thanked_users.times + 1;

/* @name insert_having_thanked */
INSERT INTO recent_thanked (user_id, did_thank, server_id, at_time)
VALUES (:thanker_id,:being_thanked_id,:server_id,:at_time)
ON CONFLICT ON CONSTRAINT recent_thanked_pk
DO
UPDATE SET at_time = :at_time;

/* @name get_rank_of_user */
SELECT
    thanked_users.times,
    (
        SELECT COUNT(*) FROM (
            SELECT times,server_id
            FROM thanked_users
                WHERE times >= (
                    SELECT times
                    FROM thanked_users
                    WHERE server_id = :server_id
                    AND user_id = :user_id
                ) AND server_id = :server_id
                GROUP BY times,server_id
        ) as rankings
    ) AS rank
FROM thanked_users
WHERE thanked_users.user_id = :user_id
AND thanked_users.server_id = :server_id
GROUP BY thanked_users.times;