
// THIS IS WHERE ALL THE ROUTES ARE COMBINED
// it makes everything look nice

const express = require('express');

const helloRouter = require('./hello');
const rootRouter = require('./root');
const usersRouter = require('./users');
const votesRouter = require('./vote');

module.exports = function(app) {
  app.use(express.json());

  app.use("/hello", helloRouter);
  app.use("/", rootRouter);
  app.use("/users", usersRouter);
  app.use("/votes", votesRouter);

};