import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {CreateTest} from './components/CreateTest';
import CreateQuestions from './components/CreateQuestions';
import {Register} from './components/Register';
import {Login} from './components/Login';
import {Navbar} from './components/Navbar';
import DisplayQuestions from './components/DisplayQuestions';
import axios from 'axios';
import {Switch,Route} from 'react-router-dom';
import {withRouter} from 'react-router-dom';
import {addTestActionCreator} from './models/actioncreators/actioncreator';
import {addQuestionActionCreator} from './models/actioncreators/actioncreator';
import {addOptionActionCreator} from './models/actioncreators/actioncreator';
import {addTestDetailsBackActionCreator} from './models/actioncreators/actioncreator';
import {addQuestionBackActionCreator} from './models/actioncreators/actioncreator';
import {clearQuestionActionCreator} from './models/actioncreators/actioncreator';
import {deleteQuestionActionCreator} from './models/actioncreators/actioncreator';
import {deleteOptionActionCreator} from './models/actioncreators/actioncreator';
import {editQuestionActionCreator} from './models/actioncreators/actioncreator';
import {updateQuestionActionCreator} from './models/actioncreators/actioncreator';
import {addAttemptedTestDetailActionCreator} from './models/actioncreators/actioncreator';
import {store} from './models/store';
import uuid from 'uuid';
import ProfileTeacher from './components/ProfileTeacher';
import DisplayTest from './components/DisplayTest';
import DisplayProfileQuestion from './components/DisplayProfileQuestion';
import ProfileStudent from './components/ProfileStudent';
import EditQuestion from './components/EditQuestion';
import StudentTest from './components/StudentTest';
import { Result } from './components/Result';
import PreviewTest from './components/PreviewTest';


class App extends React.Component{
  constructor(){
    super();
    this.user={};
    this.testDetails={authoruser:'',uid:uuid()};//object to store the details of test in frontend
    this.testDetailsBackendArr=[];//object to store the test details from backend
    this.questionDetailsBackendArr=[];//Array to store the questions from backend
    this.showPage=false;
    this.question={options:[],uid:uuid(),test:''};//object which contains question
    this.optionsForQuestion=[];//to push the options into an array in frontend
    this.option='';//to take input form text field
    this.designation=['','Student','Teacher'];
    this.changeView='LoginAndRegister';
    this.userBackend={};
    this.loginMsg='';
    this.score='';
    this.username='';
    this.testcode='';
    this.designationBack='';
    this.questionEdit={};
    this.studentQuestionEle={desc:'',options:[],rightanswer:'',score:''};
    this.val=0;
    this.answer={};
    this.answerArr=[];
    this.rightAnswer=[];
    this.scoreArr=[];
    this.totalScore=0;
    this.testDuration='';//variable to store the time for the test
    this.testDurationObj={};
    this.totalQuestionNo='';//to disable the next button
    this.resultObj={totalscore:'',answerarr:[],rightanswer:[],authoruser:'',testcode:'',email:'',rightanswerstudent:[],wronganswerstudent:[]};//an object to store the result of student at backend
    this.attemptedTest=[];
    this.testCodeForResult='';
    this.tempArr=[];
    this.keysAnswerArr=[];
    this.num='';
    this.email='';
    this.chartData={};
    this.wrongAnswerStudent=[];
    this.rightAnswerStudent=[];
    this.option={};
    this.state={
      showPage:this.showPage,
      changeView:this.changeView,
      optionsForQuestion:this.optionsForQuestion,
      score:this.score,
      username:this.username,
      studentQuestionEle:this.studentQuestionEle,
      val:this.val,
      testDurationObj:this.testDurationObj,
      testDuration:this.testDuration,
      totalScore:this.totalScore,
      chartData:this.chartData,
      option:this.option
    }
  }

  userInput(event){
    var key=event.target.id;
    var value=event.target.value;
    this.user[key]=value;
  }

  createTestInput(event){
    var key=event.target.id;
    var value=event.target.value;
    this.testDetails[key]=value;
  }

