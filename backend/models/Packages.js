const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Packages = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: {
    type: String,
    required:[true,'Please enter Title']
  },
  category:{
      type:String,
      required:[true,'Please enter Category']
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
}, {
    collection: 'packages'
  })
module.exports = mongoose.model('Packages', Packages)
