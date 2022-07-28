const express=require('express');
var router=express.Router();
var Items=require('../model/Items');
var verifyById=require('../verifyById');
var mongoose=require('mongoose');


router.post('/create-item',verifyById.verifyJwtToken,(req,res,next)=>{
   var userid=req._id;
    var data=new Items({
        item:req.body.item,
        itemDesc:req.body.itemDesc,
        openingStock:req.body.openingStock,
        date:req.body.date,
        salesPrice:req.body.salesPrice,
        purchasePrice:req.body.purchasePrice,
        hsnCode:req.body.hsnCode,
        gst:req.body.gst,
        _userId:userid
    });
    data.save().then((result) => {
        res.status(200).json({
            item:result.item,
            itemDesc:result.itemDesc,
            openingStock:result.openingStock,
            date:result.date,
            salesPrice:result.salesPrice,
            purchasePrice:result.purchasePrice,
            hsnCode:result.hsnCode,
            gst:result.gst,
            _userId:result._userId
        })
    }).catch((err) => {
        console.log(err)
    });
})

//Get All Items
router.get('/items',verifyById.verifyJwtToken,(req,res,next)=>{
    Items.find({"_userId" : mongoose.Types.ObjectId(req._id)},(err,data)=>{
        if(err)
        {
            return next(err)
        }else{
            res.json(data)
        }
    })
})

//Delete Item By Id
router.delete('/item/:id',(req,res,next)=>{
    Items.findByIdAndDelete(req.params.id,(err,data)=>{
        if(err)
        {
            return next(err)
        }else{
            res.status(200).json(data)
        }
    })
})

//Update Item By Id
router.route('/edit/:id').patch((req, res, next) => {
    Items.findByIdAndUpdate(req.params.id, {
      $set: req.body
    }, (error, data) => {
      if (error) {
        return next(error);
        
      } else {
        res.json(data)
        console.log('Data updated successfully')
      }
    })
  })

module.exports=router;