  takeOptions(event){
    var value=event.target.value;
    this.option=value;
    //console.log('The option is ',this.option);
  }

  takeQuestionDesc(event){
    var key=event.target.id;
    var value=event.target.value;
    this.question[key]=value;
    this.score=this.question.score;
    this.setState({score:this.score})
  }

  editTakeQuestionDesc(event){
    var key=event.target.id;
    var value=event.target.value;
    this.questionEdit[key]=value;
    this.score=this.questionEdit.score;
    this.setState({score:this.score})
  }
  
  takeStudentTestOptions(event){
    var key=event.target.id;
    var value=event.target.value;
    this.answer[key]=value;
    console.log('Value of value is  ',value);
    // this.answerArr.push(this.answer[key]);
    // console.log('The value of key is ',key);
    //console.log('The value is ',this.answer[key]);
    console.log('The value of answer is ',this.answer);
    // console.log('The value of answerArr is ',this.answerArr);
    // this.answer={};
  }
  //code to add the testdetails in frontend array and in backend
  addTest(){
    this.testDetails.authoruser=this.userBackend._id;
    this.testDetails.testername=this.username;
    this.testcode=this.testDetails.testcode;
    console.log('Add call for testdetails',this.testDetails);
    if(this.testDetails.testername!==undefined && this.testDetails.testname!==undefined && this.testDetails.testcode!==undefined 
      && this.testDetails.testduration!==undefined){
      var action=addTestActionCreator(this.testDetails,'pushTest');
      store.dispatch(action);
    }
    axios.post('http://localhost:1234/test/add',this.testDetails)
    .then(res=>{
      console.log(res.data);
    })
    this.changePage(this.testDetails);
    this.testDetails={uid:uuid(),authorUser:''}
    // this.toFindTest();
  }

  //code to add test details of a particular user from backend
  addTestDetailsBack(testEle){
    console.log('unattempted test element ',testEle);
    var action=addTestDetailsBackActionCreator(testEle,'pushTestEle');
    store.dispatch(action);
  }

  //code to add attempted test in reducer
  addAttemptedTestDetails(testEle){
    console.log('attempted test element ',testEle);
    var action=addAttemptedTestDetailActionCreator(testEle,'attemptedTestEle');
    store.dispatch(action);
  }

  //code to add questions for a particular test from backend to frontend
  addQuestionBack(questionEle){
    var action=addQuestionBackActionCreator(questionEle,'pushQuestionEle');
    store.dispatch(action);
  }

    //code to clear question that are displayed in profile 
    clearQuestion(){
      var action=clearQuestionActionCreator('clearQuestion');
      store.dispatch(action);
      if(this.designationBack==='Teacher'){
        this.changeView='DisplayTest';
        this.setState({changeView:this.changeView});
      }
      else if(this.designationBack==='Student'){
        this.changeView='ProfileStudent';
        this.setState({changeView:this.changeView});
      }
    }


  //code to add question in backend and in the array in frontend
  addQuestion(){
    this.question.options=this.optionsForQuestion;
    this.question.test=this.testcode;
    console.log('Add call to add question ',this.question);    
    if(this.question.desc!==undefined && this.question.options!==undefined && this.question.rightanswer!==undefined &&this.question.score!==undefined){
      var action=addQuestionActionCreator(this.question,'pushQuestion');
      store.dispatch(action);
      axios.post('http://localhost:1234/question/add',this.question)
      .then(res=>{
        console.log(res.data);
      })
      this.optionsForQuestion=[];
      this.setState({optionsForQuestion:this.optionsForQuestion})
    }
    else{
      alert('Enter All the Fields');
    }
    this.question={options:[],uid:uuid(),test:''};
    // this.optionsForQuestion=[];
    // this.setState({optionsForQuestion:this.optionsForQuestion})
    console.log('THe value of options For Question array is ',this.optionsForQuestion);
  }

