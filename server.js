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

var whitelist = ["http://localhost:3000", "https://localhost:3000"];
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

app.use(express.json());
app.use(passport.initialize());

app.use(cors(corsOptions));

app.use("/users", userRouter);

app.get("/", (req, res) => res.send("Hello World!"));

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
