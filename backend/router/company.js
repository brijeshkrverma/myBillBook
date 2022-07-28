const express=require('express');
const router=express.Router();
var Company = require('../model/Company');
var Userdata=require('../model/UserReg');

 


//Testing

// console.log(GetId().getId)

//Create Business


router.route('/create-business').post(async (req,res,next)=>{
    var regId= await Userdata.findOne({email:'vijaykr@gmail.com'});
    console.log(regId._id)
    
  var users=new Company({
    
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
    upiId:req.body.upiId,
    _userId:regId
  });
    users.save().then((result) => {
      res.status(200).json({
         
            Company:{
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
             upiId:result.upiId,
             _userId:result._userId
        }
      })
  }).catch((err) => {
      console.log(err)
  });
   
})




//Get By Id
router.get('/', async (req, res, next) => {
  Company.find()
  .then(data => {
  res.status(200).json(
    data
  );
});
});


 var mongoose=require('mongoose');
router.get('/:userId',(req,res,next)=>{
  Company.find({"_userId" : mongoose.Types.ObjectId(req.params['userId']),},(err,data)=>{
    if(err)
    {
      return next(err)
    }else{
      res.status(200).json(data)
    }
  })
})




  
  





module.exports=router;