  //code to delete a particular question
  deleteQuestion(obj){
    console.log('The object to be deleted is .....',obj);
    var action=deleteQuestionActionCreator(obj,'deleteQuestion');
    store.dispatch(action);
    axios.delete('http://localhost:1234/question/delete/'+obj.uid)
    .then(res=>console.log(res.data));
  }

  //code invoked on click of edit button
  editQuestion(obj){
    this.questionEdit=obj;
    console.log('The question to be edited is ',this.questionEdit);
    this.optionsForQuestion=obj.options;
    this.score=obj.score;
    console.log('OPtions for question during click of edit button are ',this.optionsForQuestion);
    var action=editQuestionActionCreator(this.questionEdit,'questionToBeEdited');
    store.dispatch(action);
    this.changeView='EditQuestion';
    this.setState({changeView:this.changeView});
  }

  //code to update a particular question
  updateQuestion(){
    this.questionEdit.options=this.optionsForQuestion;
    var action=updateQuestionActionCreator(this.questionEdit,'updateQuestion');
    store.dispatch(action);
    axios.post('http://localhost:1234/question/update/'+this.questionEdit.uid,this.questionEdit)
    .then(res=>console.log(res.data));
    this.optionsForQuestion=[];
    this.setState({optionsForQuestion:this.optionsForQuestion})
  }

//codes to load a different component on click of button
  diplayQuestion(){
    this.changeView='DisplayQuestion';
    this.setState({changeView:this.changeView})
  }

  backToCreateQuestion(){
    this.changeView='Student';
    this.setState({changeView:this.changeView})
  }

  displayProfileTeacher(){
    this.changeView='ProfileTeacher';
    this.setState({changeView:this.changeView})
  }

  changePage(testDetails){
    if(testDetails.testername!==undefined && testDetails.testname!==undefined && testDetails.testcode!==undefined && 
      testDetails.testduration!==undefined){
      this.changeView='Student';
    }
    else{
      alert('Enter All the Fields');
    }
    this.setState({changeView:this.changeView})
    console.log('Value of change view object ',this.changeView);
  }

  changeToTest(){
    this.changeView='Test';
    this.setState({changeView:this.changeView});
  }
  
  changeToProfile(){
    this.changeView='ProfileTeacher';
    this.setState({changeView:this.changeView});
  }

  changeToDisplayTest(){
    this.changeView='DisplayTest';
    this.setState({changeView:this.changeView});
  }

  changeToDisplayProfileQuestion(){
    this.changeView='DisplayProfileQuestion';
    this.setState({changeView:this.changeView});
  }

  // displayStudentTest(){
  //   this.changeView='StudentTest';
  //   this.setState({changeView:this.changeView});
  // }


  //to add options of array in frontend array
  addOptions(){
    this.optionsForQuestion.push(this.option);
    this.setState({optionsForQuestion:this.optionsForQuestion})
    console.log('The array of options is ',this.optionsForQuestion);
    console.log('To add options for question',this.option);
    var action=addOptionActionCreator(this.option,'pushOption');
    store.dispatch(action);
    this.option='';
  }
  
  //to delete an option
  deleteOptions(obj){
    this.optionsForQuestion=this.optionsForQuestion.filter(ele=>ele!==obj);
    this.setState({optionsForQuestion:this.optionsForQuestion});
    var action=deleteOptionActionCreator(obj,'deleteOption');
    store.dispatch(action);
  }




  register(){
    if(this.user.firstname!==undefined && this.user.lastname!==undefined && this.user.userid!==undefined
       && this.user.designation!==undefined && this.user.password!==undefined && this.user.email!==undefined){
        axios.post('http://localhost:1234/register',this.user)
        .then(res=>{
          console.log(res.data); 
          alert('You Have Registered Successfully');
        })
       }
       else{
         alert('Enter All the fields');
       }
  }

  login(){
    axios.post('http://localhost:1234/doLogin',this.user)
    .then(res=>{
      console.log(res.data);
      this.loginMsg=res.data;
      if(res.data==='Record Founded'){
        this.userFind();
      }
    })
    //this.userFind();
  }
  
