import React, {useState, useContext} from 'react';
import signin from '../images/signin.png';
import logo from "../images/logo1.png";
import swal from 'sweetalert';
import { NavLink, useNavigate } from 'react-router-dom';
import { AiFillInstagram,  AiFillMail, AiFillGithub ,AiFillLinkedin, AiFillYoutube} from "react-icons/ai";
import { UserContext } from "../App";

const Login = () => {

  const {dispatch} = useContext(UserContext);

  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginUser = async(e) =>{
    e.preventDefault();
    
    const res = await fetch('/signin', {
      method:"POST",
      headers:{
        "Content-Type" : "application/json"
      },
      body:JSON.stringify({
        email,
        password
      })
    } );

    const data = res.json();
    
    if(res.status === 400 || !data){
      swal({
        title: "ERROR!",
        text: "Please enter all details",
        icon: "warning",
        dangerMode: true,
      })
      return console.error();
     
    } else{
      
      dispatch({type:"USER", payload: true})
      swal({
        icon: "success",
        text:"Login Successfull"
      });
      navigate("/");
    }
  }

  return ( <>
             <div class="background">
  <div class="container">
    <div class="screen">
      <div class="screen-header">
        <div class="screen-header-left">
          <div class="screen-header-button close"></div>
          <div class="screen-header-button maximize"></div>
          <div class="screen-header-button minimize"></div>
        </div>
        <div class="screen-header-right">
          <div class="screen-header-ellipsis"></div>
          <div class="screen-header-ellipsis"></div>
          <div class="screen-header-ellipsis"></div>
        </div>
      </div>
      <div class="screen-body">
        <div class="screen-body-item left">
          <div class="app-title">
            <span>SIGN</span>
            <span>IN</span>
          </div>
          <div className="signin-image">
            <figure>
                <img src={signin} alt="signin" />
            </figure>
            <NavLink to = "/signup" className="signin-img-link">Create an account</NavLink>
        </div>
          <div class="app-contact">WEB FREAKS</div>
        </div>
        <div class="screen-body-item">
          <div class="app-form" >
          <form class="app-form123" method="POST">
            <div class="app-form-group">
              <input class="app-form-control" type="email" name="email" id="email" autoComplete="off"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
                          placeholder="email" />
            </div>
            
            <div class="app-form-group">
              <input class="app-form-control" type="password" name="password" id="password" autoComplete="off"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
                          placeholder="Password" />
            </div>
           
            <div class="app-form-group buttons">
              <button class="app-form-button" type="submit" name="signup" id="signup" onClick={loginUser}>Sign In</button>
              {/* <button class="app-form-button">SEND</button> */}
            </div>
            </form>
          </div>
        </div>   
      </div>
    </div>
    <div class="credits">
      inspired by 
      <a href='https://www.linkedin.com/in/ishika-gupta-764036201' class="credits-link" target="_blank"  rel="noreferrer">
       
        <img src={logo} alt="logo" className="logoimg1"/>
         WEB FREAKS
      </a>
    </div>
  </div>
</div>
<footer>
    <div class="frame1" >
      <a href="https://www.instagram.com/confusishika"  target="_blank" rel="noreferrer" class="btnfoot">
       <AiFillInstagram />
      </a>
      <a href="https://github.com/ishikagupta19" target="_blank"  rel="noreferrer" class="btnfoot">
      <AiFillGithub />
      </a>
      
      <a href="https://www.linkedin.com/in/ishika-gupta-764036201" target="_blank" rel="noreferrer"  class="btnfoot">
        <AiFillLinkedin />
      </a>
      <a href="https://youtube.com/channel/UCNtp6vY-OGgiNWmn7a9t3UQ" target="_blank"  rel="noreferrer" class="btnfoot">
       <AiFillYoutube/>
      </a>
      <a href="mailto: worksatig@gmail.com" target="_blank"  rel="noreferrer" class="btnfoot">
        <AiFillMail/>
      </a>
    </div>
    
   </footer>
  </> 
  )
};

export default Login;
