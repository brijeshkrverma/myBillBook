const Packages = require('../models/Packages');

let express = require('express'),
  mongoose = require('mongoose'),
  router = express.Router();

  //Mumbai
  router.get('/mumbai', async (req, res, next) => {
    Packages.find({locationEnd:'Mumbai',$options:'i'})
    .then(data => {
    res.status(200).json(
      data
    );
  });
  });

  //Jaipur
  router.get('/jaipur', async (req, res, next) => {
    Packages.find({locationEnd:'Jaipur',$options:'i'})
    .then(data => {
    res.status(200).json(
      data
    );
  });
  });

  //Goa
  router.get('/goa', async (req, res, next) => {
    Packages.find({locationEnd:'Goa',$options:'i'})
    .then(data => {
    res.status(200).json(
      data
    );
  });
  });

  //Chardham
  router.get('/chardham', async (req,res,next)=>{
    Packages.find({locationEnd:'Chardham'})
    .then(data=>{
      res.status(200).json(data)
    })
  })

  //Badrinath
  router.get('/kedarnath-badrinath', async (req,res,next)=>{
    Packages.find({locationEnd:'Badrinath'})
    .then(data=>{
      res.status(200).json(data)
    })
  })

  //By Airport
  router.get('/airport', async (req,res,next)=>{
    Packages.find({
      category:'Airport Taxi',
      $options:'i'
    }).then(data=>{
      res.status(200).json(data)
    })
  })


  module.exports = router;