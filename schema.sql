CREATE TABLE events (
    id SERIAL PRIMARY KEY,
    date TIMESTAMP NOT NULL,
    host VARCHAR(55) NOT NULL,
    meal_desc text
)
