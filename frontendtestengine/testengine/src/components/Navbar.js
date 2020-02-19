import React from 'react';
import {NavLink} from 'react-router-dom';

export const Navbar=(props)=>{
    return(
      <div className='form-group'>
        <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                  <NavLink exact activeClassName="active" to="/">Register</NavLink>
              </li>
              &nbsp;&nbsp;
              <li className="nav-item">
                  <NavLink exact activeClassName="active" to="/login">Login</NavLink>
              </li>
              &nbsp;&nbsp;
            </ul>
          </div>
        </nav>
      </div>    
    )
}