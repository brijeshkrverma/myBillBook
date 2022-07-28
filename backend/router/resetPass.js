const express=require('express');
var router=express.Router();
var UserReg=require('../model/UserReg');
var nodemailer=require('nodemailer');

router.post('/reset',async(req,res,next)=>{
    console.log(req.body.email)
    
   var admin= await UserReg.findOne({email:req.body.email});
   if(!admin) return res.status(400).send('Email not exist');

   var emailData=req.body.email
    console.log(emailData)

    var otpData=req.body.otp



    var transporter=nodemailer.createTransport({
        host:'smtp.gmail.com',
        port:587,
        // secure:false,
        // requireTLS:false,
        auth:{
            user:'brijeshverma957@gmail.com',
            pass:'brijesh@123@'            
        }
    });
    var mailOption={
        from:'brijeshverma957@gmail.com',
        // to:'madhureshshukla011@gmail.com',
          to:emailData,
        //  to:'pragatisaini10121998@gmail.com',
        subject:'Your Subject Here!',
        text:'One time password    '+otpData,
        // attachments: [{
        //     filename: 'data.pdf',
        //     path:'./public/data.pdf',
        //     contentType: 'application/pdf'
        //   }],
    }
   await transporter.sendMail(mailOption,function(error,info){
        if(error)
        {
            console.log(error)
        }else{
            console.log("Email has been send"+info.response)
            
        }
    })
     
})

module.exports=router;