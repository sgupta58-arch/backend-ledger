const express = require("express")
const authMiddleware = require("../middlewares/auth.middleware.js")
const transactionController = require("../controllers/transaction.controller.js")

const transactionRoutes = express.Router()

transactionRoutes.post("/",authMiddleware.authMiddleware,transactionController.createTransaction)


module.exports = transactionRoutes


///------post/api/transactions/system/initial-funds
///----create initial funds transaction from system user--

transactionRoutes.post("/system/initial-funds",authMiddleware.authSystemUserMiddleware,transactionController.createInitialFundsTransaction)
