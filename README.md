# WhaleWatch
<p align='center'>
<img src='https://live.staticflickr.com/65535/51440879168_1b0caa26ed_o.png' />
</p>

<h1> Table of Contents </h1>
<ul>
  <li><a href='#what'>What is WhaleWatch?</a></li>
  <li><a href='#features'>WhaleWatch Features</a></li>
  <li><a href='#install'>Installation and Setup</a></li>
  <li><a href='#how'>Navigating and Using WhaleWatch</a></li>
  <li><a href='#team'>Meet the Team</a></li>
</ul>

<h2 id='what'>What is WhaleWatch?</h2>
<p> WhaleWatch is a lightweight, open-source monitoring tool for Docker. WhaleWatch enables developers to monitor Docker containers through a dashboard that delivers real-time metrics backed by intuitive data visualizations. Developers will be able to keep an eye on the containers that are critical for smooth technical and business operations and also proactively take action before troubles arise. </p>

<h2 id='features'>WhaleWatch Features</h2>

<ul>
  <li>The ability to collect and display Docker metrics</li>
  <li>Monitor containers and identify trends through data visualizations</li>
  <li>Connect to Docker Daemon</li>
  <li>Drag and drop functionality to stop, start, and restart containers</li>
</ul>

<h2 id='install'>Installation and Setup</h2>
<p> WhaleWatch can be installed and set up with the following steps: </p>

1. Fork and clone the repo
2. Run `npm install`
3. Create a `.env` file in your top level folder and add a Postgres URI as a variable labeled `DB_URI`
4. Run the following command in your Postgres instance:
```
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username varchar(50) UNIQUE NOT NULL,
  email varchar(100) UNIQUE NOT NULL,
  password varchar(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS containers (
  id SERIAL PRIMARY KEY,
  dockerId varchar(100) NOT NULL,
  name varchar(100) NOT NULL,
  size varchar(50),
  status varchar(50),
  state varchar(50),
  owner integer REFERENCES users(id) NOT NULL
);

CREATE TABLE IF NOT EXISTS stats (
  id SERIAL PRIMARY KEY,
  container integer REFERENCES containers(id) NOT NULL,
  timestamp date NOT NULL,
  cpuUsage decimal NOT NULL,
  memUsage decimal NOT NULL,
  netIo varchar(50) NOT NULL,
  blockIo varchar(50) NOT NULL,
  pids integer NOT NULL,
  reqPerMin integer
)
```
5. Ensure Docker Daemon is running on your computer.
6. Run `npm run dev`

<h2 id='how'>Navigating and Using WhaleWatch</h2>
<p>WhaleWatch is a tool that developers will be able to utilize through their browsers as a web application.</p>

![Dashboard](https://media.giphy.com/media/wXFxM1EuviUlgpLQYU/giphy.gif?cid=790b76113869a667a527e5322a3e9cfd16baedc2adfa9ea4&rid=giphy.gif&ct=g)

<p> Upon launching the application, the user will be asked to sign up or provide login credentials. Once the sign-up or login step has been completed, the user will be redirected to the main WhaleWatch dashboard. This dashboard will contain key data and metrics such as: </p>

<ul>
  <li>Average CPU Usage</li>
  <li>Average Memory Usage</li>
  <li>Average Net I/O</li>
  <li>Average Block I/O</li>
  <li>Average PIDs</li>
</ul>

![Container](https://media.giphy.com/media/5RBS7GS7ypfntnucA6/giphy.gif?cid=790b761108fc27662df547e807a3cefa0135155d883b1058&rid=giphy.gif&ct=g)

<p> Furthermore, in the Container Health Overview section, developers will be able to quickly glean insights into which containers are healthy (blue whales) and which containers require attention (red whales).</p>

<p> Within the Containers component, developers have the ability to easily start, stop and restart containers with ease through intuitive drag and drop functionality.  The containers are displayed and organized categorically by “Active” and “Inactive” containers. </p>

<h2 id='team'> Meet the Team </h2>
<ul>
  <li><a href='https://www.linkedin.com/in/annie-pan825/'>Annie Pan - LinkedIn</a> | <a href='https://github.com/anniee825'>Github</a></li>
  <li><a href='https://www.linkedin.com/in/matilda-wang-1438191b1/'>Matilda Wang - LinkedIn</a> | <a href='https://www.linkedin.com/in/matilda-wang-1438191b1/'>Github</a></li>
  <li><a href='https://www.linkedin.com/in/pkmi/'>Phil Kang - LinkedIn</a> | <a href='https://github.com/philky-m'>Github</a></li>
  <li><a href='https://www.linkedin.com/in/racheljpatterson/'>Rachel Patterson - LinkedIn</a> | <a href='https://github.com/rjpatt'>Github</a></li>
</ul>
