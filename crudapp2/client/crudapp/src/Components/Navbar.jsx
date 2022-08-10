import React from 'react';
import { NavLink } from 'react-router-dom';
import "../App.css"

 const Navbar =()=> {

 
  return (


    <div className='navbar' >
        <h3>I'm Software</h3>
        <ul >
           
            <NavLink  to="/">  <li>Main Page</li></NavLink>
             
            
            <NavLink  to="/list"><li> List PER </li> </NavLink>
             
            
            <NavLink  to="/add"><li> Add PER  </li> </NavLink> 
            
        </ul>
  </div>

  )
}

export default Navbar;