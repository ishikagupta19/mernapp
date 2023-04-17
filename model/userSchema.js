
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    work: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    cpassword: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    },
    messages:[
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        phone: {
            type: Number,
            required: true
        },
        message: {
            type: String,
            required: true
        }
    }
    ],
    tokens: [
        {
        token: {
            type: String,
            required: true
        },
    },
    ],
    
});



//we are hashing the passwords

userSchema.pre('save', async function(next) {
    console.log("hi from inside");
    
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password, 12);
        this.cpassword = await bcrypt.hash(this.cpassword, 12);
    }
    next();
});

// we are generating token
userSchema.methods.generateAuthToken = async function () {
    try{
        let token = jwt.sign({_id:this._id}, process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({ token: token});
        await this.save();
        return token;

        } catch(err) {
            console.log(err);
        }
}

// store the messages

userSchema.methods.addMessage = async function(name, email, phone, message){
    try{
        this.messages = this.messages.concat({name, email, phone, message});
        await this.save();
        return this.messages;
    } catch (error) {
        console.log(error);
    }
}

// validation
// const [userror, setUserror] = useState({});
//   const [isSubmit, setIsSubmit] = useState(false);

// setUserror(validate(user));
//       setIsSubmit(true);

//   useEffect(() => {
//     console.log(userror);
//     if (Object.keys(userror).length === 0 && isSubmit) {
//       console.log(user);
//     }
//   }, [userror]);
//   const validate = (values) =>{
//     const errors = {};
//     const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
//     if (!values.name) {
//       errors.name = "Name is required!";
//     }
//     if (!values.email) {
//       errors.email = "Email is required!";
//     } else if (!regex.test(values.email)) {
//       errors.email = "This is not a valid email format!";
//     }
//     if (!values.phone) {
//       errors.phone = "Contact info is required!";
//     }
//     if (!values.work) {
//       errors.work = "Profession is required!";
//     }
//     if (!values.password) {
//       errors.password = "Password is required";
//     } else if (values.password.length < 4) {
//       errors.password = "Password must be more than 4 characters";
//     } else if (values.password.length > 10) {
//       errors.password = "Password cannot exceed more than 10 characters";
//     }
//     return errors;
//   };

{/* <p className='signedup'>{userror.name}</p> */}

const User = mongoose.model('USER', userSchema);

module.exports = User;