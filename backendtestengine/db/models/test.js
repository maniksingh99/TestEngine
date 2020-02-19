const mongoose=require('../models/connection');

var Schema=mongoose.Schema;
var TestSchema=new Schema({
    'testername':{type:String,required:true},
    'testname':{type:String,required:true},
    'testcode':{type:String,required:true,unique:true},
    'testduration':{type:Number,required:true},
    'uid':{type:String,required:true},
    'authoruser':{type:mongoose.Schema.Types.ObjectId,ref:'UserCollection'}
})

const TestCollection=mongoose.model('tests',TestSchema);
module.exports=TestCollection;