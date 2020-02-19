const TestCollection=require('../models/test');

const testOperations={
    add(testObj,res){
        TestCollection.create(testObj,(err)=>{
            if(err){
                res.send('Error While Adding Test Information');
                console.log('Error while adding test information ',err);
            }
            else{
                res.send('Test Information added successfully');
            }
        })
    },
    update(testId,testObj,res){
        TestCollection.updateOne({"uid":testId},{$set:testObj},(err)=>{
            if(err){
                res.send('Error while updating test information');
                console.log('Error while updating test information ',err);
            }
            else{
                res.send('Test Detail updated successfully');
            }
        })
    }
}

module.exports=testOperations;