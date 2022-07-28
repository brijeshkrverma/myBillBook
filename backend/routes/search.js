let express = require('express'),
  multer = require('multer'),
  mongoose = require('mongoose'),
  router = express.Router();
  verifyToken = require('../verifyToken')
  var ApiFilters= require('../filter');
  let Packages = require('../models/Packages');


//Filter data
  router.get('/oneway', async (req, res, next) => {
    var apiFilter= new ApiFilters(Packages.find(),req.query).search().category();
    var data=apiFilter.search() && apiFilter.category();
     var package= await data.query;
     res.status(200).json(package);
    });

//One way




  module.exports = router;