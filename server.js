const express = require('express')
const app = express()
const passport = require("passport")
const mongoose = require("mongoose")

const userRouter = require("./src/routes/users")


const mongooseConnection = require("./src/db/mongoose");
require("dotenv").config();
const port = process.env.PORT || 3300;
mongooseConnection();



app.use(express.json());
app.use(passport.initialize())



app.use("/users", userRouter)


app.get('/', (req, res) => res.send('Hello World!'))



app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))