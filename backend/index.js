const express = require("express");
const authRoutes = require("./routes/auth");

const app = express();
const port = 8080;

app.use(express.static("static"));
app.use("/api/auth", authRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});