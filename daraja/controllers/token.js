const axios = require("axios");

const client_id = "BkoPvdZkGsedoAiUWKAUJKGGBGKWLrpmVcDUWO6NIA2YnMB8";
const client_secret =
  "ORWQpZ3S57Z9bASbpvzymGk886g6dflKYZ200IpZ8ejSH3zIWY1AFqsxeWk5r2vC";
const auth = Buffer.from(`${client_id}:${client_secret}`).toString("base64");

let token;

const createToken = async (req, res) => {
  try {
    const response = await axios.get(
      "https://sandbox.safaricom.co.ke/oauth/v1/generate",
      {
        params: {
          grant_type: "client_credentials",
        },
        headers: {
          Authorization: `Basic ${auth}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    // console.log(response.data);
    token = response.data.access_token;
    // res.json(response.data.access_token);
  } catch (error) {
    console.error(
      "Error creating token:",
      error.response ? error.response.data : error.message
    );
  }
};

const stkPush = async (req, res) => {
  //stk push code to customer phone.
  const shortCode = 174379;
  const phone = req.body.phone.substring(1);
  const amount = req.body.amount;
  const passkey =
    "bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919";
  const url = "https://sandbox.safaricom.co.ke/mpesa/c2b/v1/registerurl";

  const date = new Date();

  const timestamp =
    date.getFullYear() +
    ("0" + (date.getMonth() + 1)).slice(-2) +
    ("0" + date.getDate()).slice(-2) +
    ("0" + date.getHours()).slice(-2) +
    ("0" + date.getMinutes()).slice(-2) +
    ("0" + date.getSeconds()).slice(-2);

  const password = new Buffer.from(shortCode + passkey + timestamp).toString(
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

  await axios
    .post(url, data, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
    .then((data) => {
      console.log(data);
      res.status(200).json(data.data);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err.message);
    });
};

module.exports = { createToken, stkPush };
