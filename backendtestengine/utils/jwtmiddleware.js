const jwt=require('../utils/jwt');

const JWTMiddleware=(req,res,next)=>{
    res.set({"Content-Type":"application/json"});
    var token=req.heders['token'];
    console.log("Inside Middleware ",token);
    var userid=jwt.verifyToken(token);
    try{
        if(userid){
            req.query.userid=userid;
            next();
        }
    }
    catch(error){
        res.send('Invalid Token');
    }
}

module.exports=JWTMiddleware;