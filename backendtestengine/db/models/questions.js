const mongoose=require('../models/connection');

var Schema=mongoose.Schema;
var QuestionSchema=new Schema({
    'desc':{type:String,required:true},
    'options':{type:Array,required:true},
    'rightanswer':{type:String,required:true},
    'test':{type:String,required:true},
    // 'authortest':{type:mongoose.Schema.Types.ObjectId,ref:'TestCollection',required:true},
    'uid':{type:String,required:true},
    'score':{type:Number,required:true}
})
const QuestionCollection=mongoose.model('questions',QuestionSchema);
module.exports=QuestionCollection;