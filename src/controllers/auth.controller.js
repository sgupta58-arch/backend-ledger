const userModel = require("../models/user.models.js")
const jwt = require("jsonwebtoken")


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

    const token = jwt.sign({user:user._id},process.env.JWT_SECRET_KEY,{expieresIn: "3d"})

    res.cookies("token",token)

    res.status(201).json({
        _id:user._id,
        email:user.email,
        name:user.name
    },token)


}

module.exports = {
    userRegisterController
}