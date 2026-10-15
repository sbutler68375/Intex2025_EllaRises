-- Simple demo logins (sample data only -- not real accounts).
--   admin / admin  -> admin role
--   user  / user   -> participant role, reusing sample participant 173
--                     (Lillian Martinez) so the account has events, surveys,
--                     milestones, and donations to show.

INSERT INTO participants (participant_email, participant_first_name, participant_last_name, participant_role, password)
VALUES ('admin', 'Demo', 'Admin', 'admin', '$2b$10$BgNp.YVVVC9DO1nfSmgEDO0zUTCIcZHzHfqzru.wKJ6itQ9iIAQz6');

UPDATE participants
SET participant_email = 'user', password = '$2b$10$b/OvhPGbB9.IUYbV3YxSNuhLS3X9gYLzHoJHHTP9Z2HFW1dIj05I6'
WHERE participant_id = 173;
