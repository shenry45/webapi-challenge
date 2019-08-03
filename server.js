const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const actionsRouter = require('./actionsRouter.js');
const projectsRouter = require('./projectsRouter.js');

const server = express();

server.use(express.json());
server.use(cors());
server.use(helmet());
server.use('/api/actions/', actionsRouter);
server.use('/api/projects/', projectsRouter);

server.get('/', (req, res) => {
  res.send('<h2>Your data source for Actions and Projects.</h2>');
});

module.exports = server;