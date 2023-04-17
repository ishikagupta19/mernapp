import React, { useEffect , useState } from 'react';
import { AiFillInstagram,  AiFillMail, AiFillGithub ,AiFillLinkedin, AiFillYoutube} from "react-icons/ai";
import {useNavigate} from "react-router-dom";

 

const About = () => {


  const navigate = useNavigate();
  const [userData, setUserData] = useState({});


  const callAboutPage = async () => {
    try{
        const res = await fetch('/about', {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          credentials: "include"
        });

        const data = await res.json();
        console.log(data);
        setUserData(data);

        if(!res.status === 200){
          const error = new Error(res.error);
          throw error;
        }

    } catch (err) {
        console.log(err);
        navigate('/login');
    }
  }

  useEffect(() =>{
    callAboutPage();
  }, []);


  return <>
 
  <div className="container emp-profile">
    <form method="GET">
      <div className="row">
        {/* <div className="col-md-4">
          <img src={userData.name === "Ishika Gupta" ? profileimg : aboutpic} alt="" className='imgset' />
        </div> */}

        <div className="col-md-6">
          <div className='profile-head'>
            <h5>{userData.name}</h5>
            <h6>{userData.work}</h6>
            <p className='profile-rating mt-3 mb-5'> Rankings <span> 10/10</span></p>

                <ul className="nav nav-tabs" role="tablist">
                <li className="nav-item">
                  <a className="nav-link active" id='home-tab' data-toggle="tab" href="#home" role="tab" >About</a>
                </li>
                <li className="nav-item">
                <a className="nav-link" id='profile-tab' data-toggle="tab" href="#profile" role="tab" >Timeline</a>
                </li>
                
              </ul>   

          </div>
        </div>

        <div className="col md-2">
          <input type="submit" className='profile-edit-btn' name='btnAddMore' value="Edit-profile" />
        </div>

      </div>

      <div className="row">
        {/* left side url */}
        {/* <div className="col-md-4">
          <div className="profile-work">
            <p>Work Link</p>
            <a href="" target="_blank">Link</a> <br />
            <a href="" target="_blank">Link</a> <br />
            <a href="" target="_blank">Link</a> <br />
            <a href="" target="_blank">Link</a> <br />
            <a href="" target="_blank">Link</a> <br />
          </div>
        </div> */}
        {/* right side toggle */}

        <div className="col-md-8 pl-5 about-info">
          <div className="tab-content profile-tab" id='myTabContent'>
            <div className="tab-pane fade show active" id='home' role="tabpanel" aria-labelledby="home-tab">
              <div className="row">
                <div className="col-md-6">
                  <label> User ID</label>
                </div>
                <div className="col-md-6">
                  <p>N/A</p>
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-md-6">
                  <label> Name</label>
                </div>
                <div className="col-md-6">
                  <p>{userData.name}</p>
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-md-6">
                  <label> Email</label>
                </div>
                <div className="col-md-6">
                  <p>{userData.email}</p>
                </div>
              </div>
              
              <div className="row mt-3">
                <div className="col-md-6">
                  <label> Profession</label>
                </div>
                <div className="col-md-6">
                  <p>{userData.work}</p>
                </div>
              </div>
            </div>

            <div className="tab-pane fade" id='profile' role="tabpanel" aria-labelledby="profile-tab">
              <div className="row">
                <div className="col-md-6">
                  <label> Experience</label>
                </div>
                <div className="col-md-6">
                  <p>Expert</p>
                </div>
              </div>
              
              <div className="row mt-3">
                <div className="col-md-6">
                  <label> Total Projects</label>
                </div>
                <div className="col-md-6">
                  <p>10</p>
                </div>
              </div>
      
            </div>
          </div>
        </div>

      </div>

    </form>
  </div>

<footer>
    <div class="frame1" >
      <a href="https://www.instagram.com/confusishika"  target="_blank" rel="noreferrer" class="btnfoot">
       <AiFillInstagram />
      </a>
      <a href="https://github.com/ishikagupta19" target="_blank" rel="noreferrer"  class="btnfoot">
      <AiFillGithub />
      </a>
      
      <a href="https://www.linkedin.com/in/ishika-gupta-764036201" target="_blank" rel="noreferrer"  class="btnfoot">
        <AiFillLinkedin />
      </a>
      <a href="https://youtube.com/channel/UCNtp6vY-OGgiNWmn7a9t3UQ" target="_blank" rel="noreferrer"  class="btnfoot">
       <AiFillYoutube/>
      </a>
      <a href="mailto: worksatig@gmail.com" target="_blank" rel="noreferrer"  class="btnfoot">
        <AiFillMail/>
      </a>
    </div>
    
   </footer>

<script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
  </>;
};

export default About;
