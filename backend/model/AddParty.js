const mongoose=require('mongoose');
var Schema=mongoose.Schema;


const AddParty=new Schema({

    partyName:{type:String},
    mobile:{type:String},
    email:{type:String},
    openBalance:{type:Number},
    balanceType:{type:String},//to collect or to pay
    partyType:{type:String},
    partyCategory:{type:String},
    gstin:{type:String},
    pan:{type:String},
    placeOfSupply:{type:String},
    billAdr:{type:String},
    shippingAdr:{type:String},
    creditPeriod:{type:String},
    creditLimit:{type:Number},
    _userId:{type: Schema.Types.ObjectId, ref: 'UserReg'}

},
{
    collection:'AddParty'
})


module.exports=mongoose.model('AddParty',AddParty);