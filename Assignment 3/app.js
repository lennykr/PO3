const http = require('http');

const express = require('express');

const app = express();

const homeRoutes = require('./routes/home');
const userRoutes = require('./routes/users');

app.use(homeRoutes);
app.use(userRoutes);

app.use(express.static('./public'));

const server = http.createServer(app);

server.listen(3000);