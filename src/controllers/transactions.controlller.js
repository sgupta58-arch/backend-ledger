// const transactionModel = require("../models/transaction.model")
// const ledgerModel  = require("../models/ledger.model")
// const accountModel = require("../models/account.model")
// const mongoose = require("mongoose")


// async function createTransaction(req,res) {

//     const {fromAccount,toAccount,amount,idempotencyKey}= req.body

//     if(!fromAccount|| !toAccount || !amount || !idempotencyKey){
//         return res.status(400).json({
//             message:"fromAccount,toAccount,amount,idempotencyKey are required"
//         })

//         const fromUserAccount = await accountModel.findOne({
//             _id: fromAccount
//         })

//         const toUserAccount = await accountModel.findOne({
//             _id:toAccount
//         })
        
//         if(!fromUserAccount || !toUserAccount){
//             return res.status(400).json({
//                 message:"invlaid fromAccount or to account"
//             })
//         }
// ////------validate IdempotecyKey-----///
//     const isTransactionAlreadyexists = await transactionModel.findOne({
//          idempotencyKey:idempotencyKey

//     })
//     if(isTransactionAlreadyexists){
//         if(isTransactionAlreadyexists.status==="COMPLETED"){
//             return res.status(200).json({
//                 message:"Transacyion completed"
//             })
//         }
//         if(isTransactionAlreadyexists.status==="PENDING"){
//             return res.status(200).json({
//                 message:"transaction is under process"
//             })

//         }
//         if(isTransactionAlreadyexists.status==="FAILED"){
//             return res.status(400).json({
//                 message:"Transaction failed"
//             })

//         }
//         if(isTransactionAlreadyexists.status==="RESERVED"){
//             return res.status(400).json({
//                 message:"Transaction failed amount debited will be retracked in your account"
//             })
//         }

//     }
//     if(fromUserAccount.status!=="ACTIVE" || toUserAccount.status!=="ACTIVE"){
//         return res.status(400).json({
//             message:"both user must be active"
//         })
//     }

//     const balance = await fromUserAccount.getBalance()

//     if(balance<amount){
//         return res.status(400).json({
//             message:"insufficient balance"
//         })

//     }

//     const session = await mongoose.startSession()
//     session.startTransaction()

//     const transaction = await transactionModel.create({
//         fromAccount,
//         toAccount,
//         idempotencyKey,
//         status:"PENDING",
//         amount,


//     },{session})

//     const creditLedgerEntry = await transactionModel.create({
//         account:toAccount,
//         transaction:transaction._id,
//         type:"CREDIT"
//     })

//     const DebitLedgerEntry = await transactionModel.create({
//         account:fromAccount,
//         transaction:transaction._id,
//         type:"DEBIT"
//     })

//     transaction.status="COMPLETED"
//     await transaction.save({session})

//     await session.commitTransaction()
//     session.endSession()




//     }
    
// }




// module.exports= {
//     createTransaction
// }