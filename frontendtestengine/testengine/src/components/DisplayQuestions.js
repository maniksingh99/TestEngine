import React from 'react';
import {connect} from 'react-redux';

const DisplayQuestions=(props)=>{
    console.log('options are.....',props.options);
    return(
        <div className='form-group'>
            <h3>DisplayQuestions</h3>
            <div className='form-group'>
                <button className='btn btn-primary' onClick={()=>{props.backToCreateQuestion()}}>BACK</button>
            </div>
            <div className='form-group'>
            <table className='table'>
                <thead className='thead-light'>
                    <tr>
                        <th>S.No</th>
                        <th>Question</th>
                        <th>Right Option</th>
                        <th>Score</th>
                        <th>Options</th>
                        <th>Operations</th>
                    </tr>
                </thead>
                <tbody>
                    {props.arrQuestion.map((ele,index)=>{
                        return(<tr key={index}>
                            <td>{index+1}</td>
                            <td>{ele.desc}</td>
                            <td>{ele.rightanswer}</td>
                            <td>{ele.score}</td>
                            <td>
                                <ol>
                                    {ele.options.map((eleOption,index)=>{
                                        return(<li key={index}>{eleOption}</li>)
                                    })}
                                </ol>
                            </td>
                            <td><span><i onClick={()=>{props.deleteQuestion(ele)}} className='fas fa-trash'></i></span>
                            <span><i onClick={()=>{props.editQuestion(ele)}} className='fas fa-edit'></i></span></td>
                        </tr>)
                    })}
                </tbody>
            </table>
            {/* <button className='btn btn-primary' onClick={()=>{props.displayProfileTeacher()}}>Test Created</button> */}
            </div>
        </div>
    )
}

const mapStateToProps=(state)=>{
    console.log('Central State Object ',state.arrQuestion)
    return{
        arrQuestion:state.arrQuestion,
        options:state.options
    }
}

const fn=connect(mapStateToProps);
export default fn(DisplayQuestions);