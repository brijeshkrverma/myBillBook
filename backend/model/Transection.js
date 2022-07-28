const mongoose=require('mongoose');
const Schema=mongoose.Schema;

var Transection=new Schema({
    date:{type:String},
    partyName:{type:String},
    type:{type:String},
    payment:{type:Number},
    _partyId:{type:Schema.Types.ObjectId, ref: 'AddParty'},
    _userId:{type: Schema.Types.ObjectId, ref: 'UserReg'}
},{
    collection:'Transection'
})

module.exports=mongoose.model('Transection',Transection);