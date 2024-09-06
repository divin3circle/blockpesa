const axios = require("axios");

const createToken = async (res, req, next) => {
  const secret =
    process.env.SECRET_KEY |
    "ORWQpZ3S57Z9bASbpvzymGk886g6dflKYZ200IpZ8ejSH3zIWY1AFqsxeWk5r2vC";
  const consumer =
    process.env.CONSUMER_KEY |
    "BkoPvdZkGsedoAiUWKAUJKGGBGKWLrpmVcDUWO6NIA2YnMB8";
  const auth = new Buffer.from(`${consumer}:${secret}`).toString("base64");

  await axios
    .get(
      "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
      {
        headers: {
          authorization: `Basic ${auth}`,
        },
      }
    )
    .then((data) => {
      console.log(data.data);
      next();
    })
    .catch((error) => {
      console.log(error);
    });
};

module.exports = {
  createToken,
};
