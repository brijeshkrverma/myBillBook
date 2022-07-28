const express=require('express');
const partyRoutes=express.Router();
var AddParty=require('../model/AddParty');
var Userdata=require('../model/UserReg');
var jwt = require('jsonwebtoken');
const tokenConfig=require('dotenv').config();
var app=express();
var verifyToken=require('../verifyToken');
var jwtHelper=require('../verifyById');



// router.get('/dd',(req,res,next)=>{
//   const decoded=jwt.verify(token,tokenConfig.TOKENSECRET);
//   req._userId=decoded
// })



//https://stackoverflow.com/questions/53897502/how-to-get-user-id-from-jwt-token-in-node-js


//Create Party
partyRoutes.route('/create-party').post(jwtHelper.verifyJwtToken,async (req,res,next)=>{
  console.log("_id:req._id"+req._id);
  // await Userdata.findOne({email:'vijaykr@gmail.com'});
    var regId= mongoose.Types.ObjectId(req._id)
    console.log(regId)
    

  var users=new AddParty({
    
    partyName:req.body.partyName,
    mobile:req.body.mobile,
    email:req.body.email,
    openBalance:req.body.openBalance,
    balanceType:req.body.balanceType,
    partyType:req.body.partyType,
    partyCategory:req.body.partyCategory,
    gstin:req.body.gstin,
    pan:req.body.pan,
    placeOfSupply:req.body.placeOfSupply,
    billAdr:req.body.billAdr,
    shippingAdr:req.body.shippingAdr,
    creditPeriod:req.body.creditPeriod,
    creditLimit:req.body.creditLimit,
    _userId:regId
  });
    users.save().then((result) => {
      res.status(200).json({
         
            
                partyName:result.partyName,
                mobile:result.mobile,
                email:result.email,
                openBalance:result.openBalance,
                balanceType:result.balanceType,
                partyType:result.partyType,
                partyCategory:result.partyCategory,
                gstin:result.gstin,
                pan:result.pan,
                placeOfSupply:result.placeOfSupply,
                billAdr:result.billAdr,
                shippingAdr:result.shippingAdr,
                creditPeriod:result.creditPeriod,
                creditLimit:result.creditLimit,
             _userId:result._userId
        }
      )
  }).catch((err) => {
      console.log(err)
  });
   
})

//Get By userId
var mongoose=require('mongoose');
partyRoutes.get('/getall',jwtHelper.verifyJwtToken,(req,res,next)=>{
    AddParty.find({"_userId" : mongoose.Types.ObjectId(req._id),},(err,data)=>{
    if(err)
    {
      return next(err)
    }else{
      res.status(200).json(data)
    }
  })
})




//Get Where To Pay
partyRoutes.get('/topaydata',jwtHelper.verifyJwtToken, (req, res, next) => {
  AddParty.find({balanceType: "To Pay","_userId" : mongoose.Types.ObjectId(req._id)}).then(data => {
    console.log(data)
  res.status(200).json(
    data
  );
});
});

//Get Where To Collect
partyRoutes.get('/tocollectdata',jwtHelper.verifyJwtToken,(req,res,next)=>{
  AddParty.find({balanceType:"To Collect","_userId" : mongoose.Types.ObjectId(req._id)},(err,data)=>{
    if(err)
    {
      return next(err)
    }else{
      res.status(200).json(data)
    }
  })
})



partyRoutes.get('/partyName',(req,res,next)=>{
  AddParty.find({partyName:req.query.partyName},(err,data)=>{
    if(err){
      return next(err)
    }else{
      res.status(200).json(data);
    }
  })
})

//Get Party By Id
partyRoutes.get('/:id',jwtHelper.verifyJwtToken,(req,res,next)=>{
  AddParty.findById(req.params.id,(err,data)=>{
    if(err){
      return next(err)
    }else{
      res.status(200).json(data)
    }
  })
})

//Update Price
partyRoutes.put('/update/:id',(req,res,next)=>{
  console.log(req.body.openBalance)
  AddParty.findByIdAndUpdate(req.params.id,
    { $set: { openBalance: req.body.openBalance}},
    (err,data)=>{
    if(err){
      return next(err)
    }else{
      res.json(data)
      console.log('Data update successfully');

    }
  })
})
module.exports=partyRoutes;