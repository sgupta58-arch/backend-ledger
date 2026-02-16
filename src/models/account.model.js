const mongoose= require("mongoose")
const accountSchema = new  mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        require:[true, "Account must be associated wuth the user "],
        index:true
    },
    status:{
        type: String,
        enum:{
        values: ["Active","Frozen","Inactive"],
        message:"Status can be either Active,frozen,inactive",
        },
        default:"Active"
    },
    currency:{
        type: String,
        required: [true,"Currency is required for creating an account"],
        default: "INR"
    }
},
{
    timestamps:true
})

accountSchema.index({user:1, status:1})

const accountModel = mongoose.model("account",accountSchema)

module.exports = accountModel