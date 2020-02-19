const UserCollection=require('../models/user');
const bcrypt=require('bcrypt');
const jwt=require('../../utils/jwt');
const saltRounds=10;
const userOperations={
    add(userObject,res){
        var password=userObject.password;
        console.log('Password is ',password);
        var hash=bcrypt.hashSync(userObject.password,saltRounds);
        console.log('Hash is ',hash);
        userObject.password=hash
        UserCollection.create(userObject,(err)=>{
            if(err){
                res.send('Error during add');
                console.log('Error during Add ',err);
            }
            else{
                res.send('Record Added...');
            }
        })
    },

    search(userObject,res){
        UserCollection.findOne({'userid':userObject.userid},(err,doc)=>{
            if(err){
                res.send('Something Went Wrong');
                console.log('Error During User Search',err);
            }
            else if(doc){
                let result=bcrypt.compareSync(userObject.password,doc.password);
                // console.log('Result is ',result);
                // res.send(result);
                if(result){
                    // var token=jwt.generateToken(userObject.userid);
                    // res.send('Token is ',token);
                    res.send('Record Founded');
                }
                else{
                    res.send('Invalid Userid or Password');
                }
                
            }
            else{
                res.send('Invalid userid or password');
            }
        })
    }
}

module.exports=userOperations;