  userFind(){
    axios.get('http://localhost:1234/user/find/'+this.user.userid)
    .then(res=>{
      console.log(res.data);
      this.userBackend=res.data;
      this.username=this.userBackend.firstname;
      this.designationBack=this.userBackend.designation;
      this.email=this.userBackend.email;
      this.setState({username:this.username});
      console.log('Userid from Backend ',this.userBackend.userid);
      console.log('Userid from frontend is ',this.user.userid);
      //this.user.userid===this.userBackend.userid && this.user.userid!==undefined && this.user.password!==undefined &&
      if(this.designationBack==='Teacher'){
        this.changeView='ProfileTeacher';
        this.setState({changeView:this.changeView})
        setTimeout(()=>{this.toFindTest()},100);
      }
      else if(this.designationBack==='Student'){
        this.changeView='ProfileStudent';
        this.setState({changeView:this.changeView})
        //this.toFindQuestionStudent();
        setTimeout(()=>{this.toFindTestStudent()},100);
      }
      else{
        alert(this.loginMsg);
      }
    })
  }

    //to fetch the details of test from backend
    toFindTest(){
      axios.get('http://localhost:1234/test/find/'+this.userBackend._id)
      .then(res=>{
        console.log(res.data);
        this.testDetailsBackendArr=res.data;
        console.log('Test details are.........',this.testDetailsBackendArr);
        let num=res.data.length;
        console.log('Value of num is ',num);
        for(let i=0;i<num;i++){
          let testEle={testname:'',testcode:'',testduration:''};
          testEle.testname=this.testDetailsBackendArr[i].testname;
          testEle.testcode=this.testDetailsBackendArr[i].testcode;
          testEle.testduration=this.testDetailsBackendArr[i].testduration;
          this.addTestDetailsBack(testEle);
        }
      })
   }

