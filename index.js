const express = require('express');
const helmet = require('helmet');
const zoosRouter = require('./zoosRouter.js');
const bearsRouter = require('./bearsRouter.js')

const server = express();

server.use(express.json());
server.use(helmet());

server.use('/api/zoos', zoosRouter);
server.use('/api/bears', bearsRouter);

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
