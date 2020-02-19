const mongoose=require('../models/connection');

var Schema=mongoose.Schema;
var UserSchema=new Schema({
    'firstname':{type:String,required:true},
    'lastname':{type:String,required:true},
    'userid':{type:String,required:true,unique:true},
    'designation':{type:String,required:true},
    'password':{type:String,required:true},
    'email':{type:String,required:true,unique:true}
})
const UserCollection=mongoose.model('users',UserSchema);
module.exports=UserCollection;