   toFindTestStudent(){
    axios.get('http://localhost:1234/result/find/'+this.userBackend._id)
    .then(res=>{
      console.log(res.data);
      this.attemptedTest=res.data;
      console.log('Attempted test are in app.js',this.attemptedTest);     
    })
    setTimeout(()=>{
    axios.get('http://localhost:1234/test/find')
    .then(res=>{
      console.log(res.data);
      this.testDetailsBackendArr=res.data;
      console.log('Test details are in app.js',this.testDetailsBackendArr);
      let num=this.testDetailsBackendArr.length;
      let num1=this.attemptedTest.length;
      this.tempArr=this.testDetailsBackendArr.filter((ele)=>{
        return !this.attemptedTest.find((y)=>{
          return ele.testcode===y.testcode
        })
      })
      let num2=this.tempArr.length;
      console.log('Value of num1',num1);
      console.log('Value of num is ',num);
      console.log('Value of num2',num2)
      if(num1===0){
        for(let i=0;i<num;i++){
          let testEle={testname:'',testcode:'',testduration:''};
          testEle.testname=this.testDetailsBackendArr[i].testname;
          testEle.testcode=this.testDetailsBackendArr[i].testcode;
          testEle.testduration=this.testDetailsBackendArr[i].testduration;
          this.addTestDetailsBack(testEle);
        }
      }
      else if(num1>0){
        for(let i=0;i<num;i++){
          for(let j=0;j<num1;j++){
            if(this.attemptedTest[j].testcode===this.testDetailsBackendArr[i].testcode){
              let testEle={testname:'',testcode:'',testduration:''};
              testEle.testname=this.testDetailsBackendArr[i].testname;
              testEle.testcode=this.testDetailsBackendArr[i].testcode;
              testEle.testduration=this.testDetailsBackendArr[i].testduration;
              this.addAttemptedTestDetails(testEle);
            }
          }
        }
        for(let k=0;k<num2;k++){
          let testEle={testname:'',testcode:'',testduration:''};
          testEle.testname=this.tempArr[k].testname;
          testEle.testcode=this.tempArr[k].testcode;
          testEle.testduration=this.tempArr[k].testduration;
          this.addTestDetailsBack(testEle);
        }
      }
    })
    },90)
    
   }
    //to fetch the questions from backend for the student to give test
    toFindQuestion(ele){
      this.testDuration=ele.testduration*60;
      this.testCodeForResult=ele.testcode;
      console.log('the duration of test is ',this.testDuration);
      axios.get('http://localhost:1234/question/find/'+ele.testcode)
      .then(res=>{
        console.log(res.data);
        this.questionDetailsBackendArr=res.data;
        console.log('QUESTIONS from backend.....',this.questionDetailsBackendArr);
        let num=res.data.length;
        for(let i=0;i<num;i++){
          this.answer[i]='Not Answered';
        }
        console.log('The answer object is ',this.answer);
        this.totalQuestionNo=num;
        console.log('Value of num is',num);
          for(let i=0;i<num;i++){
            let questionEle={desc:'',options:[],rightanswer:'',score:''};
            questionEle.desc=this.questionDetailsBackendArr[i].desc;
            questionEle.options=this.questionDetailsBackendArr[i].options;
            questionEle.rightanswer=this.questionDetailsBackendArr[i].rightanswer;
            questionEle.score=this.questionDetailsBackendArr[i].score;
            this.rightAnswer.push(this.questionDetailsBackendArr[i].rightanswer);//for comparing the right answer this array is created
            this.scoreArr.push(this.questionDetailsBackendArr[i].score);//for comapring the score array is created
            console.log('This is rightanswer array ',this.rightAnswer);
            console.log('The ScoreArr is ',this.scoreArr);
            if(i===0){
              this.studentQuestionEle.desc=this.questionDetailsBackendArr[i].desc;
              this.studentQuestionEle.options=this.questionDetailsBackendArr[i].options;
              this.studentQuestionEle.rightanswer=this.questionDetailsBackendArr[i].rightanswer;
              this.studentQuestionEle.score=this.questionDetailsBackendArr[i].score;
            }
            this.addQuestionBack(questionEle);
          }
          this.changeView='StudentTest';
          this.setState({changeView:this.changeView});
        // setTimeout(()=>{this.changeToDisplayProfileQuestion()},900);
      })
      this.startTimer();
    }

    //to find the question from backend so that the teacher can see the question added by him in the test
    toFindQuestionTeacher(ele){
      console.log('The testcode to fetch the question for teacher is',ele.testcode);
      axios.get('http://localhost:1234/question/find/'+ele.testcode)
      .then(res=>{
        console.log(res.data);
        this.questionDetailsBackendArr=res.data;
        console.log('QUESTIONS from backend.....',this.questionDetailsBackendArr);
        let num=res.data.length;
        for(let i=0;i<num;i++){
          let questionEle={desc:'',options:[],rightanswer:'',score:''};
          questionEle.desc=this.questionDetailsBackendArr[i].desc;
          questionEle.options=this.questionDetailsBackendArr[i].options;
          questionEle.rightanswer=this.questionDetailsBackendArr[i].rightanswer;
          questionEle.score=this.questionDetailsBackendArr[i].score;
          this.addQuestionBack(questionEle);
        }
      })
      this.changeView='DisplayProfileQuestion';
      this.setState({changeView:this.changeView});
    }

