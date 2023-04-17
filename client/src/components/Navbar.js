import React, {useContext} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { NavLink } from 'react-router-dom';
import logo from "../images/logo1.png";

import { UserContext } from "../App";

const Navbar = () => {
  


  const {state} = useContext(UserContext);

    const RenderMenu = () => {
      if(state) {
        return (
          <>

              <li className="nav-item active">
                <NavLink className="nav-link" to="/">Home <span className="sr-only"></span></NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/about">About</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/contact">Contact</NavLink>
              </li>
              
              <li className="nav-item">
                <NavLink className="nav-link" to="/logout">Logout</NavLink>
              </li>
            
          </>
        )
      } else {
        return (
          <>
             <li className="nav-item active">
                <NavLink className="nav-link" to="/">Home <span className="sr-only"></span></NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/about">About</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/contact">Contact</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/login">Login</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/signup">Sign Up</NavLink>
              </li> 
          </>
        )
      }
    }
  
  

  return <>
      <nav className="navbar navbar-expand-lg navbar-light ">
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <NavLink className="navbar-brand" to="/">
      <img src={logo} alt="logo" className="logoimg"/>
  </NavLink>

  <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
    <ul className="navbar-nav ms-auto mt-2 mt-lg-0">
      

      <RenderMenu/>
      
    </ul>
    
  </div>
</nav>
  </>;
};

export default Navbar;

 