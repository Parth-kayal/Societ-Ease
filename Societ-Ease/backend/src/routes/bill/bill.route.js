const express = require('express');
const date = require('date-and-time');
const router = express.Router();
const Bill = require('../../models/bill/Bill.model');
const Resident = require('../../models/resident/Resident.model');
const Payment = require('../../models/bill/Payment.model');
const { uuid } = require('uuidv4');
const fetchuser = require('../../middlewares/fetchuser');

//ROUTE 1: Creating bill, Requires Authentication from admin
router.post('/createbill',fetchuser,async (req,res)=>{
    let success = false;
    
    try{
        const {billAmount, billType, billRoomNumber} = req.body;
        const userType = req.user.userType;

        if(userType !== 'admin'){
            return res.status(403).json({success, error:"Permission Denied!"})
        }

        const bill = await Resident.find({residentRoomNumber: billRoomNumber}).then(async (res)=>{
            return await Bill.find({billRoomNumber, billType}).then(async (bi)=>{
                if(bi.length == 0) return await Bill.create({
                    billID: uuid(),
                    billRoomNumber,
                    billType,
                    billForResident: res[0].residentID,
                    billDue: billAmount,
                    billTotal: billAmount,
                    billStatus:"Unpaid"
                })
                else {
                    return await Bill.findOneAndUpdate({billRoomNumber, billType},
                        {$inc: {billDue: billAmount, billTotal: billAmount}, billStatus: "Unpaid"},
                        {new: true}    
                    )
                }
            })
        })

        success = true;
        return res.status(200).json({success, bill});
    }catch(err){
        return res.status(500).json({success,error:err.message,message:"Internal server error"});
    }
});

// ROUTE 2: POST Get all bills, admin auth
router.post('/getallbill',fetchuser,async (req,res)=>{
    let success = false;
    
    try{

        const userType = req.user.userType;

        if(userType !== 'admin'){
            return res.status(403).json({success, error:"Permission Denied!"})
        }

        const bills = await Bill.find({});
        success = true;
        return res.status(200).json({success, bills});
    }catch(err){
        return res.status(500).json({success,error:err.message,message:"Internal server error"});
    }
});

// ROUTE 3: POST Get my bills, admin auth
router.post('/getmybill',fetchuser,async (req,res)=>{
    let success = false;
    
    try{
        const userType = req.user.userType;
        const billForResident = req.user.id || req.body.residentID;
        const user = req.user

        if(!((userType === 'admin') || (userType === 'resident' && user.id === billForResident))){
            return res.status(403).json({success, error:"Permission Denied!"})
        }

        const bills = await Bill.find({billForResident});
        success = true;
        return res.status(200).json({success, bills});
    }catch(err){
        return res.status(500).json({success,error:err.message,message:"Internal server error"});
    }
});

// ROUTE 4: Post Pay my bills, resident auth
router.post('/paybill',fetchuser,async (req,res)=>{
    let success = false;
    
    try{
        const userType = req.user.userType;
        const billForResident = req.body.residentID;
        const {paymentAmount, billType, paymentID} = req.body;
        if(userType!=='resident'){
            return res.status(403).json({success, error:"Permission Denied!"})
        }

        const bill = await Payment.create({
            paymentID,
            paymentAmount,
            billType,
            paidBy: req.user.id,
            paymentStatus: "Successful"
        }).then(async ()=>{
            return await Bill.findOneAndUpdate({billForResident, billType},
            {$inc: {billDue: -1*paymentAmount}, billStatus: "Paid"},
            {new: true}
            )
        })
        success = true;
        return res.status(200).json({success, bill});
    }catch(err){
        return res.status(500).json({success,error:err.message,message:"Internal server error"});
    }
});

// ROUTE 5: Post get my payents, resident auth
router.post('/getmypayment',fetchuser,async (req,res)=>{
    let success = false;
    
    try{
        const userType = req.user.userType;

        if(userType!=='resident'){
            return res.status(403).json({success, error:"Permission Denied!"})
        }

        const payments = await Payment.find({paidBy: req.user.id})
        success = true;
        return res.status(200).json({success, payments});
    }catch(err){
        return res.status(500).json({success,error:err.message,message:"Internal server error"});
    }
});

module.exports = router;
