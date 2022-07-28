const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserReg=new Schema({
    email:{type:String,unique: true ,required:'Please Enter Your valid Email Id'},
    password:{type:String},
    avatar:{type:String},
    cName:{type:String},
    billAdr:{type:String},
    cPhone:{type:String},
    gst:{type:String},
    pan:{type:String},
    placeOfSupply:{type:String},
    bType:{type:String},
    industryType:{type:String},
    bankDetail:[{
        bName:{type:String},
        acType:{type:String},
        acNo:{type:String},
        ifsc:{type:String}
    }],
    upiId:{type:String},
},{
    collection:'UserReg'
})

module.exports=mongoose.model('UserReg',UserReg);
