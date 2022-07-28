const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Booking = new Schema({

    name:{type:String},
    email:{type:String},
    mobile:{type:String},
    time:{type:String},
    address:{type:String},
    date:{type:String},
    city:{type:String},
    state:{type:String},
    // // carname:{type:String}
}, 
{
    collection: 'Booking'
  })
  module.exports = mongoose.model('Booking', Booking)