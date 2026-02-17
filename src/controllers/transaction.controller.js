const transactionModel = require("../models/transaction.model.js")
const ledgerModel = require("../models/ledger.model.js")
const accountModel = require("../models/account.model.js")
const emailService = require("../services/email.service.js")
const mongoose = require("mongoose")


////--validate request------///
async function createTransaction(req,res) {
    

    const {fromAccount, toAccount,idempotencyKey,amount} = req.body

    if(!fromAccount || !toAccount || !amount || !idempotencyKey){
        return res.status(400).json({
            message:"fromAccount, toAccount,idempotencyKey,amount"
        })
    }
    const fromUserAccount = await accountModel.findOne({
        _id: fromAccount
    })
    const toUserAccount = await accountModel.findOne({
        _id: toAccount
    })

    if(!fromUserAccount ||!toUserAccount){
        return res.status(400).json({
            messgae:"Invalid fromAccount or toAccount"
        })
    }

////--validate idempotencykey------///

    const isTransactionAlreadyexists = await transactionModel.findOne({
        idempotencyKey:idempotencyKey
    })

    if(isTransactionAlreadyexists){
        if(isTransactionAlreadyexists.status==="COMPLETED"){
            return res.status(200).json({
                message:"Transaction done succesfully"
            })
        }
        if(isTransactionAlreadyexists.status==="PENDING"){
           return res.status(200).json({
                message:"Transaction is still processing"
            })
        }
        if(isTransactionAlreadyexists.status==="FAILED"){
            return res.status(400).json({
                message:"Transaction processing failed previously please retry"
            })
        }
        if(isTransactionAlreadyexists.status==="RESERVED"){
            return res.status(500).json({
                message:"Transsactio is reveresed please  retry"
            })

        }
            
        
    }

///------check account status---///
    
    if(fromUserAccount.status!=="Active"|| toUserAccount!=="Active"){
        return res.status(400).json({
            message:"Both fromaccount and toaccount must be active to process transaction "
        })
    }


    
/////--derive sender balance from ledger 
    const balance = await fromUserAccount.getBalance()

    if(balance<amount){
        return res.status(400).json({
            message:`Insufficient balance . Current balance is ${balance}.requested amount${amount}`
        })
    }

/////-5 Create transaction

    const session = await mongoose.startSession()
    session.startTransaction()

    const transaciton = await transactionModel.create({
        fromAccount,
        toAccount,
        idempotencyKey,
        amount,
        status:"PENDING"
    },(session))

    const creditLedgerEntry = await transactionModel.create({
        account:toAccount,
        type:"CREDIT",
        transaction: transaction._id,
        amount:amount,

    })

    const debitLedgerEntry = await transactionModel.create({
        account:toAccount,
        type:"Debit",
        transaction: transaction._id,
        amount:amount,

    })

    transaction.status="COMPLETED"
    await transaction.save({session})

    await session.commitTransaction()
    session.endSession()

    return res.status(200).json({
        message:"Transaction completed sucessfully",
        transaction: transaction
    })

}

module.exports={
    createTransaction
}
