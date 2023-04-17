import React, {useState, useEffect} from 'react';
import { AiFillInstagram,  AiFillMail, AiFillGithub ,AiFillLinkedin, AiFillYoutube} from "react-icons/ai";

const Home = () => {

  const [userName, setUserName] = useState('');
  const [show, setShow] = useState(false);



  const userHomePage = async () => {
    try{
        const res = await fetch('/about', {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          }
        });

        const data = await res.json();
        console.log(data);
        setUserName(data.name);
        setShow(true);


    } catch (err) {
        console.log(err);
    }
  }

  useEffect(() =>{
    userHomePage();
  }, []);

  return <>

<div class="wrapper">
  <section class="hero">

    <div class="jumbotron jumbotron-fluid mb-0">
      <div class="container">
        <div class="row justify-content-center text-center">
          <div class="col-md-10 col-lg-6">
          <br />
            <h1 class="display-5">WELCOME</h1>
<br />
<br />
            <h2 className='font1'>{userName.name}</h2>
            <br />
            <br />
            <br />
            <h3 class="lead">{show ? 'Happy to see you back!' : 'We are the WEB FREAKS'}</h3>
              <p>A web development team takes care of the code for one or multiple websites and apps. 

              These roles are all vital when it comes to building and maintaining an app or website. Here are some of the most common roles in a web development team. 
              <li>Project Manager</li>
            
              <li>Back-end developer</li>
              <li>Front-end developer</li>
          
              <li>UX designer/Graphic designer</li>
               </p>
 </div>
        </div>
      </div>
    </div>
  </section>


 
</div>

  

      {/* footer */}
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
  </>;
};

export default Home;