    toFindQuestionToPreviewStudent(ele){
      console.log('The testcode to fetch the question for teacher is',ele.testcode);
      axios.post('http://localhost:1234/result/find/'+ele.testcode)
      .then(res=>{
        console.log(res.data);
        var value=res.data;
        console.log('Value of value variable is.................',value);
        this.totalScore=value[0].totalscore;
        this.answerArr=value[0].answerarr;
        this.rightAnswerStudent=value[0].rightanswerstudent;
        this.wrongAnswerStudent=value[0].wronganswerstudent;
        console.log('the value of answer arr is ',this.answerArr);
      })
      setTimeout(()=>{
        axios.get('http://localhost:1234/question/find/'+ele.testcode)
        .then(res=>{
          console.log(res.data);
          this.questionDetailsBackendArr=res.data;
          console.log('QUESTIONS from backend.....',this.questionDetailsBackendArr);
          let num=res.data.length;
          var num1=this.rightAnswerStudent.length;
          var num2=this.wrongAnswerStudent.length;
          this.chartData={
            labels:['Total Questions','Right Answer','Wrong Answer'],
            datasets:[
              {
                label:['Total','Right','Wrong'],
                data:[num,num1,num2],
                backgroundColor:['rgba(255, 99, 132, 0.6)','rgba(54, 162, 235, 0.6)','rgba(255, 206, 86, 0.6)',]
              }
            ]
          }
          this.option={
            options: {
              scales: {
                  yAxes: [{
                      ticks: {
                          beginAtZero: true
                      }
                  }]
              }
          }
          }
          this.setState({chartData:this.chartData,option:this.option});
          for(let i=0;i<num;i++){
            let questionEle={desc:'',options:[],rightanswer:'',score:'',answer:''};
            questionEle.desc=this.questionDetailsBackendArr[i].desc;
            questionEle.options=this.questionDetailsBackendArr[i].options;
            questionEle.rightanswer=this.questionDetailsBackendArr[i].rightanswer;
            questionEle.score=this.questionDetailsBackendArr[i].score;
            questionEle.answer=this.answerArr[i];
            this.addQuestionBack(questionEle);
          }
        })
      },90)

      this.changeView='PreviewTest';
      this.setState({changeView:this.changeView});
    }


    toFindQuestionStudent(val,value){
      this.studentQuestionEle={};
      this.num=this.questionDetailsBackendArr.length;
      // for(let i=0;i<this.num;i++){
      //   this.answer["studentanswer"+{i}]='Not Answered';
      // }
      // console.log('The answer object is ',this.answer);
      console.log('Value of num in app.js is  ',this.num);
      if(val>=0 && val<=this.num){
        for(let i=val;i<this.num;){
          this.studentQuestionEle.desc=this.questionDetailsBackendArr[i].desc;
          this.studentQuestionEle.options=this.questionDetailsBackendArr[i].options;
          this.studentQuestionEle.rightanswer=this.questionDetailsBackendArr[i].rightanswer;
          this.studentQuestionEle.score=this.questionDetailsBackendArr[i].score;
          console.log('The value of the question to be printed is ',this.studentQuestionEle);
          // i=val;
          if(value==='increase'){
            this.val=this.val+1;
            this.setState({studentQuestionEle:this.studentQuestionEle,val:this.val});
            break;
          }
          else if(value==='decrease'){
            this.val=this.val-1;
            this.setState({studentQuestionEle:this.studentQuestionEle,val:this.val});
            break;
          }
        }
      }
    }

