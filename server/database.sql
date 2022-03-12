CREATE DATABASE todoapp;

CREATE TABLE todo(
    id serial PRIMARY KEY,
    name VARCHAR ( 50 ),
    created_at TIMESTAMP,
    completed_at TIMESTAMP,
    status BOOLEAN
);