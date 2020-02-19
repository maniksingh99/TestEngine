const QuestionCollecton=require('../models/questions');

const questionOperations={
    add(questionObj,res){
        QuestionCollecton.create(questionObj,(err)=>{
            if(err){
                res.send('Error while adding Question');
                console.log('Error in adding Question in question operation ',err);
            }
            else{
                res.send('Question added Successfully');
            }
        })
    },
    delete(questionId,res){
        QuestionCollecton.deleteOne({uid:questionId},(err)=>{
            if(err){
                res.send('Record Does Not Exist');
                console.log('Record does Not Exist');
            }
            else{
                res.send('Record Deleted Successfully');
            }
        })
    },
    update(questionId,questionObj,res){
        QuestionCollecton.updateOne({"uid":questionId},{$set:questionObj},(err)=>{
            if(err){
                res.send('Error while updating');
                console.log('Error while updating ',err);
            }
            else{
                res.send('Record Updated');
            }
        })
    }
}

module.exports=questionOperations;