const express = require('express')
const cookieparser = require("cookie-parser")
const app = express()



app.use(express.json())
app.use(cookieparser())


//--Routes required---
const authRouter = require("./routes/auth.route.js")
const accountRouter = require("./routes/account.routes.js")

//---Routes use---
app.use("/api/auth",authRouter)
app.use("/api/account",accountRouter)


module.exports = app