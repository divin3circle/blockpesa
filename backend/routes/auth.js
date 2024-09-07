const express = require("express");
const { getAuthRequest, handleCallback } = require("../controller/authController");

const router = express.Router();

router.get("/sign-in", getAuthRequest);
router.post("/callback", handleCallback);

module.exports = router;