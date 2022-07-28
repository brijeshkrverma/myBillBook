const express=require('express');
const router=express.Router();
var UserReg = require('../model/UserReg');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');

var mongoose=require('mongoose');
var jwtHelper=require('../verifyById');
var verifyById=require('../verifyById');


//User Login router

router.route('/login').post(async (req,res)=>{
    //Email Validation
   
   var admin = await UserReg.findOne({email:req.body.email});
   
   if(!admin)
     return res.status(400).send('Email Already Exist');
  console.log(admin.password+" "+req.body.password)
     //Check Password in database
     console.log(admin.password);
     
     var pass=await bcrypt.compare(req.body.password,admin.password);
    //  console.log('Done   :   '+pass)
    if(pass){
        console.log("Valid")
    }else{
        console.log("Invalid")
    }
     if(!pass) return res.status(400).send('Your Password Is Not Valid!')
      console.log("Data of id "+admin._id)
      
     var token = await jwt.sign({_id:admin._id},'fcghvjbjbkjkdcjskdcjscjkdckjsbdcjkb');
  
     console.log(token);
     res.header("Authorization",token).send({token:token})
  
  })


//register user router


router.route('/reg').post((req,res)=>{
   
    bcrypt.genSalt(10,(err,salt)=>{
        bcrypt.hash(req.body.password,salt,async(err,hash)=>{
            var hashPassword=hash
            console.log(hashPassword);
            var mail=req.body.email;
            var valid= await UserReg.findOne({email:mail})
            
            if(valid) return res.status(400).json({message:"Email already exist"})
            
                 var login= new UserReg({
                _id: new mongoose.Types.ObjectId(),
                
                email:req.body.email,
                password:hashPassword,
                avatar:req.body.avatar,
                cName:req.body.cName,
                billAdr:req.body.billAdr,
                cPhone:req.body.cPhone,
                gst:req.body.gst,
                pan:req.body.pan,
                placeOfSupply:req.body.placeOfSupply,
                bType:req.body.bType,
                industryType:req.body.industryType,
                bankDetail:req.body.bankDetail,
                upiId:req.body.upiId
            })
            
    
            login.save().then((result) => {
                userId=result._id;
                res.status(200).json({
                    
                        _id:result._id,
                       
                        email:result.email,
                        password:result.password,
                        avatar:result.avatar,
                        cName:result.cName,
                        billAdr:result.billAdr,
                        cPhone:result.cPhone,
                        gst:result.gst,
                        pan:result.pan,
                        placeOfSupply:result.placeOfSupply,
                        bType:result.bType,
                        industryType:result.industryType,
                        bankDetail:result.bankDetail,
                        upiId:result.upiId


                })
            }).catch((err) => {
                console.log(err)
            });
        })
    })
})


//update User Details
// router.put('/update-user',verifyById.verifyJwtToken,(req,res,next)=>{
//     UserReg.findByIdAndUpdate({"_id":mongoose.Types.ObjectId(req._id)},{
//     avatar:req.body.avatar,
//     cName:req.body.cName,
//     billAdr:req.body.billAdr,
//     cPhone:req.body.cPhone,
//     pan:req.body.pan,
//     placeOfSupply:req.body.placeOfSupply,
//     bType:req.body.bType,
//     industryType:req.body.industryType,
//     upiId:req.body.upiId
//     })
// })

//update user
router.route('/update-user').put(verifyById.verifyJwtToken,(req,res,next)=>{
    UserReg.findByIdAndUpdate({"_id":mongoose.Types.ObjectId(req._id)},
    {$set:req.body},(err,data)=>{
        if(err)
        {
            return next(err)
        }else{
          res.status(200).json(data)
        }
    })
})
//Reset Password
router.route('/update-pass').patch((req,res,next)=>{

    console.log(req.body.email)
    bcrypt.genSalt(10,(err,salt)=>{
        bcrypt.hash(req.body.password,salt, async(err,hash)=>{
            var hashPassword=hash
            console.log(hash)
            UserReg.updateOne({"email":req.body.email},{password:hashPassword},(err,data)=>{
                if(err)
                {
                    return next(err)
                }else{
                    res.status(200).json(data)
                }
            })
        })
    })
   
})
//update user bank detail
router.put('/update-bank',verifyById.verifyJwtToken,(req,res,next)=>{
    UserReg.findByIdAndUpdate({"_id":mongoose.Types.ObjectId(req._id)},{
        $set:req.body
    },(err,data)=>{
        if(err)
        {
            return next(err)
        }else{
            res.status(200).json(data)
        }
    })
})

//get Users by id
router.get('/user',jwtHelper.verifyJwtToken, (req,res)=>{
  UserReg.find({"_id":mongoose.Types.ObjectId(req._id)},(err,data)=>{
      if(err)
      {
          return next(err)
      }else{
          res.status(200).json(data)
      }
  })
})

//Get All Users
router.get('/',(req,res,next)=>{
    UserReg.find((err,data)=>{
        if(err)
        {
            return next(data)
        }else{
            res.status(200).json(data)
        }
    })
})

module.exports=router;
