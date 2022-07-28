const mongoose= require('mongoose');
const Schema=mongoose.Schema;

let Company = new Schema({
        avatar:{type:String},
        cName:{type:String},
        billAdr:{type:String},
        cPhone:{type:String},
        gst:{type:String},
        pan:{type:String},
        placeOfSupply:{type:String},
        bType:{type:String},
        industryType:{type:String},
        bankDetail:{type:String},
        upiId:{type:String},
        _userId:{type: Schema.Types.ObjectId, ref: 'UserReg'}
        // 
    },
    {
        collection: 'Company'
 })

 module.exports=mongoose.model('Company',Company);
