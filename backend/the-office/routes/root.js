// THIS IS A TEST ROUTE

const express = require('express');
const router = express.Router();

router.get("/", (req, res, next) => {
  return res.status(200).json({
    message: "Hello from root!",
  });
});

module.exports = router;