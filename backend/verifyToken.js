// const tokenConfig= require('./token');
const tokenConfig=require('dotenv').config();

const jwt = require('jsonwebtoken');

module.exports= (req,res,next)=>{
    // // const token=req.header("auth-token");

    const token=req.header("Authorization");


//    const token= req.headers["authorization"];
    console.log(token)
    if(!token) return res.status(403).send('Access Denied');

    try {
        // const verifyed= jwt.verify(token,tokenConfig.TOKENSECRET);
        const verifyed= jwt.verify(token,'fcghvjbjbkjkdcjskdcjscjkdckjsbdcjkb');
        
       req.admin=verifyed;
       console.log(req.admin=verifyed)

        next();
    } catch (error) {
        res.status(400).send('invalid token');
    }

}