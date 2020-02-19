const mongoose=require('../models/connection');

var Schema=mongoose.Schema;
var ResultSchema=new Schema({
    'totalscore':{type:String,required:true},
    'answerarr':{type:Array,required:true},
    'rightanswer':{type:Array,required:true},
    'authoruser':{type:mongoose.Schema.Types.ObjectId,ref:'UserCollection'},
    'status':{type:String,default:'attempted'},
    'testcode':{type:String,required:true,unique:true},
    'email':{type:String,required:true},
    'rightanswerstudent':{type:Array,required:true},
    'wronganswerstudent':{type:Array,required:true}
})

const ResultCollection=mongoose.model('results',ResultSchema);
module.exports=ResultCollection;