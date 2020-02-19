const express=require('express');
const UserCollection=require('../db/models/user');
const TestCollection=require('../db/models/test');
const QuestionCollection=require('../db/models/questions');
const ResultCollection=require('../db/models/result');
const nodemailer = require("nodemailer");

const route=express.Router();

//Login and Register routes
route.post('/register',(req,res)=>{
    var userObject=req.body;
    const userOperations=require('../db/helpers/useroperations');
    userOperations.add(userObject,res);
})

route.post('/doLogin',(req,res)=>{
    var userObject=req.body;
    const userOperations=require('../db/helpers/useroperations');
    userOperations.search(userObject,res);
})

route.get('/user/find/:userid',(req,res)=>{
    var userid=req.params.userid;
    UserCollection.findOne({userid:userid},(err,data)=>{
        if(err){
            console.log('Error in finding user');
            res.send('User Not found');
        }
        else{
            console.log('DATA Of user found is',data);
            res.send(data);
        }
    })
})

//question CRUD routes
route.post('/question/add',(req,res)=>{
    var questionObj=req.body;
    const questionOperations=require('../db/helpers/questionoperations');
    questionOperations.add(questionObj,res);
})

route.delete('/question/delete/:uid',(req,res)=>{
    var questionId=req.params.uid;
    const questionOperations=require('../db/helpers/questionoperations');
    questionOperations.delete(questionId,res);
})

route.post('/question/update/:uid',(req,res)=>{
    var questionId=req.params.uid;
    var questionObj={desc:'',options:[],rightanswer:'',score:''}
    questionObj={
        desc:req.body.desc,
        options:req.body.options,
        rightanswer:req.body.rightanswer,
        score:req.body.score
    }
    console.log('The Value of question object ',this.questionObj)
    var questionOperations=require('../db/helpers/questionoperations');
    questionOperations.update(questionId,questionObj,res);
})

route.get('/question/find/:testcode',(req,res)=>{
    var testcode=req.params.testcode;
    QuestionCollection.find({test:testcode},(err,data)=>{
        if(err){
            console.log('Error in finding test details');
            res.send('Test Details not found');
        }
        else{
            console.log('Test Details found',data);
            res.send(data);
        }
    })

})

//Test CRUD Routes
route.post('/test/add',(req,res)=>{
    var testObj=req.body;
    const testOperations=require('../db/helpers/testoperations');
    testOperations.add(testObj,res);
})

route.post('/test/update/:uid',(req,res)=>{
    var testId=req.params.uid;
    var testObj={
        testername:req.body.testername,
        testname:req.body.testname,
        testcode:req.body.testcode,
        testduration:req.body.testduration
    }
    var testOperations=require('../db/helpers/testoperations');
    testOperations.update(testId,testObj,res);
})

// route.get('/test/find/:testcode',(req,res)=>{
//     var testcode=req.params.testcode;
//     TestCollection.findOne({testcode:testcode},(err,data)=>{
//         if(err){
//             console.log('Error in finding test details');
//             res.send('test details not found');
//         }
//         else{
//             console.log('data of test is ',data);
//             res.send(data);
//         }
//     })
// })

route.get('/test/find/:id',(req,res)=>{
    var id=req.params.id;
    TestCollection.find({authoruser:id},(err,data)=>{
        if(err){
            console.log('Error in finding test details');
            res.send('Test Details not found');
        }
        else{
            console.log('Test details found',data);
            res.send(data);
        }
    })
})
route.get('/test/find',(req,res)=>{
    TestCollection.find({},(err,data)=>{
        if(err){
            console.log('Error in finding test details');
            res.send('Test Details not found');
        }
        else{
            console.log('Test details found',data);
            res.send(data);
        }
    })
})

//result routes
route.post('/result/add',(req,res)=>{
    var resultObj=req.body;
    const resultOperations=require('../db/helpers/resultoperations');
    resultOperations.add(resultObj,res);
    console.log(req.body);
    console.log('Email id is ',resultObj.email);
    const output=`
    <h5>Total score is:${resultObj.totalscore}</h3>
    `;
    let transporter = nodemailer.createTransport({
        service:'Gmail',
        auth: {
          user: 'xxxx', // generated ethereal user
          pass: 'xxxx' // generated ethereal password
        }
      });
    
      // send mail with defined transport object
      let info =  transporter.sendMail({
        from: '"xxxx" xxxx', // sender address
        to: resultObj.email, // list of receivers
        subject: "Total score secured in the online test", // Subject line
        text: "Hello world?", // plain text body
        html: output // html body
      });
    
      console.log("Message sent: %s", info.messageId);
      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
    
      // Preview only available when sending through an Ethereal account
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
      // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
})

route.post('/result/find/:testcode',(req,res)=>{
    var testcode=req.params.testcode;
    const resultOperations=require('../db/helpers/resultoperations');
    resultOperations.search(testcode,res);
})

route.get('/result/find/:userid',(req,res)=>{
    var userid=req.params.userid;
    ResultCollection.find({authoruser:userid},(err,data)=>{
        if(err){
            console.log('Error in finding result details');
            res.send('Result Details not found');
        }
        else{
            console.log('Result details found',data);
            res.send(data);
        }
    })
})

module.exports=route;