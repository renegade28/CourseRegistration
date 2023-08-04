const mongoose=require('mongoose');

var schema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    semester:{

        type:String,
        required:true,
    },
    credit:{

        type:Number,
        required:true,
    },
    title:{
        type:String,
       
    },
    department:{
        type:String,
       
    },

   
})

const coursedb=mongoose.model('courses',schema)

module.exports=coursedb;