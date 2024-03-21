import React from "react";
import { Link } from 'react-router-dom'
import './style.css';
import img1 from './logo-removebg-preview.png'
import userImg from '../popup components/view contribution/user.png'
import logoutImg from '../assets/switch.png'
import signupImg from '../assets/add-friend.png'
import loginImg from '../assets/login.png'
import contactImg from '../assets/customer-service.png'
import aboutImg from '../assets/about-us.png'
import exploreImg from '../assets/explore.png'
import contributeImg from '../assets/jigsaw.png'

import { AuthContext } from '../../services/AuthContext.js';
import { useState, useContext } from "react";
export default function Navbar() {
  const [condition, setCondition] = useState(true)


  const { isLoggedIn, logout } = useContext(AuthContext);




  const handleLogout = () => {
    logout();

    localStorage.removeItem('authToken');
  };

  return (
    <div>
      <div className="nav">
        <input type="checkbox" id="nav-check" />
        <div className="nav-header">
          <div className="nav-title">
            <Link to='/'><img src={img1} alt="" /></Link>
          </div>
        </div>
        <div className="nav-btn">
          <label className="userImg" htmlFor="nav-check">
            <img src={userImg} alt="" style={{ width: "100%", height: '100%' }} />
          </label>
        </div>
        <div className="nav-links">

          <Link to={'/'}><img src={exploreImg} className="icon-img"></img>Explore</Link>
          <Link to={'/about'} ><img src={aboutImg} className="icon-img"></img>About us</Link>
          <Link to={'/contact'} ><img src={contactImg} className="icon-img"></img>Contact us</Link>
          {
            isLoggedIn ? (
              <>
                <Link to={'/upload'} ><img src={contributeImg} className="icon-img" alt=""></img>Contribute</Link>

                <Link to={'/'} onClick={handleLogout}><img src={logoutImg} className="icon-img" alt=""></img>Sign out</Link>
                {/* <Link to={'/upload'}>Upload</Link> */}
                <Link to={'/showposts'} >Show Posts</Link>
                <Link to={'/dashboard'} >Leaderboard</Link>
              </>
            ) : (
              <>
                <Link to={'/login'} ><img src={loginImg} className="icon-img"></img>Login</Link>
                <Link to={'/signup'} ><img src={signupImg} className="icon-img"></img>Signup</Link>
              </>
            )
          }

        </div>
      </div>
    </div>

  )
}
