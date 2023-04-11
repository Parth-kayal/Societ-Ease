const express = require('express');
const router = express.Router();
const Resident = require('../../models/resident/Resident.model');
const Notice = require('../../models/notice/Notice.model');
const { uuid } = require('uuidv4');
const fetchuser = require('../../middlewares/fetchuser');

//ROUTE 1: Creating notice, Requires Authentication from admin
router.post('/createnotice',fetchuser,async (req,res)=>{
    let success = false;
    
    try{
        const {noticeSubject, noticeDescription} = req.body;
        const userType = req.user.userType;

        if(userType !== 'admin'){
            return res.status(403).json({success, error:"Permission Denied!"})
        }

        const notice = await Notice.create({
            noticeID: uuid(),
            noticeSubject,
            noticeDescription
        })

        success = true;
        return res.status(200).json({success, notice});
    }catch(err){
        return res.status(500).json({success,error:err.message,message:"Internal server error"});
    }
});

// ROUTE 2: Get all notices
router.post('/getnotice',async (req,res)=>{
    let success = false;
    
    try{
        const notices = await Notice.find({});
        success = true;
        return res.status(200).json({success,notices});
    }catch(err){
        return res.status(500).json({success,error:err.message,message:"Internal server error"});
    }
});

// ROUTE 3: PUT Update notice, Admin authentication needed
router.put('/updatenotice',fetchuser,async (req,res)=>{
    let success = false;
    
    try{
        const userType = req.user.userType;
        const noticeID = req.body.noticeID;

        if(userType !== 'admin'){
            return res.status(403).json({success, error:"Permission Denied!"})
        }

        const notice = await Notice.findOneAndUpdate({noticeID},
            {...req.body} , {new: true}
        ) 

        success = true;
        return res.status(200).json({success, notice});
    }catch(err){
        return res.status(500).json({success,error:err.message,message:"Internal server error"});
    }
});

// ROUTE 3:  DELETE notice, Admin authentication needed
router.delete('/deletenotice',fetchuser,async (req,res)=>{
    let success = false;
    
    try{
        const userType = req.user.userType;
        const noticeID = req.body.noticeID;

        if(userType !== 'admin'){
            return res.status(403).json({success, error:"Permission Denied!"})
        }

        const notice = await Notice.findOneAndDelete({noticeID});
        success = true;
        return res.status(200).json({success, notice});
    }catch(err){
        return res.status(500).json({success,error:err.message,message:"Internal server error"});
    }
});

module.exports = router;
