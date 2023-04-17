const jwt = require('jsonwebtoken');

const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const authenticate = require("../middleware/authenticate");



require('../db/conn');
const User = require("../model/userSchema");
const e = require('express');

// router.get('/', (req,res) => {
//     res.send("Hello from the developer world router js");
// });

//using promises

// router.post('/register',(req,res)=> {

//     const {name, email, phone, work, password, cpassword } = req.body;

//     if(!name || !email || !phone || !work || !password || !cpassword){
//         return res.status(422).json({error: "Please fill all the field properly"});
//     }

//     User.findOne({email:email})
//     .then((userExist) => {
//         if(userExist) {
//             return res.status(422).json({error: "Email already exist"});
//         }

//         const user = new User({name, email, phone, work, password, cpassword});

//         user.save().then(() => {
//             res.status(201).json({message: "user registered successfully"});
//         }).catch((err) => res.status(500).json({error:"Failed to register"}));

//     }).catch(err => { console.log(err);});

// });

router.post('/register', async (req,res)=> {

    const {name, email, phone, work, password, cpassword } = req.body;

    if(!name || !email || !phone || !work || !password || !cpassword){
        return res.status(422).json({error: "Please fill all the field properly"});
    }

    try{
        const userExist = await User.findOne({email:email});

        if(userExist) {
            return res.status(422).json({error: "Email already exist"});
        }

        const user = new User({name, email, phone, work, password, cpassword});

       const userRegister= await user.save();
        if(userRegister){
       return res.status(201).json({message: "user registered successfully"});
    }else {
        res.status(500).json({ error: "Failed to register"});
    }

    } catch (err) { 
            console.log(err);
    }

});

//login route

router.post('/signin', async (req, res) => {
    try{
        const {email,password} = req.body;

        if( !email || !password){
            return res.status(400).json({error:"Please fill the data"});
        }
 
            const userLogin = await User.findOne({ email: email });
            //console.log(userLogin);

            if(userLogin){

                const isMatch = await bcrypt.compare(password, userLogin.password);

                const token = await userLogin.generateAuthToken();
                console.log(token);
                
                res.cookie("jwttoken", token, {
                    expires: new Date(Date.now() + 25892000000),
                    httpOnly: true
                });

            if( !isMatch){
                res.status(400).json({ error: "Invalid credentials!"});
            } else{
                res.json({ message: "User Sign in successfully"});
            }

            } else{
                res.status(400).json({ error: "Invalid credentials!"});
            }

            

    } catch(err) {
        console.log(err);
    }
});

//about us page


router.get("/about", authenticate, (req,res) => {
    console.log(`Hello About`);
    res.send(req.rootUser);
});

// get user data frome contact us and home page

router.get("/getdata", authenticate, (req, res) => {
    console.log(`Hello from about side`);
    res.send(req.rootUser);
})

// contact us page
router.post("/contact", authenticate, async(req,res) => {

    try{
        const {name, email, phone, message } = req.body;

        if(!name || !email || !phone || !message) {
            console.log("error in contact form");
            return res.json({ error: "Please fill the contact form"});
        }

        const userContact = await User.findOne({_id:req.userID});

        if(userContact) {
            const userMessage = await userContact.addMessage(name, email, phone, message);

            await userContact.save();

            res.status(201).json({message:"User Contacted successfully"});
        }
    }

    catch(error) {
        console.log(error);
    }
        
});

router.get("/logout", (req,res) => {
    console.log(`hello from logout!`);
    res.clearCookie('jwttoken', { path: '/'});
    res.status(200).send(message = "User Logout");
});


module.exports = router;