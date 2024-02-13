import React,{ useState } from 'react'
import '../signup/signup.css'
import { Link} from 'react-router-dom'
import { gql, useMutation } from "@apollo/client";


export default function Signup() {
    const [inputname,setName]=useState("");
    const [inputpassword,setPassword]=useState("");
    const [inputemail,setEmail]=useState("");
    const [loggedIn,setLoggedIn]=useState(false);
    //const navigate = useNavigate();


    const signupMutation = gql`
        mutation Signup($details: SignupDetails) {
        signup(details: $details) {
            token
        }
      }
    `
    const [signupfunc] = 
    useMutation(signupMutation, {
        onCompleted:(data)=>{
            if (data.signup && data.signup.token) 
            {
                const token = data.signup.token;
                localStorage.setItem('authToken', token);
                setLoggedIn(true)

            } 
            else 
            {
                console.error('Error signing up: No token received.');
            }
        }})

    if(loggedIn)
    {
        //navigate('/');
    }
 
  return (
    <div className='d1'>
        <div className='parent1'>
            <div className='registration-from1'>
                <div className='title1'>
                    <h1>Let's get you started!</h1>
                </div>
                <div className='input-form1'>
                    <div className='ifield1'>
                        <p>Full name</p>
                        <input type="text" placeholder='Your name' value={inputname}
                                    onChange={(e) => {
                                        setName(e.target.value.toLowerCase());
                                    }}/>
                    </div>
                    <div className='ifield1'>
                        <p>Email address</p>
                        <input type="text" placeholder='xyz@gmail.com' value={inputemail}
                                    onChange={(e) => {
                                        setEmail(e.target.value.toLowerCase());
                                    }}/>
                    </div>
                    <div className='ifield1'>
                        <p>Create password</p>
                        <input type="password1" placeholder='Pasword' value={inputpassword}
                                    onChange={(e) => {
                                        setPassword(e.target.value.toLowerCase());
                                    }}/>
                    </div>
                    <div className='password-constraints'>
                        <p>Password must contain a minimum 8 characters</p>
                        <p>Password must contain at least one symbol e.g @,!</p>
                    </div>
                    <div className='btn11' onClick={()=>{
                        signupfunc({variables: {details : {"email":inputemail,"name":inputname,"password":inputpassword}}})
                        
                    }}>
                        <p>Sign Up</p>
                    </div>
                    <div className='tc1'>
                        <div>
                            <input type="checkbox" id='accept' style={{marginRight:'4px'}}/>
                            <label htmlFor="accept" >I accept this</label>
                        </div>
                        <div>
                            <Link to={'/terms'}><p>Terms & Conditions</p></Link>
                        </div>
                    </div>
                    <div className='start1'>
                        <p>Already a user?</p>
                        <Link to="/login">Login</Link>
                    </div>
                </div>
            </div>
            <div className='quotes1'>
                <div className='title2'>
                    <p>eFloraOfIndia</p>
                </div>
                <div className='q'>
                    <p>&nbsp;It has the largest database on net on Indian Flora with more than 14,000 species (along with more than 4,00,000 pictures)&nbsp;</p>
                </div>
            </div>
        </div>
    </div>
  )
}
