import React, { useState, useContext } from 'react'
import styles from '../signup/signup.module.css'
import { Link } from 'react-router-dom'
import { gql, useMutation } from "@apollo/client";
import { useNavigate } from 'react-router-dom';
import Otp from './OtpForm'
import { input } from '@material-tailwind/react';

export default function Signup() {
    const [inputname, setName] = useState("");
    const [inputpassword, setPassword] = useState("");
    const [inputemail, setEmail] = useState("");


    const [showOtpInput, setShowOtpInput] = useState(false);
    

    return (
        <div className={styles.d1}>
            <div className={styles.parent1}>
                <div className={styles.registrationFrom1}>
                    <div className={styles.title1}>
                        <h1>Let's get you started!</h1>
                    </div>
                    <div className={styles.inputForm1}>
                        <div className={styles.ifield1}>
                            <p>Full name</p>
                            <input type="text" placeholder='Your name' value={inputname}
                                onChange={(e) => {
                                    setName(e.target.value.toLowerCase());
                                }} />
                        </div>
                        <div className={styles.ifield1}>
                            <p>Email address</p>
                            <input type="text" placeholder='xyz@gmail.com' value={inputemail}
                                onChange={(e) => {
                                    setEmail(e.target.value.toLowerCase());
                                }} />
                        </div>
                        <div className={styles.ifield1}>
                            <p>Create password</p>
                            <input type="password1" placeholder='Pasword' value={inputpassword}
                                onChange={(e) => {
                                    setPassword(e.target.value.toLowerCase());
                                }} />
                        </div>
                        <div className={styles.passwordConstraints}>
                            <p>Password must contain a minimum 8 characters</p>
                            <p>Password must contain at least one symbol e.g @,!</p>
                        </div>
                        <div className={styles.btn11}>
                             <p><Link to={'/otpsignup'} state={{email:inputemail,password:inputpassword,name:inputname}}>Sign Up</Link></p>  
                          
                        </div>
                        <div className={styles.tc1}>
                            <div>
                                <input type="checkbox" id='accept' style={{ marginRight: '4px' }} />
                                <label htmlFor="accept" >I accept this</label>
                            </div>
                            <div>
                                <Link to={'/terms'}><p>Terms & Conditions</p></Link>
                            </div>
                        </div>
                        <div className={styles.start1}>
                            <p>Already a user?</p>
                            <Link to="/login">Login</Link>
                        </div>
                    </div>
                </div>
                <div className={styles.quotes1}>
                    <div className={styles.title2}>
                        <p>eFloraOfIndia</p>
                    </div>
                    <div className={styles.q}>
                        <p>&nbsp;It has the largest database on net on Indian Flora with more than 14,000 species (along with more than 4,00,000 pictures)&nbsp;</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
