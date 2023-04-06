const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Resident  = require('../../models/resident/Resident.model');
const Admin = require('../../models/admin/Admin.model');
const Auth = require('../../models/auth/LoginInfo.model');
const { uuid } = require('uuidv4');
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

//ROUTE 1: POST Login API
router.post('/login',async (req,res)=>{
    let success = false;
    
    try{
        const user = await Auth.findOne({email:req.body.email});
        if(!user){
            return res.status(400).json({success,error:"Invalid credentials"});
        }

        if(user.userType!=req.body.userType){
            return res.status(400).json({success, error: "You don't have permission"})
        }
        let password = req.body.password;
        let passwordMatch = await bcrypt.compare(password,user.password);
        if(!passwordMatch){
            return res.status(400).json({success,error:"Invalid Credentials"});
        }

        const data = {
            user:{
                id:user.userID,
                email: user.email,
                userType: user.userType
            }
        }

        const authToken = jwt.sign(data,JWT_SECRET_KEY);
        let userDetails;
        if(authToken){
            if(user.userType === "resident") userDetails = await Resident.find({residentID: user.userID});
            else if(user.userType === "admin") userDetails = await Admin.find({adminID: user.userID});
        }
        success = true;
        return res.status(200).json({success,authToken,userDetails});
    }catch(err){
        return res.status(500).json({success,error:err.message,message:"Internal server error"});
    }
});

//ROUTE 2: POST Admin Register API, only for backend
router.post('/createadmin',async (req,res)=>{

    let success = false;

    try{
        //Check whether admin with same email exist
        let admin = await Admin.findOne({adminEmail: req.body.adminEmail});
        if(admin){
            return res.status(400).json({success,error:"Sorry! this email already exists"});
        }
        
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(req.body.password,salt);
        const adminID = uuid();
        admin = await Admin.create({
            adminID: adminID,
            adminName: req.body.adminName,
            adminAadhar: req.body.adminAadhar,
            adminEmail:req.body.adminEmail,
            adminContactNumber: req.body.adminContactNumber,
            status:"active"
        });

        const adminUser = await Auth.create({
            userType: "admin",
            email: req.body.adminEmail,
            password: hashedPass,
            userID: adminID
        })

        let data;
        if(adminUser){
            data = {
                user:{
                    id: adminUser.userID,
                    email: adminUser.email,
                    userType: adminUser.userType
                }
            }
        }
        const userDetails = admin;
        const authToken = jwt.sign(data,JWT_SECRET_KEY);
        success = true;
        return res.status(200).json({success,authToken,userDetails});

    }catch(err){
        return res.status(500).json({success,error:err.message,message:"Internal server error"});
    }
});

//ROUTE 3: POST Resident Register API
router.post('/createresident',async (req,res)=>{

    let success = false;

    try{
        //Check whether admin with same email exist
        let resident = await Resident.findOne({residentEmail: req.body.residentEmail});
        if(resident){
            return res.status(400).json({success,error:"Sorry! this email already exists"});
        }
        
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(req.body.password,salt);
        const residentID = uuid();
        resident = await Resident.create({
            residentID: residentID,
            residentName: req.body.residentName,
            residentAadhar: req.body.residentAadhar,
            residentEmail:req.body.residentEmail,
            residentContactNumber: req.body.residentContactNumber,
            residentRoomNumber: req.body.roomNumber,
            securityKey: req.body.securityKey,
            status:"active"
        });

        const residentUser = await Auth.create({
            userType: "resident",
            email: req.body.residentEmail,
            password: hashedPass,
            userID: residentID
        })

        let data;
        if(residentUser){
            data = {
                user:{
                    id: residentUser.userID,
                    email: residentUser.email,
                    userType: residentUser.userType
                }
            }
        }
        const userDetails = resident;
        const authToken = jwt.sign(data,JWT_SECRET_KEY);
        success = true;
        return res.status(200).json({success,authToken,userDetails});

    }catch(err){
        return res.status(500).json({success,error:err.message,message:"Internal server error"});
    }
});

module.exports = router;
