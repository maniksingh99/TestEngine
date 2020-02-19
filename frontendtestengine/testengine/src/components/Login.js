import React from 'react'

export const Login=(props)=>{
    return(
        <div>
        <h3>Login</h3>
        <div className='form-group'>
            <label>UserId:</label>
            <input id='userid' type='text' onChange={props.userInput} placeholder='Enter UserID' className='form-control'></input>
        </div>
        <div className='form-group'>
            <label>Password:</label>
            <input id='password' type='password' onChange={props.userInput} placeholder='Enter Password' className='form-control'></input>
        </div>
        <div className='form-group'>
            <button className='btn btn-primary' onClick={()=>{props.login()}}>Login</button>
        </div>
    </div>
    )
}