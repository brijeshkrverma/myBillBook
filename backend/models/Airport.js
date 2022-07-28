const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Airport = new Schema({
    name: {
        type: String,
        required:[true,'Please enter Title']
      },
      //local or outstation
      type:{
          type:String,
        //   required:[true,'Please enter Category']
      },
      price:{
        type:Number,
      },
      locationTo:{
          type:String,
          required:[true,'Please enter Picup Location']
      },
      locationEnd:{
          type:String,
          required:[true,'Please enter Drop Loaction']
      },
      seats:{type:String},
      bags:{type:String},
      distance:{type:String},
      duretion:{type:String},
      extrakm:{type:String},
      extrahour:{type:String},
      nightprice:{type:String},
      avatar: {
        type: String,
        required:[true,'Please enter Image']
      },
},
{
    collection: 'Airport'
  })
  module.exports = mongoose.model('Airport', Airport)
