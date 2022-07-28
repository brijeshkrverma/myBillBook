const mongoose=require('mongoose');
var Schema=mongoose.Schema;

var Example=new Schema({
    userid:{
        type:String
    }
})

module.exports=mongoose.model('Example',Example);

// https://www.oyorooms.com/
// search?location=Around%20me&latitude=26.8466937&longitude=80.946166&city=&
// coupon=&checkin=14%2F04%2F2022&checkout=15%2F04%2F2022&
// roomConfig%5B%5D=2&showSearchElements=false&
// searchType=locality&guests=2&rooms=1