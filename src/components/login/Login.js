
import '../login/login.css';
import img from '../assets/glogo.png'
import { Link,useNavigate } from 'react-router-dom'
import React,{ useState } from 'react'
import { useLazyQuery, gql} from "@apollo/client";

export default function Login() {
    
    const [inputpassword,setPassword]=useState("");
    const [inputemail,setEmail]=useState("");
    const [loggedIn,setLoggedIn]=useState(false);
    const navigate = useNavigate();

    const [Loginfunc] = useLazyQuery(gql`
    query Login($details: userLogin) {
        login(details: $details) {
          token
        }
      }
    `,{
        onCompleted:(data)=>{
            if (data.login && data.login.token) 
            {
                const token = data.login.token;
                localStorage.setItem('authToken', token);
                
                setLoggedIn(true);
            } 
            else 
            {
                console.error('Error signing up: No token received.');
            }
        },
        onError: (error) => {
            console.error('Error signing up:', error.message);
          
        }
    });
    
    if(loggedIn){
        navigate('/');
    }

    return (
        <div className='d'>
            <div className='parent'>
                <div className="content">
                    <div className='log'>
                        <h1>Login</h1>
                    </div>
                    <div className='ifield'>
                        <input type="input" placeholder='Email' value={inputemail}
                        onChange={(e) => {
                            setEmail(e.target.value.toLowerCase());
                        }}/>
                        <input id='input2' type="password" placeholder='password' 
                            onChange={(e) => {
                                        setPassword(e.target.value.toLowerCase());
                                }}/>
                    </div>
                    <div className='chk'>
                        <div>
                            <input type="checkbox" id='remeber' />
                            <label htmlFor="remeber" style={{marginLeft:'3px'}}>Remeber me</label>
                        </div>
                        <p>Forget password?</p>
                    </div>
                    <div className='tc'>
                        <div>
                            <input type="checkbox" id='accept' style={{marginRight:'4px'}}/>
                            <label htmlFor="accept" >I accept this</label>
                        </div>
                        <div style={{marginRight:'5px',fontSize:'1em',paddingLeft:'3px', color:'#54AEFF'}}>
                        <Link to={'/terms'}><p>Terms & Conditions</p></Link>
                        </div>
                        
                    </div>
                    <div className='btn1'onClick={()=>{
                        Loginfunc({variables: {details : {"usermail":inputemail,"password":inputpassword}}})
                        
                    }}>
                        <p>Login</p>
                    </div>
                    <div className='btn2'>
                        <img src={img} alt="" />
                        <p>Continue with Login</p>
                    </div>
                    <div className='start'>
                        <p>Don't have an account?</p>
                        <Link to={'/signup'}><div>Get started</div></Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
