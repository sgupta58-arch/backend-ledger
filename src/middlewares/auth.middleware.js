const userModel = require("../models/user.models")
const jwt = require("jsonwebtoken")




async function authMiddleware(req,res,next) {

    console.log("Middleware triggered")

    const token = req.cookies.token || req.headers.authorization?.split(" ")[1]
    console.log("Token received:", token)

    if(!token){
        return res.status(400).json({
            message:"Unauthorized acess ,token is missing"
        })
    }
    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET)

        const user = await userModel.findById(decoded.user)
        if (!user) {
        return res.status(404).json({
        message: "User not found"
    })
}

        req.user= user

        
        return next()
        
    } catch (error) {
        return res.status(400).json({
            message:"Unauthorized ascess,token is invalid"
        })
        
    }
    console.log("Decoded:", decoded)
}

async function authSystemUserMiddleware(req,res,next){

    const token = req.cookies.token || req.headers.authorization?.split(" ")[1]

    console.log(token)
    
    if(!token){
        return res.status(400).json({
            message:"forbidden token not a system user"
            })
    }

    console.log(token)

    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET)

        

        const user = await userModel
        .findById(decoded.user)
        .select("+systemUser")

        // console.log(user)

        if(!user.systemUser){
            return res.status(400).json({
                message:"forbidden axess invalid token"
            })
        }

        req.user = user

        return next()
        

    } catch (error) {
        return res.status(400).json({
            message: " 401 Unauthorized acess not a syste user"
        })

        
    }
}


module.exports={
    authMiddleware,authSystemUserMiddleware
}