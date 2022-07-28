const jwt = require('jsonwebtoken');
const tokenConfig=require('dotenv').config();

module.exports.verifyJwtToken=(req,res,next)=>{
    // var token;
    // if('auth-token' in req.headers)
    token=req.header("Authorization");
    console.log(token)
    
    if(!token)
    return res.status(403).send({auth:false,message:'No Token Provided.'});
    else{
        jwt.verify(token,'fcghvjbjbkjkdcjskdcjscjkdckjsbdcjkb',(err,decoded)=>{
            if(err)
            return res.status(500).send({auth:false,message:'Token authentication failed.'});
            else{
                req._id=decoded._id;
                next();
            }
        })
    }
}