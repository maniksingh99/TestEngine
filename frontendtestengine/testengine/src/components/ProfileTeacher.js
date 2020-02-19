import React from 'react';
import {connect} from 'react-redux';

const ProfileTeacher=(props)=>{
    console.log('Value of arrTest is ',props.arrTest);
    return(
        <div>
            <h3>Profile</h3>
            <div className='form-group'>
                <button onClick={()=>{props.changeToTest()}} className='btn btn-primary'>Create Test</button>
            </div>
            <div className='form-group'>
                <label>Teacher Name:</label>
                <label>{props.userBackend.firstname}</label>
            </div>
            <div className='form-group'>
                <label>EmailId:</label>
                <label>{props.userBackend.email}</label>
            </div>
            <div className='form-group'>
                <button className='btn btn-primary' onClick={()=>{props.changeToDisplayTest()}}>DisplayTest</button>
            </div>
        </div>
    )
}

const mapStateToProps=(state)=>{
    console.log('Central State Object ',state.arrTest);
    return{
        arrTest:state.arrTest
    }
}

const fn=connect(mapStateToProps);
export default fn(ProfileTeacher);