    testComplete(){
      this.answerArr=Object.values(this.answer);
      //this.keysAnswerArr=Object.keys(this.answer);
      // for(let i=0;i<this.num;i++){
      //   if()
      // }
      //console.log('This keys of answerArr is ',this.keysAnswerArr);
      console.log('The answerArr is ',this.answerArr);
      var num=this.answerArr.length;
      console.log('The value of num is ',num);
      this.changeView='Result';
      //this.testDuration=0;
      this.setState({changeView:this.changeView});
      // var rightAnswerStudent=[];
      // var wrongAnswerStudent=[];
      for(let i=0;i<num;i++){
        if(this.answerArr[i]===this.rightAnswer[i]){
          this.totalScore=this.totalScore+this.scoreArr[i];
          console.log('The value of total score is ',this.totalScore);
          this.rightAnswerStudent.push(this.answerArr[i]);
        }
      }
      this.wrongAnswerStudent=this.answerArr.filter((ele)=>{
        return !this.rightAnswerStudent.includes(ele);
      })

      var num1=this.rightAnswerStudent.length;
      var num2=this.wrongAnswerStudent.length;
      console.log('Value of num1 in testcomplete function  ',num1);
      console.log('Value of num2 in testcomplete function  ',num2);
      this.chartData={
        labels:['Total Questions','Right Answer','Wrong Answer'],
        datasets:[
          {
            label:['Total','Right','Wrong'],
            data:[num,num1,num2],
            backgroundColor:['rgba(255, 99, 132, 0.6)','rgba(54, 162, 235, 0.6)','rgba(255, 206, 86, 0.6)',]
          }
        ]
      }
      this.option={
        options: {
          scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero: true
                  }
              }]
          }
      }
      }
      this.setState({chartData:this.chartData,option:this.option});

      console.log('The right Answer array is ',this.rightAnswerStudent);
      console.log('The wrong Answer array is ',this.wrongAnswerStudent);
      this.setState({totalScore:this.totalScore})
      this.resultObj.totalscore=this.totalScore;
      this.resultObj.answerarr=this.answerArr;
      this.resultObj.rightanswer=this.rightAnswer;
      this.resultObj.authoruser=this.userBackend._id;
      this.resultObj.testcode=this.testCodeForResult;
      this.resultObj.email=this.email;
      this.resultObj.wronganswerstudent=this.wrongAnswerStudent;
      this.resultObj.rightanswerstudent=this.rightAnswerStudent;
      axios.post('http://localhost:1234/result/add',this.resultObj)
      .then(res=>{
        console.log(res.data);
      })
    }

    testTimer(time){
      let hours = Math.floor(time/ (60 * 60));

      let divisor_for_minutes = time % (60 * 60);
      let minutes = Math.floor(divisor_for_minutes / 60);
  
      let divisor_for_seconds = divisor_for_minutes % 60;
      let seconds = Math.ceil(divisor_for_seconds);
  
      let obj = {
          h: hours,
          m: minutes,
          s: seconds
      };
      this.testDurationObj=obj;
      // this.setState({testDurationObj:this.testDurationObj});
      //console.log('The value of time object is ',this.testDurationObj);
      //this.startTimer();
      return obj;
    }

    // componentDidMount(){
    //   let timeLeft=this.testTimer(this.testDuration);
    //   this.setState({testDurationObj:timeLeft});
    //   // this.startTimer();
    // }

    startTimer(){

        var interval=setInterval(()=>{
          if(this.testDuration>0){
            this.testDuration=this.testDuration-1;
            this.setState({testDurationObj:this.testTimer(this.testDuration),testDuration:this.testDuration})
          }
          else if(this.testDuration===0){
            this.testComplete();
            clearInterval(interval);
          }
        },1000);

    }

    // countDown(){
    //   this.testDuration=this.testDuration-1;
    //   this.setState({testDurationObj:this.testTimer(this.testDuration),testDuration:this.testDuration})
    //   // this.testTimer(this.testDuration);
    //   if(this.testDuration===0){
    //     clearInterval(this.testDuration);
    //   }
    // }
