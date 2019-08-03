const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const actionsRouter = require('./actionsRouter.js');
const projectsRouter = require('./projectsRouter.js');

const server = express();

server.use(express.json());
server.use(cors());
server.use(helmet());
server.use(logger);
server.use('/api/actions/', actionsRouter);
server.use('/api/projects/', projectsRouter);

// CUSTOM MIDDLEWARE
function logger(req, res, next) {
  console.log(`${req.method} from ${req.url}`);
  next();
}

server.get('/', (req, res) => {
  res.send('<h2>Your data source for Actions and Projects.</h2>');
});

module.exports = server;