CREATE DATABASE chat;

USE hoot;

CREATE TABLE 'chats' (
    `message_id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    'message' VARCHAR(500),
);

CREATE TABLE 'users' (
    `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    'username' VARCHAR(30),
    'email' VARCHAR(50),
    'password' VARCHAR(20),
);

CREATE TABLE 'channels' (
    `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    'originChannel' VARCHAR(30),
    'channels' VARCHAR(160),
);
