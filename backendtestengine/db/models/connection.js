const mongoose=require('mongoose');
//const config=require('../../utils/config');

//mongoose.connect('mongodb://localhost:27017/testengine');
mongoose.connect('Your mongodb atlas link');
//mongoose.connect(config.dev);
module.exports=mongoose;