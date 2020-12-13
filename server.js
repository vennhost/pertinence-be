const express = require("express");
const app = express();
const cors = require("cors");
const passport = require("passport");
const mongoose = require("mongoose");

const userRouter = require("./src/routes/users");

const mongooseConnection = require("./src/db/mongoose");
require("dotenv").config();
const port = process.env.PORT || 3300;
mongooseConnection();

app.use(express.json());
app.use(passport.initialize());

app.use(cors());

app.use("/users", userRouter);

app.get("/", (req, res) => res.send("Connect World!"));

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
