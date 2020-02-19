export const reducerOperations=(initstate={arrTest:[],arrQuestion:[],arrOption:[],questionEdit:{},attemptedTest:[]},action)=>{
    if(action.type==='pushTest'){
        console.log('the Test detail object is ',action.payload);
        return{...initstate,arrTest:[...initstate.arrTest,action.payload]};
    }

    if(action.type==='pushQuestion'){
        console.log('The desc of question is ',action.payload);
        var options=action.payload.options;
        console.log('Options are.....',options);
        return{...initstate,arrQuestion:[...initstate.arrQuestion,action.payload],options};
    }

    if(action.type==='pushOption'){
        console.log('The option of question is ',action.payload);
        return{...initstate,arrOption:[...initstate.arrOption,action.payload]};
    }

    if(action.type==='pushTestEle'){
        return{...initstate,arrTest:[...initstate.arrTest,action.payload]};
    }

    if(action.type==='pushQuestionEle'){
        var options=action.payload.options;
        console.log('Options Are ...',options);
        return{...initstate,arrQuestion:[...initstate.arrQuestion,action.payload],options}
    }

    if(action.type==='clearQuestion'){
        return{...initstate,arrQuestion:[]}
    }

    if(action.type==='deleteQuestion'){
        var arr=initstate.arrQuestion.filter(ele=>ele!==action.payload);
        return{...initstate,arrQuestion:arr}
    }

    if(action.type==='deleteOption'){
        var arr=initstate.arrOption.filter(ele=>ele!==action.payload);
        return{...initstate,arrOption:arr}
    }

    if(action.type==='questionToBeEdited'){
        return{...initstate,questionEdit:action.payload}
    }

    if(action.type==='updateQuestion'){
        var arr=[];
        arr=initstate.arrQuestion;
        arr.forEach(obj=>{
            if(obj.uid===action.payload.uid){
                obj.desc=action.payload.desc;
                obj.options=action.payload.options;
                obj.rightanswer=action.payload.rightanswer;
                obj.score=action.payload.score;
            }
        })
        return{...initstate,arrQuestion:arr}
    }

    if(action.type==='attemptedTestEle'){
        return{...initstate,attemptedTest:[...initstate.attemptedTest,action.payload]}
    }

    return initstate;
}