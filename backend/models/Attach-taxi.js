const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Attach_texi = new Schema({
    name:{type:String},
    mobile:{type:String},
    email:{type:String},
    address:{type:String},
    city:{type:String},
    state:{type:String},
    postal:{type:String},
    vender:{type:String},
    NoOfVehical:{type:String}
},{
    collection:'AttachTexi'
})

module.exports=mongoose.model('AttachTexi',Attach_texi);