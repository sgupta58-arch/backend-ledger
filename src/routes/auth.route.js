const express = require("express")
const authController = require("../controllers/auth.controller.js")

const authrouter = express.Router()

authrouter.post("/register",authController.userRegisterController)

authrouter.post("/login",authController.userLoginController)


module.exports = authrouter