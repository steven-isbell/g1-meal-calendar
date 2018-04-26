CREATE TABLE events (
    id SERIAL PRIMARY KEY,
    start_time TIMESTAMP NOT NULL,
    end_time VARCHAR(55) NOT NULL,
    title VARCHAR(100) NOT NULL,
    meal_desc TEXT,
    allday BOOLEAN,
    FOREIGN KEY (aux_id) REFERENCES aux (id)
)

CREATE TABLE aux (
    id SERIAL PRIMARY KEY,
    type varchar(55)
);
