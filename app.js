require("dotenv").config();
require("./config/database").connect();
const express = require("express");
const cors = require("cors");
const app = express();
const router = require("./routes/index");

app.use(
  cors({
    credentials: true,
    origin: "*",
  })
);
app.use(express.json());

//routes  here
app.use("/api/v1/", router);

module.exports = app;
