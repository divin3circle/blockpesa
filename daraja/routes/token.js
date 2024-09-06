const express = require("express");

const router = express.Router();

const { createToken } = require("../controllers/token");

router.get("/", createToken);

module.exports = router;
