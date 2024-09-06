// /routes/token.js
const express = require("express");
const router = express.Router();
const { createToken } = require("../controllers/token");

router.post("/", createToken, (req, res) => {
  res.send("Token created and STK push initiated");
});

module.exports = router;
