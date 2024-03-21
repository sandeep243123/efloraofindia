import React, { useEffect, useState } from 'react';
import style from './profile.module.css'
import img from './p1.jpg'
import { useRef } from 'react';

function Profile() {

    const [profile, setProfile] = useState("");
    function fileHandler(e) {
        let value = URL.createObjectURL(e.target.files[0]);
        console.log(value)
        setProfile(value)
    }

    return (
        <div className={style.container}>
            <div className={style.itemC}>
                <div className={style.imgSection}>
                    <div className='image'>
                        <img src={profile} alt="" />
                        <label htmlFor={style.filePath}></label>
                        <input type="file" accept='image/jpeg, image/png, image/jpg' id={style.filePath} onChange={fileHandler} />
                    </div>
                </div>
                <div className={style.userInfo}>
                    <h1>User info</h1>
                    <div className={style.userInfoData}>
                        <div className={style.ip1}>
                            <p>Address</p>
                            <input type="text" />
                        </div>
                        <div className={style.ip1}>
                            <p>Name</p>
                            <input type="text" />
                        </div>
                    </div>
                </div>
                <div className={style.contactInfo}>
                    <h1>Contact info</h1>
                    <div className={style.userInfoData}>
                        <div className={style.ip1}>
                            <p>Phone Number</p>
                            <input type="text" />
                        </div>
                        <div className={style.ip1}>
                            <p>Email Aaddress</p>
                            <input type="text" />
                        </div>
                    </div>
                </div>
                <div className={style.security}>
                    <h1>Security</h1>
                    <div className={style.userInfoData}>
                        <div className={style.ip1}>
                            <p>Current password</p>
                            <input type="password" />
                        </div>
                        <div className={style.ip1}>
                            <p>New password</p>
                            <input type="password" />
                        </div>
                    </div>
                    <div className={style.btnSection}>
                        <div>Save</div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Profile
