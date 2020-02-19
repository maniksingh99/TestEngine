import React from 'react';

export const Register=(props)=>{

    return(
        <div>
            <h3>Register</h3>
            <div className='form-group'>
                <label>FirstName:</label>
                <input id='firstname' type='text' className='form-control' onChange={props.userInput} placeholder='Enter Your First Name'></input>
            </div>
            <div className='form-group'>
                <label>LastName:</label>
                <input id='lastname' type='text' className='form-control' onChange={props.userInput} placeholder='Enter Your Last Name'></input>
            </div>
            <div className='form-group'>
                <label>UserId:</label>
                <input id='userid' type='text' className='form-control' onChange={props.userInput} placeholder='Enter Your UserId'></input>
            </div>
            <div className="form-group">
                <label>Designation:</label>
                <select id='designation' onChange={props.userInput} className='form-control'>
                    {
                        props.designation.map((ele,index)=>{
                            return(<option key={index} defaultValue=''>{ele}</option>)
                        })
                    }
                </select>
            </div>
            <div className='form-group'>
                <label>Password:</label>
                <input id='password' type='password' className='form-control' onChange={props.userInput} placeholder='Enter Your Password'></input>
            </div>
            <div className='form-group'>
                <label>Email:</label>
                <input id='email' type='email' className='form-control' onChange={props.userInput} placeholder='Enter Your Email'></input>
            </div>
            <div className='form-group'>
                <button className='btn btn-primary' onClick={()=>{props.register()}}>Register</button>
            </div>
            <div>
                
            </div>
        </div>
    )
}