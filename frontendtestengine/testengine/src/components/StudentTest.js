import React from 'react';
import {connect} from 'react-redux';
// import Radio from '@material-ui/core/Radio';
// import RadioGroup from '@material-ui/core/RadioGroup';
// import FormControl from '@material-ui/core/FormControl';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import {RadioGroup,RadioButton,ReversedRadioButton} from 'react-radio-buttons';

export const StudentTest=(props)=>{
    var val=props.val;
    console.log('Value of val in Student Test ',val);
    return(
        <div className='container'>
             <h1>Student Test</h1>
             <div className='container'>
                <label>Question {props.val+1}:</label><label>{props.studentQuestionEle.desc}</label>
                {/* <FormControl component="fieldset" className={classes.formControl}> */}
                {
                    props.studentQuestionEle.options.map((ele,index)=>{
                        return(
                        <div key={index}>
                            <input type='radio' id={val} name={'answer'+val} value={ele} className='form-group' key={index} onChange={props.takeStudentTestOptions}/><label>{ele}</label>
                             {/* <RadioGroup aria-label="gender" name={'answer'} value={value} onChange={props.takeStudentTestOptions}>
                             <FormControlLabel value="female" control={<Radio />} label={ele} />
                             </RadioGroup> */}
                            {/* <ReversedRadioButton id={'answer'+val}  value={ele.toString()}  key={index} pointColor={ '#0c58ca' } iconSize={ 20 }
                                          iconInnerSize={ 40 }>
                            <span style={{ fontSize: '22px', color: 'black'}}>{ele}</span>
                            </ReversedRadioButton> */}
                        </div>  
                        )
                    })
                }
                {/* {
                    props.studentQuestionEle.options?
                    <RadioGroup onChange={props.takeStudentTestOptions}>
                
                    </RadioGroup>
                    : ''
                } */}
                <button disabled={props.val===0} onClick={()=>{props.toFindQuestionStudent(props.val-1,'decrease')}} className='btn btn-primary'>Previous</button>
                &nbsp;&nbsp;&nbsp;
                <button disabled={props.val===props.totalQuestionNo-1} onClick={()=>{props.toFindQuestionStudent(props.val+1,'increase')}} className='btn btn-primary'>Next</button>
                &nbsp;&nbsp;&nbsp;
                <button onClick={()=>{props.testComplete()}} className='btn btn-primary'>Complete</button>
                <h4>Time Left h:{props.testDurationObj.h} m:{props.testDurationObj.m} s:{props.testDurationObj.s}</h4>
                {/* </FormControl> */}
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
export default fn(StudentTest);
