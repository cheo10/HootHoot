USE hoot;

CREATE TABLE message (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    body VARCHAR(500),
    sender_id INT,
    parent_message_id INT,
    origin_channel_id INT,
    message_created timestamp DEFAULT NOW()
);

CREATE TABLE User (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(15),
    last_name VARCHAR(15),
    username VARCHAR(20),
    password VARCHAR(20),
    email VARCHAR(30),
    default_channel VARCHAR(20),
    is_active VARCHAR(20),
    users_created timestamp DEFAULT NOW()
);

CREATE TABLE channel (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30)
);

CREATE TABLE groupRoom (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30),
    is_active VARCHAR(20),
    group_created timestamp DEFAULT NOW()
);
