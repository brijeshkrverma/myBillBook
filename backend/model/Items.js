const mongoose=require('mongoose');
const Schema=mongoose.Schema;


var Items=new Schema({
    item:{type:String,required:true},
    
    itemDesc:{type:String},
    openingStock:{type:Number},
    date:{type:Date},
    salesPrice:{type:Number},
    purchasePrice:{type:Number},
    hsnCode:{type:String},
    gst:{type:Number},
    _userId:{type: Schema.Types.ObjectId, ref: 'UserReg'}
},{
    collection:'Items'
})

module.exports=mongoose.model('Items',Items);