const express = require("express")
const {authMiddleware} = require("../middlewares/auth.middleware.js")
const accountController = require("../controllers/account.controller.js")

const accountRouter = express.Router()






///---api/aacounts
//create new account
//protected route
accountRouter.post("/",authMiddleware,accountController.createAccount)

//---get api/auth/account/balance/:accountID
accountRouter.get("/:accountID",authMiddleware, accountController.getAccountBalanceController)

module.exports = accountRouter

