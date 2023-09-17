CREATE TABLE IF NOT EXISTS location_data (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL,
  location GEOGRAPHY(Point, 4326) NOT NULL,
  timestamp TIMESTAMP NOT NULL
);