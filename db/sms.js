const mongoose=require('mongoose');

let smsSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    phNo:{
        type:String,
        required:true
    },
    otp:{
        type:String,
        required:true
    },
    isSent:{
        type:Boolean,
        default:false,
        required:false
    },
    time:{
        type:String,
        required:true
    }

})

module.exports=mongoose.model('otpsms',smsSchema);