//Code to open a page on click of a button 
  // viewRegister(){
  //   this.setState({showPage:true})
  // }


  render(){
    if(this.state.changeView==='LoginAndRegister'){
      return(
        <div className='container'>
        <Navbar/>
        <hr/>
        <Switch>
          <Route exact path="/" render={()=><Register register={this.register.bind(this)} userInput={this.userInput.bind(this)} 
          designation={this.designation}/>}/>
          <Route path="/login" render={()=><Login userInput={this.userInput.bind(this)} login={this.login.bind(this)}/>}/>
        </Switch>
        </div>
      )
    }
    else if(this.state.changeView==='ProfileTeacher' && this.designationBack==='Teacher'){
      return(
        <div className='container'>
          <ProfileTeacher userBackend={this.userBackend} changeToTest={this.changeToTest.bind(this)} 
          changeToDisplayTest={this.changeToDisplayTest.bind(this)}/>
        </div>
      )
    }
    else if(this.state.changeView==='Test' && this.designationBack==='Teacher'){
      return(
        <div className='container'>
          <CreateTest createTestInput={this.createTestInput.bind(this)} addTest={this.addTest.bind(this)} username={this.username}
          changeToProfile={this.changeToProfile.bind(this)}/>
        </div>
      )
    }
    else if(this.state.changeView==='Student' && this.designationBack==='Teacher'){
      return(
        <div className='container'>
          <CreateQuestions takeOptions={this.takeOptions.bind(this)} takeQuestionDesc={this.takeQuestionDesc.bind(this)} 
          addOptions={this.addOptions.bind(this)} addQuestion={this.addQuestion.bind(this)} displayQuestion={this.diplayQuestion.bind(this)}
          optionsForQuestion={this.state.optionsForQuestion} score={this.score} deleteOptions={this.deleteOptions.bind(this)} />
        </div>
      )
    }
    else if(this.state.changeView==='DisplayQuestion' && this.designationBack==='Teacher'){
      return(
        <div className='container'>
          <DisplayQuestions backToCreateQuestion={this.backToCreateQuestion.bind(this)} deleteQuestion={this.deleteQuestion.bind(this)}
          editQuestion={this.editQuestion.bind(this)} displayProfileTeacher={this.displayProfileTeacher.bind(this)}/>
        </div>
      )
    }
    else if(this.state.changeView==='DisplayTest' && this.designationBack==='Teacher'){
      return(
        <div className='container'>
          <DisplayTest toFindQuestionTeacher={this.toFindQuestionTeacher.bind(this)} displayProfileTeacher={this.displayProfileTeacher.bind(this)}/>
        </div>
      )
    }

    else if(this.state.changeView==='DisplayProfileQuestion' && this.designationBack==='Teacher'){
      return(
        <div className='container'>
          <DisplayProfileQuestion clearQuestion={this.clearQuestion.bind(this)}/>
        </div>
      )
    }

    else if(this.state.changeView==='ProfileStudent' && this.designationBack==='Student'){
      return(
        <div className='container'>
          <ProfileStudent toFindQuestion={this.toFindQuestion.bind(this)} toFindQuestionToPreviewStudent={this.toFindQuestionToPreviewStudent.bind(this)}/>
        </div>
      )
    }

    else if(this.state.changeView==='EditQuestion' && this.designationBack==='Teacher'){
      return(
        <div className='container'>
          <EditQuestion questionEdit={this.questionEdit} deleteOptions={this.deleteOptions.bind(this)} addOptions={this.addOptions.bind(this)} 
          optionsForQuestion={this.optionsForQuestion} editTakeQuestionDesc={this.editTakeQuestionDesc.bind(this)} score={this.score}
          takeOptions={this.takeOptions.bind(this)} updateQuestion={this.updateQuestion.bind(this)}
          displayQuestion={this.diplayQuestion.bind(this)}/>
        </div>
      )
    }

    else if(this.state.changeView==='StudentTest' && this.designationBack==='Student'){
      return(
        <div className='container'>
        <StudentTest studentQuestionEle={this.studentQuestionEle} toFindQuestionStudent={this.toFindQuestionStudent.bind(this)} val={this.val}
        takeStudentTestOptions={this.takeStudentTestOptions.bind(this)} testComplete={this.testComplete.bind(this)} testDurationObj={this.testDurationObj}
        totalQuestionNo={this.totalQuestionNo}/>
      </div>
      )
    }

    else if(this.state.changeView==='Result'){
      return(
        <div className='container'>
          <Result totalScore={this.totalScore} chartData={this.chartData} option={this.option}/>
        </div>
      )
    }

    else if(this.state.changeView==='PreviewTest'){
      return(
        <div className='container'>
          <PreviewTest clearQuestion={this.clearQuestion.bind(this)} chartData={this.chartData} option={this.option}/>
        </div>
      )
    }

    return(
      <div className='container'>
        {/* <button onClick={()=>{this.viewRegister()}}>Register</button>
        {
          this.state.showPage ? <Register/> : null
        } code to open a page on click of button*/}

      </div>
      
    )
  }
}
export default withRouter(App);