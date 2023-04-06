const express = require('express');
const router = express.Router();
const ResidentNotif = require('../../models/resident/ResidentNotif.model');
const fetchuser = require('../../middlewares/fetchuser');


// ROUTE 1: POST Get all notifications of the resident
router.post('/getresnotif',fetchuser,async (req,res)=>{
    let success = false;
    
    try{
        const user = req.user;
        const userType = req.user.userType;
        const userID = req.body.residentID;

        if(userType !== 'resident' || user.userID !== userID){
            return res.status(403).json({success, error:"Permission Denied!"})
        }

        const notifs = await ResidentNotif.find({residentID: userID});
        success = true;
        return res.status(200).json({success, notifs});
    }catch(err){
        return res.status(500).json({success,error:err.message,message:"Internal server error"});
    }
});

module.exports = router;
