let express = require('express'),
  multer = require('multer'),
  mongoose = require('mongoose'),
  router = express.Router();
  verifyToken = require('../verifyToken')

// Multer File upload settings
const DIR = './public/';
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(' ').join('-');
    cb(null, fileName)
  }
});

// Multer Mime Type Validation
var upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
    }
  }
});

// Packages model
let Packages = require('../models/Packages');

// POST Packages
router.post('/create-package', upload.single('avatar'), (req, res, next) => {
  const url = req.protocol + '://' + req.get('host')
  const user = new Packages({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    category:req.body.category,
    price:req.body.price,
    locationTo:req.body.locationTo,
    locationEnd:req.body.locationEnd,
    seats:req.body.seats,
  bags:req.body.bags,
  distance:req.body.distance,
  duretion:req.body.duretion,
  extrakm:req.body.extrakm,
  extrahour:req.body.extrahour,
  nightprice:req.body.nightprice,
    avatar: url + '/public/' + req.file.filename,
    
  });
  user.save().then(result => {
    console.log(result);
    res.status(201).json({
      message: "Packages registered successfully!",
      Package: {
        _id: result._id,
        name: result.name,
        category:result.category,
        price:result.price,
        locationTo:result.locationTo,
        locationEnd:result.locationEnd,
        seats:result.seats,
        bags:result.bags,
        distance:result.distance,
        duretion:result.duretion,
        extrakm:result.extrakm,
        extrahour:result.extrahour,
        nightprice:result.nightprice,
        avatar: result.avatar
      }
    })
  }).catch(err => {
    console.log(err),
      res.status(500).json({
        error: err
      });
  })
})
//Update Packages
router.put('/update-package/:id', upload.single('avatar'), (req, res, next) => {
  const url = req.protocol + '://' + req.get('host')
  const user = Packages.findByIdAndUpdate(req.body.id,{
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    category:req.body.category,
    price:req.body.price,
    locationTo:req.body.locationTo,
    locationEnd:req.body.locationEnd,
    seats:req.body.seats,
  bags:req.body.bags,
  distance:req.body.distance,
  duretion:req.body.duretion,
  extrakm:req.body.extrakm,
  extrahour:req.body.extrahour,
  nightprice:req.body.nightprice,
    avatar: url + '/public/' + req.file.filename,
    
  });
  user.save().then(result => {
    console.log(result);
    res.status(201).json({
      message: "Packages registered successfully!",
      Package: {
        _id: result._id,
        name: result.name,
        category:result.category,
        price:result.price,
        locationTo:result.locationTo,
        locationEnd:result.locationEnd,
        seats:result.seats,
        bags:result.bags,
        distance:result.distance,
        duretion:result.duretion,
        extrakm:result.extrakm,
        extrahour:result.extrahour,
        nightprice:result.nightprice,

        avatar: result.avatar
      }
    })
  }).catch(err => {
    console.log(err),
      res.status(500).json({
        error: err
      });
  })
})
// GET All Packages
// router.get("/",(req, res, next) => {
//     Packages.find().then(data => {
//     res.status(200).json(
//       data
//     );
//   });
// });




router.get('/', async (req, res, next) => {
  Packages.find()
  .then(data => {
  res.status(200).json(
    data
  );
});
});

// GET Packages
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

// Delete employee
router.route('/delete/:id').delete((req, res, next) => {
  Packages.findOneAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      })
    }
  })
})

//Update Package
// router.get("/update/:id", (req, res, next)=>{
//   Packages.findByIdAndUpdate(req.params.id,{$set: req.body},(error,data)=>{
//     const url = req.protocol + '://' + req.get('host');
//     _id: new mongoose.Types.ObjectId(),
//     name: req.body.name,
//     category:req.body.category,
//     price:req.body.price,
//     locationTo:req.body.locationTo,
//     locationEnd:req.body.locationEnd,
//     avatar: url + '/public/' + req.file.filename,
//   })
// })

module.exports = router;