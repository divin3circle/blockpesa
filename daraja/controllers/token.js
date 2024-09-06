const express = require("express");
const axios = require("axios");
const router = express.Router();

const shortCode = "your_short_code";
const passkey = "your_passkey";
const amount = 100; // Example amount
const phone = "your_phone_number";
const token = "your_access_token";

const createToken = async (req, res, next) => {
  try {
    const url = "https://sandbox.safaricom.co.ke/mpesa/c2b/v1/registerurl";

    const date = new Date();
    const timestamp =
      date.getFullYear() +
      ("0" + (date.getMonth() + 1)).slice(-2) +
      ("0" + date.getDate()).slice(-2) +
      ("0" + date.getHours()).slice(-2) +
      ("0" + date.getMinutes()).slice(-2) +
      ("0" + date.getSeconds()).slice(-2);
    const password = Buffer.from(shortCode + passkey + timestamp).toString(
      "base64"
    );

    const data = {
      BusinessShortCode: shortCode,
      Password: password,
      Timestamp: timestamp,
      TransactionType: "CustomerPayBillOnline",
      Amount: amount,
      PartyA: `254${phone}`,
      PartyB: 174379,
      PhoneNumber: `254${phone}`,
      CallBackURL: "https://mydomain.com/path",
      AccountReference: "Mpesa Test",
      TransactionDesc: "Testing stk push",
    };

    const response = await axios.post(url, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    console.log(response.data);
    next();
  } catch (error) {
    console.error(
      "Error:",
      error.response ? error.response.data : error.message
    );
    res.status(500).send("Error creating token");
  }
};

router.get("/", createToken, (req, res) => {
  res.send("STK push initiated");
});

module.exports = router;
