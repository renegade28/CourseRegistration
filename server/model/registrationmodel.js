const mongoose=require('mongoose');

var schema=new mongoose.Schema({

    regstr:{
        type:String,
        Unique:true,
        required:true

    },
    coursename:{
        type:String,
        required:true,
    },
    roll:{

        type:String,
        required:true,
    }
    
},
{timestamps:true,}
)

const registrationdb=mongoose.model('registrations',schema)

module.exports=registrationdb;