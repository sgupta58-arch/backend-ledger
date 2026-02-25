const express = require('express')
const cookieparser = require("cookie-parser")
const app = express()



app.use(express.json())
app.use(cookieparser())


//--Routes required---
const authRouter = require("./routes/auth.route.js")
const accountRouter = require("./routes/account.routes.js")
const transactionRoutes = require("./routes/transaciton.routes.js")
const transactionModel = require('./models/transaction.model.js')

////---dummmy api--//
app.get("/",(req,res)=>{
    res.send("Ledger service is up and running!!!!!")
})


//---Routes use---
app.use("/api/auth",authRouter)
app.use("/api/account",accountRouter)
app.use("/api/transaction",transactionRoutes)
app.use("/api/transaction",transactionRoutes)
app.use("/api/account/balance",accountRouter)


module.exports = app