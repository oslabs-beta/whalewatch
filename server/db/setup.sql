CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username varchar(50) UNIQUE NOT NULL,
  email varchar(100) UNIQUE NOT NULL,
  password varchar(100) NOT NULL
)

CREATE TABLE IF NOT EXISTS containers (
  id SERIAL PRIMARY KEY,
  dockerId varchar(100) NOT NULL,
  name varchar(100) NOT NULL,
  size integer,
  status varchar(50),
  state varchar(50),
  owner integer REFERENCES users(id) NOT NULL
)

CREATE TABLE IF NOT EXISTS stats (
  id SERIAL PRIMARY KEY,
  container integer REFERENCES containers(id) NOT NULL,
  timestamp date NOT NULL,
  cpuUsage integer NOT NULL,
  memUsage integer NOT NULL,
  netIo varchar(50) NOT NULL,
  blockIo varchar(50) NOT NULL,
  pids integer NOT NULL,
  reqPerMin integer
)
 
module.exports = tables;