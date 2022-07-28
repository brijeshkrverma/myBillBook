
const express=require('express');

 let Login = require('../models/Login');
 router = express.Router();
 var jwt = require('jsonwebtoken');
 var bcrypt = require('bcrypt');
 var tokenConfig = require('../token');
 var verifyTocken= require('../verifyToken');

//register  


//Admin Login
router.route('/login').post(async (req,res,next)=>{
  //Email Validation
 var admin = await Login.findOne({email:req.body.email});
 if(!admin)
   return res.status(400).send('Email Already Exist');
var loginData=new Login();
   //Check Password in database
   var pass=await bcrypt.compare(req.body.password,admin.password);
   console.log('Done   :    '+admin.password)
   if(!pass) return res.status(400).send('Your Password Is Not Valid!')
    console.log("Data of id "+admin._id)
   var token = await jwt.sign({_id:admin._id},tokenConfig.TOKENSECRET);

   console.log(token);
   res.header("auth-token",token).send({token:token})
 

})
//register


router.route('/register').post((req, res, next) => {
//checking user password in database
bcrypt.genSalt(10,(err,salt)=>{
  bcrypt.hash(req.body.password,salt,(err,hash)=>{
    
    var hashed=hash;
    console.log(hashed)
    Login.create({
      email:req.body.email,
      password:hashed
    },(err,data)=>{
      if(err){
        return next(err)
      }else{
        res.json(data)
      }
    })
  })
})
});

//get Email ang Password
router.route('/getdata').get( async(req,res,next)=>{
  try{
const listing= await Login.find();
res.json(listing);
  }
  catch(error){
      res.json({message:error})
  }
});
//register


module.exports = router;