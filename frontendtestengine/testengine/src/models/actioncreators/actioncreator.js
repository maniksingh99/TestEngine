export const addTestActionCreator=(obj,opr)=>{
    console.log('Inside test push action creator');
    return{
        payload:obj,
        type:opr
    }
}

export const addQuestionActionCreator=(obj,opr)=>{
    console.log('Inside Question push action creator');
    return{
        payload:obj,
        type:opr
    }
}

export const addOptionActionCreator=(obj,opr)=>{
    console.log('Inside option action creator');
    return{
        payload:obj,
        type:opr
    }
}

export const addTestDetailsBackActionCreator=(obj,opr)=>{
    console.log('Inside backend test details action creator');
    return{
        payload:obj,
        type:opr
    }
}

export const addQuestionBackActionCreator=(obj,opr)=>{
    console.log('Inside to add questions from backend into reducer array');
    return{
        payload:obj,
        type:opr
    }
}

export const clearQuestionActionCreator=(opr)=>{
    console.log('Inside clear question action creator');
    return{
        type:opr
    }
}

export const deleteQuestionActionCreator=(obj,opr)=>{
    return{
        payload:obj,
        type:opr
    }
}

export const deleteOptionActionCreator=(obj,opr)=>{
    return{
        payload:obj,
        type:opr
    }
}

export const editQuestionActionCreator=(obj,opr)=>{
    return{
        payload:obj,
        type:opr
    }
}

export const updateQuestionActionCreator=(obj,opr)=>{
    return{
        payload:obj,
        type:opr
    }
}

export const addAttemptedTestDetailActionCreator=(obj,opr)=>{
    return{
        payload:obj,
        type:opr
    }
}