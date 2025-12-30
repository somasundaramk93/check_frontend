const { name } = require('ejs');
const mongoose=require('mongoose');
const studentSchema=new mongoose.Schema(
{
    name:String,
    age:Number
}
)
const studentmodel=mongoose.model("students",studentSchema)
module.exports=studentmodel;