const accountModel = require("../models/account.model")


async function createAccount(req,res) {
    const user = req.user;

    const account = await accountModel.create({
        user: user._id 
    })

    res.status(200).json({
        account
    })
    
}

async function getAccountBalanceController(req,res) {
    const{accountID} = req.params

    const account = await accountModel.findOne({
        _id :accountID,
        user :req.user._id
    })
    if(!account){
        return res.status(400).json({
            message:"Account not found"
        })
    }
    const balance = await account.getBalance()
    
    res.status(200).json({
        accountID : account._id,
        balance:balance
    })

    
}


module.exports= {createAccount,getAccountBalanceController}