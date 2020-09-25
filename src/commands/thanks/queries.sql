/* @name top */
SELECT user_id, times
FROM thanked_users
WHERE user_id != :user_id
AND server_id = :server_id
ORDER BY times DESC
LIMIT 10;