const express = require('express')
const authRouter = require("./routes/auth.route.js")
const cookieparser = require('cookieparser')

const app = express()

app.use(express.json())
app.use(cookieparser())

app.use("/api/auth",authRouter)


module.exports = app