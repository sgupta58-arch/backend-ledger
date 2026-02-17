const express = require("express")
const authMiddleware = require("../middlewares/auth.middleware.js")
const transactionController = require("../controllers/transaction.controller.js")

const transactionRoutes = express.Router()

transactionRoutes.post("/",authMiddleware.authMiddleware,transactionController.createTransaction)

module.exports = transactionRoutes