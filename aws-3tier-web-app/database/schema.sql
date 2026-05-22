-- Create and select the database
CREATE DATABASE mydb;
USE mydb;

-- Create messages table
CREATE TABLE messages (
    id INT PRIMARY KEY AUTO_INCREMENT,
    message VARCHAR(255)
);

-- Insert sample data
INSERT INTO messages (message)
VALUES
    ('Hello from Message 1'),
    ('Hello from Message 2');

-- Verify data
SELECT * FROM messages;
