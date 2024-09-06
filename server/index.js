const express = require("express");

const app = express();
const cors = require("cors");

const TokenRoute = require("./routes/token");

app.listen(8000, () => {
  console.log("server run nicely");
});

app.use(express.json());
app.use(cors());
app.get("/", (req, res) => {
  res.send("Mpesa programming in progress,Time to get paid");
});

app.use("/token", TokenRoute);
