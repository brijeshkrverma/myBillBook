const express = require('express');
const AttachTaxi = require('../models/Attach-taxi');
const router = express.Router();
const AttachTexi = require('../models/Attach-taxi');


router.route('/attach-taxi').post((req, res, next) => {
    AttachTexi.create(req.body, (error, data) => {
      if (error) {
        return next(error)
      } else {
        res.json(data)
      }
    })
  });

  //Get All Attached taxi
  router.route('/').get((req,res,next)=>{
      AttachTaxi.find((error,data)=>{
          if(error){
              return next(error)
          }else{
              res.json(data)
          }
      })
  }) 

module.exports=router;