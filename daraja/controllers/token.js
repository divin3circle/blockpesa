const axios = require("axios");

const client_id = "BkoPvdZkGsedoAiUWKAUJKGGBGKWLrpmVcDUWO6NIA2YnMB8";
const client_secret =
  "ORWQpZ3S57Z9bASbpvzymGk886g6dflKYZ200IpZ8ejSH3zIWY1AFqsxeWk5r2vC";
const auth = Buffer.from(`${client_id}:${client_secret}`).toString("base64");

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
    console.log(response.data);
    // res.json(response.data);
  } catch (error) {
    console.error(
      "Error creating token:",
      error.response ? error.response.data : error.message
    );
  }
};

const stkPush = async (req, res) => {
  //stk push code to customer phone.
};

module.exports = { createToken };
