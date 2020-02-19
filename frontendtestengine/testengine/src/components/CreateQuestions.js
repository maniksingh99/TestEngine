import React from 'react';
import {connect} from 'react-redux';


export const CreateQuestions=(props)=>{
    return(
        <div>
            <h3>CreateQuestions</h3>
            <div className="form-group">
                <label>Question:</label>
                <input id='desc' type='text' onChange={props.takeQuestionDesc} className='form-control' placeholder='Enter The Desc for Question'></input>
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
                <select id='rightanswer' onChange={props.takeQuestionDesc} className='form-control'>
                    {
                        props.optionsForQuestion.map((ele,index)=>{
                            return(<option key={index} value={ele}>{ele}</option>)
                        })
                    }
                </select>
            </div>
            <div className='form-group'>
                <label>Score:</label><label>{props.score}</label>
                <input id='score' className='form-control' min='1' max='4' type='range' onChange={props.takeQuestionDesc}></input>
            </div>
            <div className="form-group">
                <button className="btn btn-primary" onClick={()=>{props.addQuestion()}}>ADD QUESTION</button>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <button className="btn btn-primary" onClick={()=>{props.displayQuestion()}}>DISPLAY QUESTIONS</button>
            </div>
        </div>
    )
}

const mapStateToProps=(state)=>{
    console.log('Central State Object ',state.arrQuestion);
    return{
        arrQuestion:state.arrQuestion
    }
}

const fn=connect(mapStateToProps);
export default fn(CreateQuestions);