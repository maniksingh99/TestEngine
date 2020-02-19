import React from 'react';
import {connect} from 'react-redux';


export const EditQuestion=(props)=>{
    console.log('The item send from app.js to be edited is ',props.questionEdit);
    return(
        <div>
            <h3>EditQuestions</h3>
            <div className="form-group">
                <label>Question:</label>
                <input id='desc' type='text' onChange={props.editTakeQuestionDesc} defaultValue={props.questionEdit.desc} className='form-control' placeholder='Enter The Desc for Question'></input>
            </div>
            <div className="form-group">
                <label>Options:</label>
                <input id='option' type='text' onChange={props.takeOptions} className='form-control' placeholder='Enter Options'></input>
            </div>
            <div className="form-group">
                <button className="btn btn-primary" onClick={()=>{props.addOptions()}}>ADD OPTION</button>
            </div>
            <div className='form-group'>
                <ol>
                {
                        props.optionsForQuestion.map((ele,index)=>{
                            return(
                             <>   
                           <span><li key={index}>{ele}</li> <button className='btn btn-danger' onClick={()=>{props.deleteOptions(ele)}} key={index+1}>DELETE</button></span> 
                            
                            </>
                            )
                        })
                    }
                </ol>
            </div>
            <div className="form-group">
                <label>Right Option:</label>
                <select id='rightanswer' onChange={props.editTakeQuestionDesc} className='form-control' defaultValue={props.questionEdit.rightanswer}>
                    {
                        props.optionsForQuestion.map((ele,index)=>{
                            return(<option key={index} value={ele}>{ele}</option>)
                        })
                    }
                </select>
            </div>
            <div className='form-group'>
                <label>Score:</label><label>{props.score}</label>
                <input id='score' className='form-control' min='1' max='4' type='range' onChange={props.editTakeQuestionDesc}></input>
            </div>
            <div className="form-group">
                <button className="btn btn-primary" onClick={()=>{props.updateQuestion()}}>EDIT QUESTIONS</button>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <button className="btn btn-primary" onClick={()=>{props.displayQuestion()}}>DISPLAY QUESTIONS</button>
            </div>
        </div>
    )
}

const mapStateToProps=(state)=>{
    console.log('Central State Object ',state.arrQuestion);
    return{
        arrQuestion:state.arrQuestion,
        arrOption:state.arrOption
    }
}

const fn=connect(mapStateToProps);
export default fn(EditQuestion);