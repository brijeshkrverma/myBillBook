let express = require('express'),
  mongoose = require('mongoose'),
  Booking=require('../models/Booking');
 Packages = require('../models/Packages');
  router = express.Router();
  

   router.route('/booking').post((req,res,next)=>{
    const user = new Booking({
      
      name: req.body.name,
      email:req.body.email,
      mobile:req.body.mobile,
      time:req.body.time,
      address:req.body.address,
      date:req.body.date,
    city:req.body.city,
    state:req.body.state,
    // // carname:req.body.carname
    
    });
    user.save().then(result => {
      console.log(result);
      res.status(201).json({
        message: "Booking registered successfully!",
        Booking: {
          name: result.name,
          email:result.email,
          mobile:result.mobile,
          time:result.time,
          address:result.address,
          date:result.date,
        city:result.city,
        state:result.state,
        // // carname:result.carname
         
        }
      })
    }).catch(err => {
      console.log(err),
        res.status(500).json({
          error: err
        });
    })
   })
   
   //Get All Bookings
   router.get('/all-booking', async (req,res,next)=>{
       Booking.find().then(data=>{
           res.status(200).json(data)
       })
   })

//    // GET Packages
router.get("/", (req, res, next) => {
    Packages.find().then(data => {
    if (data) {
      res.status(200).json(data);
    } else {
      res.status(404).json({
        message: "package not found!"
      });
    }
  });
});


//Pack Get By Id

router.get("/:id", (req, res, next) => {
  Packages.findById(req.params.id).then(data => {
  if (data) {
    res.status(200).json(data);
  } else {
    res.status(404).json({
      message: "package not found!"
    });
  }
});
});
   
  

  module.exports = router;