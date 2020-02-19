const ResultCollection=require('../models/result');

const resultOperations={
    add(resultObj,res){
        ResultCollection.create(resultObj,(err)=>{
            if(err){
                res.send('Error while adding result information');
                console.log('Error while adding result information');
            }
            else{
                res.send('Result information added successfully');
            }
        })
    },
    search(testcode,res){
        ResultCollection.find({testcode:testcode},(err,doc)=>{
            if(err){
                res.send('Something Went Wrong');
                console.log('Attempted test not found');
            }
            else{
                res.send(doc);
            }
        })
    }
}

module.exports=resultOperations;