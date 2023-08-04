const mongoose=require('mongoose');

var schema=new mongoose.Schema({
    courses:[String],
    value:{
        type: String
    }
    
 
    
})

const selectedCourses=mongoose.model('slected',schema)

module.exports=selectedCourses;