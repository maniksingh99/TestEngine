import React from 'react';


export const CreateTest=(props)=>{
    return(
        <div className='form-group'>
            <h3>CreateTest</h3>
            <div className='form-group'>
                <button onClick={()=>{props.changeToProfile()}} className='btn btn-primary'>Back</button>
            </div>
            <div className="form-group">
                <label>TesterName:</label>
                <input id='testername' type='text'  className='form-control' placeholder='Enter Tester Name' value={props.username}
                 disabled="disabled"></input>
            </div>
            <div className="form-group">
                <label>TestName:</label>
                <input id='testname' type='text' onChange={props.createTestInput} className='form-control' placeholder='Enter Test Name'></input>
            </div>
            <div className="form-group">
                <label>TestCode:</label>
                <input id='testcode' type='text' onChange={props.createTestInput} className='form-control' placeholder='Enter TestCode Name'></input>
            </div>
            <div className="form-group">
                <label>TestDuration(in mins):</label>
                <input id='testduration' type='text' onChange={props.createTestInput} className='form-control' placeholder='Enter TestDuration Name'></input>
            </div>
            <div className="form-group">
                <span>
                    <button className="btn btn-primary" onClick={()=>{props.addTest()}}>ADD TEST</button>
                </span>
            </div>
        </div>
    )
}