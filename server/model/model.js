const mongoose=require('mongoose');

var schema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    roll:{

        type:String,
        required:true,
        unique:true
        

    },
    department:{
        type:String,
        require:true,
    },
    year:{
        type:String,
        require:true,
    },
    password:{

        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true
    }
 
    
})

const Slotdb=mongoose.model('student',schema)

module.exports=Slotdb;