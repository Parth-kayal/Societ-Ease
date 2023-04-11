const express = require('express');
const router = express.Router();
const Maintenance = require('../../models/maintenance/Maintenance.model');
const { uuid } = require('uuidv4');
const fetchuser = require('../../middlewares/fetchuser');

//ROUTE 1: Creating maintenance, Requires Authentication from admin
router.post('/createmaintenance',fetchuser, async (req,res)=>{
    let success = false;
    
    try{
        const {maintenanceSubject, maintenanceDescription, maintenanceBudget, maintenancePriority} = req.body;
        const userType = req.user.userType;

        if(userType !== 'admin'){
            return res.status(403).json({success, error:"Permission Denied!"})
        }

        const maintenance = await Maintenance.create({
            maintenanceID: uuid(),
            maintenanceSubject,
            maintenanceDescription,
            maintenanceStatus: "Ongoing",
            maintenanceBudget,
            maintenancePriority

        })

        success = true;
        return res.status(200).json({success, maintenance});
    }catch(err){
        return res.status(500).json({success,error:err.message,message:"Internal server error"});
    }
});

// ROUTE 2: Get all maintenance
router.post('/getmaintenance',async (req,res)=>{
    let success = false;
    
    try{
        const maintenance = await Maintenance.find({});
        success = true;
        return res.status(200).json({success,maintenance});
    }catch(err){
        return res.status(500).json({success,error:err.message,message:"Internal server error"});
    }
});

// ROUTE 3: PUT Update maintenance, Admin authentication needed
router.put('/updatemaintenance',fetchuser,async (req,res)=>{
    let success = false;
    
    try{
        const userType = req.user.userType;
        const maintenanceID = req.body.maintenanceID;

        if(userType !== 'admin'){
            return res.status(403).json({success, error:"Permission Denied!"})
        }

        const maintenance = await Maintenance.findOneAndUpdate({maintenanceID},
            {...req.body} , {new: true}
        ) 

        success = true;
        return res.status(200).json({success, maintenance});
    }catch(err){
        return res.status(500).json({success,error:err.message,message:"Internal server error"});
    }
});

// ROUTE 4:  DELETE maintenance, Admin authentication needed
router.delete('/deletemaintenance',fetchuser,async (req,res)=>{
    let success = false;
    
    try{
        const userType = req.user.userType;
        const maintenanceID = req.body.maintenanceID;

        if(userType !== 'admin'){
            return res.status(403).json({success, error:"Permission Denied!"})
        }

        const maintenance = await Maintenance.findOneAndDelete({maintenanceID});
        success = true;
        return res.status(200).json({success, maintenance});
    }catch(err){
        return res.status(500).json({success,error:err.message,message:"Internal server error"});
    }
});

module.exports = router;
