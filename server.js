require("dotenv").config()

const app = require("./src/app.js")
const connectToDB = require("./src/config/db.js")

connectToDB()


app.listen(3000,()=>{
    console.log("Server is running on 3000 port")

})
