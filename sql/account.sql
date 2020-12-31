CREATE TABLE account(
    id SERIAL,
    username VARCHAR ( 20 ) UNIQUE NOT NULL PRIMARY KEY,
    password VARCHAR ( 20 ) NOT NULL
);




INSERT INTO account ( username, password)
    VALUES ('duong', 'duong');

/*
CREATE TABLE words(
	word VARCHAR ( 50 ) UNIQUE NOT NULL PRIMARY KEY,
	word_id serial UNIQUE,
	user_id serial,
	synonym VARCHAR ( 50 ) NOT NULL,
	difficulty serial,
	definition VARCHAR (500) NOT NULL
);

ALTER TABLE words ADD CONSTRAINT difficulty CHECK (difficulty<5 and difficulty>=0);

INSERT INTO words (word, word_id, user_id, synonym, difficulty, definition)
    VALUES ('hello', 1, 1, 'greeting', 0, 'used as a greeting or to begin a phone conversation');

CREATE TABLE users(
	user_id serial UNIQUE PRIMARY KEY,
	name VARCHAR (50),
	difficulty serial,
	score serial
);

ALTER TABLE users ALTER COLUMN name SET DEFAULT 'Anonymous';
ALTER TABLE users ALTER COLUMN score SET DEFAULT 0;
ALTER TABLE users ALTER COLUMN difficulty SET DEFAULT 0;

INSERT INTO users (user_id, name, difficulty, score)
    VALUES (1, 'Team_NMCNPM', 0, 0);
    */