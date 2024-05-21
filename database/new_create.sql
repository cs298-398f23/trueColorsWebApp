-- Create database
DROP DATABASE IF EXISTS TrueColors;
CREATE DATABASE IF NOT EXISTS TrueColors;
USE TrueColors;

-- Create tables
CREATE TABLE IF NOT EXISTS questions (
    question_num INT(5),
    group_num INT(5),
    word_num INT(5),
    word VARCHAR(255),
    PRIMARY KEY (word)
);

CREATE TABLE IF NOT EXISTS session ( 
    user_id VARCHAR(50),
    name VARCHAR(50),
    email VARCHAR(50),
    PRIMARY KEY (email)
);

CREATE TABLE IF NOT EXISTS responses (
    user_id VARCHAR(255),
    test_id INT(5),
    question_num INT(5),
    group_num INT(5),
    score INT(1),
    PRIMARY KEY (user_id)
);

CREATE TABLE IF NOT EXISTS quiz (
    user_id VARCHAR(255),
    test_id INT(5),
    description VARCHAR(255),
    PRIMARY KEY (user_id)
);

-- Create command "SELECT * FROM ordered_questions;" to view each question in order of appearance
CREATE VIEW ordered_questions AS
SELECT *
FROM questions
ORDER BY question_num, group_num, word_num;