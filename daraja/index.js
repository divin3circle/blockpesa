const express = require("express");
const app = express();
const tokenRoutes = require("./routes/token");

app.use(express.json());
app.use("/token", tokenRoutes);

app.use(cors());

app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
