-- -----------------------------------------------------------------------------------------------------------------------------------------
-- Insert a set of records into the surveys table.
-- -----------------------------------------------------------------------------------------------------------------------------------------

-- Create future surveys.
INSERT INTO surveys (surveyTitle, startTime, stopTime, createdAt, updatedAt, UserId) VALUES
('Where do you want to eat?', NOW() + INTERVAL 1 HOUR, NOW() + INTERVAL 2 HOUR, NOW(), NOW(), 1),
('Another survey!', NOW() + INTERVAL 1 HOUR, NOW() + INTERVAL 2 HOUR, NOW(), NOW(), 2),
('Where to shop?', NOW() + INTERVAL 1 HOUR, NOW() + INTERVAL 2 HOUR, NOW(), NOW(), 5),
('Where to stay?', NOW() + INTERVAL 1 HOUR, NOW() + INTERVAL 2 HOUR, NOW(), NOW(), 1);

-- Create active surveys.
INSERT INTO surveys (surveyTitle, startTime, stopTime, createdAt, updatedAt, UserId) VALUES
('Events for the night...', NOW() - INTERVAL 1 HOUR, NOW() + INTERVAL 30 MINUTE, NOW(), NOW(), 3),
('What else should we do?', NOW() - INTERVAL 1 HOUR, NOW() + INTERVAL 45 SECOND, NOW(), NOW(), 3),
('Yet another survey', NOW() - INTERVAL 1 HOUR, NOW() + INTERVAL 90 SECOND, NOW(), NOW(), 1),
('I love lamp', NOW() - INTERVAL 1 HOUR, NOW() + INTERVAL 60 SECOND, NOW(), NOW(), 4);

-- Create expired surveys.
INSERT INTO surveys (surveyTitle, startTime, stopTime, createdAt, updatedAt, UserId) VALUES
('Where should we go hiking?', NOW() - INTERVAL 2 HOUR, NOW() - INTERVAL 1 HOUR, NOW(), NOW(), 1),
('What gym should we go to?', NOW() - INTERVAL 2 HOUR, NOW() - INTERVAL 1 HOUR, NOW(), NOW(), 7),
('Running out of survey topics...', NOW() - INTERVAL 2 HOUR, NOW() - INTERVAL 1 HOUR, NOW(), NOW(), 8),
('What movie should we see?', NOW() - INTERVAL 2 HOUR, NOW() - INTERVAL 1 HOUR, NOW(), NOW(), 9);

-- -----------------------------------------------------------------------------------------------------------------------------------------
-- Insert a set of records into the surveytakers table.
-- -----------------------------------------------------------------------------------------------------------------------------------------

-- Note that you should create and login with an account called "test" for testing purposes.
INSERT INTO surveytakers (username, isRead, isStarred, createdAt, updatedAt, SurveyId) VALUES
('test', false, false, NOW(), NOW(), 1),
('test', false, false, NOW(), NOW(), 2),
('test', false, false, NOW(), NOW(), 3),
('test', false, false, NOW(), NOW(), 4),
('test', false, false, NOW(), NOW(), 5),
('test', true, false, NOW(), NOW(), 6),
('test', false, false, NOW(), NOW(), 7),
('test', false, false, NOW(), NOW(), 8),
('test', false, false, NOW(), NOW(), 9),
('test', false, false, NOW(), NOW(), 10),
('test', false, true, NOW(), NOW(), 11),
('test', false, true, NOW(), NOW(), 12);

INSERT INTO surveytakers (username, isRead, isStarred, createdAt, updatedAt, SurveyId) VALUES
('Greg', false, false, NOW(), NOW(), 1),
('Greg', false, false, NOW(), NOW(), 2),
('Greg', false, false, NOW(), NOW(), 5),
('Greg', false, false, NOW(), NOW(), 6),
('Greg', false, false, NOW(), NOW(), 10);

INSERT INTO surveytakers (username, isRead, isStarred, createdAt, updatedAt, SurveyId) VALUES
('Hank', false, false, NOW(), NOW(), 5),
('Hank', false, false, NOW(), NOW(), 6),
('Hank', false, false, NOW(), NOW(), 7),
('Hank', false, false, NOW(), NOW(), 8);

INSERT INTO surveytakers (username, isRead, isStarred, createdAt, updatedAt, SurveyId) VALUES
('Hannah', false, false, NOW(), NOW(), 3),
('Hannah', false, false, NOW(), NOW(), 4),
('Hannah', false, false, NOW(), NOW(), 9),
('Hannah', false, false, NOW(), NOW(), 10),
('Hannah', false, false, NOW(), NOW(), 11),
('Hannah', false, false, NOW(), NOW(), 12);

INSERT INTO surveytakers (username, isRead, isStarred, createdAt, updatedAt, SurveyId) VALUES
('Jennifer', false, false, NOW(), NOW(), 1),
('Jennifer', false, false, NOW(), NOW(), 5),
('Jennifer', false, false, NOW(), NOW(), 9);







