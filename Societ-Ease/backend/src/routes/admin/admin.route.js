const express = require('express');
const router = express.Router();
const Resident  = require('../../models/resident/Resident.model');
const AdminNotif = require('../../models/admin/AdminNotif.model');
const fetchuser = require('../../middlewares/fetchuser');

//ROUTE 1: Getting all resident details, Requires Authentication from admin
router.post('/getallres',fetchuser,async (req,res)=>{
    let success = false;
    
    try{
        const user = req.user.userID;
        const userType = req.user.userType;

        if(userType !== 'admin'){
            return res.status(403).json({success, error:"Permission Denied!"})
        }

        const residentsData = await Resident.find({});
        success = true;
        return res.status(200).json({success, residentsData});
    }catch(err){
        return res.status(500).json({success,error:err.message,message:"Internal server error"});
    }
});

// ROUTE 2: Post Get particular res
router.post('/getres',fetchuser,async (req,res)=>{
    let success = false;
    
    try{
        // const user = req.user;
        const userType = req.user.userType;
        const userID = req.body.residentID;

        if(!((userType === 'admin') || (userType === 'resident' && user.userID === userID))){
            return res.status(403).json({success, error:"Permission Denied!"})
        }

        // console.log(userID);
        const residentsData = await Resident.find({residentID: userID});
        success = true;
        return res.status(200).json({success, residentsData});
    }catch(err){
        return res.status(500).json({success,error:err.message,message:"Internal server error"});
    }
});

// ROUTE 3: Put Update particular res
router.put('/updateres',fetchuser,async (req,res)=>{
    let success = false;
    
    try{
        // const user = req.user;
        const userType = req.user.userType;
        const userID = req.body.residentID;

        if((userType !== 'admin')){
            return res.status(403).json({success, error:"Permission Denied!"})
        }

        const resident = await Resident.findOneAndUpdate({residentID: userID},
          {...req.body},
          {new: true}  
        );
        
        success = true;
        return res.status(200).json({success, resident});
    }catch(err){
        return res.status(500).json({success,error:err.message,message:"Internal server error"});
    }
});

// ROUTE 4: POST Get all notifications of admin
router.post('/getadminnotif',fetchuser,async (req,res)=>{
    let success = false;
    
    try{
        const user = req.user.userID;
        const userType = req.user.userType;

        if(userType !== 'admin'){
            return res.status(403).json({success, error:"Permission Denied!"})
        }

        const notifs = await AdminNotif.find({});
        success = true;
        return res.status(200).json({success, notifs});
    }catch(err){
        return res.status(500).json({success,error:err.message,message:"Internal server error"});
    }
});

module.exports = router;
