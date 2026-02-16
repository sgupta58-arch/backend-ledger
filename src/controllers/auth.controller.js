const { compare } = require("bcrypt")
const userModel = require("../models/user.models.js")
const jwt = require("jsonwebtoken")
const emailService = require("../services/email.service.js")

 
// user register controller
// / POST/api/auth/register

async function userRegisterController(req,res){

    const{email,password,name} = req.body

    const isExists = await userModel.findOne({
        email:email
    })

    if(isExists){
        return res.status(422).json({
            message: "User already exists with email",
            status : "failed"
        })
    }
    const user = await userModel.create({
        email,password,name
    })

    const token = jwt.sign({user:user._id},process.env.JWT_SECRET
        
        ,{expiresIn: "3d"})

    res.cookie("token",token)

    res.status(201).json({
        user :{
            _id:user._id,
        email:user.email,
        name:user.name
        },
    token
})


}

// user Login controller
// / POST/api/auth/ogin
async function userLoginController(req,res) {

    const{email,password} = req.body

    const user = await userModel.findOne({email})

    if(!user){
        return res.status(400).json({
            message:"Email or password is Invalid"
        
        })
    }

    const isValidPassword = await user.comparePassword(password)

    if(!isValidPassword){
        return res.status(400).json({
            message:"Email or password is Invalid"

        })
    }

        const token = jwt.sign({user:user._id},process.env.JWT_SECRET
        
        ,{expiresIn: "3d"})

    res.cookie("token",token)

    res.status(201).json({
        user :{
            _id:user._id,
        email:user.email,
        name:user.name
        },
    token
})
    await emailService.sendRegisterationEmail(user.email,user.name)

}

module.exports = {
    userRegisterController,userLoginController
}

