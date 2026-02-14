const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

const userSchema = mongoose.Schema({
    email: {
        type : String,
        required: [true, "Email is required for creating a user"],
        trim: true,
        lowercase:true,
        match:[/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
        unique: [true,'Email already exist']
    },

    name: {
        type : String,
        required: [true, "Name is required for creating a user"],
       
    },
    password: {
        type : String,
        required: [true, "Paaword is required for creating a user"],
        minlength: [6,"password should contain more than6 character "],
        selection: false
       
    },
},{
    timestamps:true
})




userSchema.pre("save",async function(next) {
    if(!this.isModified("password")){
        return
    }

    const hash = await bcrypt.hash(this.password,10)
    this.password = hash
    
})

userSchema.methods.comparePassword = async function (password) {
    return await   
    bcrypt.compare(password,this.password)
    
    
}

const userModel = mongoose.model("user",userSchema)

module.exports= userModel