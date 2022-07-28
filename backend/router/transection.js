const express=require('express');
var router=express.Router();
var Transection=require('../model/Transection');
var verifyById=require('../verifyById');
var mongoose=require('mongoose');

router.route('/trans').post(verifyById.verifyJwtToken,(req,res,next)=>{
    var userId=mongoose.Types.ObjectId(req._id);
    var partyId=mongoose.Types.ObjectId(req.body._partyId);
    console.log(userId)
    var trans=new Transection({
        date:req.body.date,
        partyName:req.body.partyName,
        type:req.body.type,
        payment:req.body.payment,
        _partyId:partyId,
        _userId:userId
    });
    trans.save().then((result) => {
         res.status(200).json({
             date:result.date,
             partyName:result.partyName,
             type:result.type,
             payment:result.payment,
             _partyId:result._partyId,
             _userId:result._userId
         })        
    }).catch((err) => {
        console.log(err)
    });
})


router.get('/partyName',verifyById.verifyJwtToken,(req,res,next)=>{
   
    Transection.find({partyName:req.query.partyName,_userId:req._id},(err,data)=>{
      if(err){
        return next(err)
      }else{
        res.status(200).json(data);
      }
    })
  })

//Get Transection
router.get('/getTrans',verifyById.verifyJwtToken,(req,res,next)=>{
    Transection.find({"_userId" : mongoose.Types.ObjectId(req._id)},(err,data)=>{
        if(err)
        {
            return next(err)
        }else{
            res.json(data)
        }
    })
})

//get transection by id
router.get('/trsns/:id',verifyById.verifyJwtToken,(req,res,next)=>{
    Transection.find({_partyId:mongoose.Types.ObjectId(req.params.id)},(err,data)=>{
        if(err)
        {
            return next(err)
        }else{
            res.status(200).json(data);
        }
    })
})



module.exports=router;