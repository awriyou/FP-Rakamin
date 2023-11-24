/* Replace with your SQL commands */
CREATE TABLE feedback (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    subject VARCHAR(255),
    message TEXT NOT NULL
);