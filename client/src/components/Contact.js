import React, {useEffect, useState} from 'react';
import logo from "../images/logo1.png";
import swal from 'sweetalert';
import { AiFillInstagram,  AiFillMail, AiFillGithub ,AiFillLinkedin, AiFillYoutube} from "react-icons/ai";

const Contact = () => {

  const [userData, setuserData] = useState({name:"", email:"", phone:"", message:""});


  const userContact = async () => {
    try{
        const res = await fetch('/getdata', {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          }
        });

        const data = await res.json();
        console.log(data);
        setuserData({...userData, name:data.name, email:data.email, phone: data.phone});

        if(!res.status === 200){
          const error = new Error(res.error);
          throw error;
        }

    } catch (err) {
        console.log(err);
    }
  }

  useEffect(() =>{
    userContact();
  }, []);
// we are storing data in states

const handleInputs = (e) => {
  const name = e.target.name;
  const value = e.target.value;
  
  setuserData({...userData, [name]: value});
  console.log(userData);
}

// send the data to backend
      const contactForm = async (e) => {
        e.preventDefault();

        const {name, email, phone, message} = userData;
        const res = await fetch('/contact', {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            name, email, phone, message
          })
        });

        const data = await res.json();

        if(!data.message){
          swal({
            icon: "warning",
            text:"Message not send!"
          });
        } else{
          swal({
            icon: "success",
            text:"Message sent!"
          });
          setuserData({...userData, message: ""});
          console.log(userData);
        }


      }


  return (
    <>
      {/* contact us form */}
      <div class="background">
  <div class="container">
    <div class="screen">
      <div class="screen-header ">
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
            <span>GET</span>
            <span>IN TOUCH</span>
          </div>
          
          <div className="contact_form_namee mt-2 d-flex justify-content-between  ">
            <div class="app-form-group">
            
                  <input type="text" id="contact_form_name" className="contact_form_name input_field" name="name" value={userData.name} onChange={handleInputs} placeholder="Your Name" required="true" />
                  <input type="email" id="contact_form_email" className="contact_form_email input_field" name="email" value={userData.email} onChange={handleInputs} placeholder="Your Email" required="true" />
                  <input type="number" id="contact_form_phone" className="contact_form_phone input_field" name="phone" value={userData.phone} onChange={handleInputs} placeholder="Your Phone Number" required="true" />

                </div>
            </div>
          <div class="app-contact">WEB FREAKS</div>
        </div>
        <div class="screen-body-item ">
          <div class="app-form ">
         
            <form method = "POST" id='app-form-group'>
            <div class="app-form-group">
              {/* <input class="app-form-control" type="password" name="password" id="password" autoComplete="off"
                          placeholder="Message" /> */}
                  <textarea className="text_field contact_form_message" onChange={handleInputs} name="message" value={userData.message} placeholder="Message" ></textarea>
            </div>
           
            <div class="app-form-group buttons">
              <button class="app-form-button" type="submit" name="signup" id="signup" onClick={contactForm}>Send Message</button>
              {/* <button class="app-form-button">SEND</button> */}
            </div>
            </form>
          </div>
        </div>   
      </div>
    </div>
    <div class="credits">
      inspired by 
      <a class="credits-link" href="https://dribbble.com/shots/2666271-Contact" target="_blank" rel="noreferrer">
      
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
      <a href="https://youtube.com/channel/UCNtp6vY-OGgiNWmn7a9t3UQ" target="_blank" rel="noreferrer"  class="btnfoot">
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

export default Contact;
