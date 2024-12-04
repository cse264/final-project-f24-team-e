const serverless = require("serverless-http");
const express = require("express");
const app = express();

const setupRoutes = require('./routes/routes');


/*
to deploy it mades us use cors,

its added to the serverless.yml file but its not set to true, but it could be that it is set to true by default
*/
app.use((req, res, next) => {

  //https://serverless.com/blog/cors-api-gateway-survival-guide
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  next();
});

app.use(express.json());

// when deploying some routes would deploy and some would not, so i made this test route so that
// i can see if the routes in handler.js are working or if the problems is in the routes folder
// but now it works so i can comment it out
// app.get('test', (req, res) => {
//   res.json({ message: 'Test endpoint working' });
// });

setupRoutes(app);

// 4 0 4 error
app.use((req, res) => {
  // console.log('ERORR 404, route not found:', req.path);
  res.status(404).json({
    error: "Not Found",
    path: req.path
  });
});

// all other errors
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    error: "Internal Server Error",
    message: err.message
  });
});

module.exports.handler = serverless(app);
