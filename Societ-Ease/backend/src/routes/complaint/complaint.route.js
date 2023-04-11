const express = require('express');
const router = express.Router();
const Resident = require('../../models/resident/Resident.model');
const Complaint = require('../../models/complaint/Complaint.model')
const { uuid } = require('uuidv4');
const fetchuser = require('../../middlewares/fetchuser');

//ROUTE 1: Creating notice, Requires Authentication from admin
router.post('/createcomplaint',fetchuser,async (req,res)=>{
    let success = false;
    
    try{
        const {complaintSubject, complaintDescription, complaintPriority} = req.body;
        const userType = req.user.userType;
        
        if(userType !== 'resident'){
            return res.status(403).json({success, error:"Permission Denied!"})
        }

        // console.log(req.user.id);
        const complaint = await Resident.find({residentID: req.user.id}).then(async (res)=>{
            console.log(res)
            return await Complaint.create({
                complaintID: uuid(),
                residentID: req.user.id,
                complaintSubject,
                complaintDescription,
                complaintBy: res[0].residentName + " Room No: " + res[0].residentRoomNumber,
                complaintPriority,
                complaintStatus: "Not resolved"
            })
        })
        

        success = true;
        return res.status(200).json({success, complaint});
    }catch(err){
        return res.status(500).json({success,error:err.message,message:"Internal server error"});
    }
});

// ROUTE 2: Get all complaints by the resident by id, requires auth
router.post('/getmycomplaints', fetchuser, async (req,res)=>{
    let success = false;
    
    try{
        if(req.user.userType !== 'resident'){
            return res.status(403).json({success, error:"Permission Denied!"})
        }

        console.log(req.user.id)
        const myComplaints = await Complaint.find({residentID : req.user.id});
        success = true;
        return res.status(200).json({success,myComplaints});
    }catch(err){
        return res.status(500).json({success,error:err.message,message:"Internal server error"});
    }
});

// ROUTE 3: UPDATE all complaints, Admin authentication needed
router.put('/updatecomplaint',fetchuser,async (req,res)=>{
    let success = false;
    
    try{
        const userType = req.user.userType;
        const complaintID = req.body.complaintID;

        if(userType !== 'resident'){
            return res.status(403).json({success, error:"Permission Denied!"})
        }

        const complaint = await Complaint.findOneAndUpdate({complaintID},
            {...req.body} , {new: true}
        ) 

        success = true;
        return res.status(200).json({success, complaint});
    }catch(err){
        return res.status(500).json({success,error:err.message,message:"Internal server error"});
    }
});

//ROUTE 4: POST Get all complaints, Admin authentication needed
router.post('/getallcomplaints', fetchuser, async (req, res)=>{
    let success = false;
    
    try{
        const userType = req.user.userType;
        
        if(userType !== 'admin'){
            return res.status(403).json({success, error:"Permission Denied!"})
        }

        const complaints = await Complaint.find({}) 

        success = true;
        return res.status(200).json({success, complaints});
    }catch(err){
        return res.status(500).json({success,error:err.message,message:"Internal server error"});
    }
})

// ROUTE 5:  DELETE complaints, Resident authentication needed
router.delete('/deletecomplaint',fetchuser,async (req,res)=>{
    let success = false;
    
    try{
        const userType = req.user.userType;
        const complaintID = req.body.complaintID;

        if(userType !== 'resident'){
            return res.status(403).json({success, error:"Permission Denied!"})
        }

        const complaint = await Complaint.findOneAndDelete({complaintID});
        success = true;
        return res.status(200).json({success, complaint});
    }catch(err){
        return res.status(500).json({success,error:err.message,message:"Internal server error"});
    }
});

// ROUTE 6:  PUT Resolve complaints, Resident authentication needed
router.put('/resolvecomplaint',fetchuser,async (req,res)=>{
    let success = false;
    
    try{
        const userType = req.user.userType;
        const complaintID = req.body.complaintID;

        if(userType !== 'resident'){
            return res.status(403).json({success, error:"Permission Denied!"})
        }

        const complaint = await Complaint.findOneAndUpdate({complaintID},
            {complaintStatus: "Resolved"} , {new: true}
        ) 

        success = true;
        return res.status(200).json({success, complaint});
    }catch(err){
        return res.status(500).json({success,error:err.message,message:"Internal server error"});
    }
});

module.exports = router;
