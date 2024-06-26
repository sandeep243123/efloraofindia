// import { Navbar } from '@material-tailwind/react'
import React from 'react';
import style from './Contribute.module.css'
import img1 from '../a1.jpg';
import { Link ,useLocation} from 'react-router-dom'
import AddContribution from '../popup components/add contribution/AddContribution';
import { useState } from 'react';
import { Add } from '@mui/icons-material';
import img from '../assets/user.png';
import { useLazyQuery,gql } from '@apollo/client';
import ViewContribution from '../popup components/view contribution/ViewContribution';
import Comments from '../comments/Comments';
export default function Contribute(props) {
  const location = useLocation();

  const {postinfo} = location.state || {};
  const [selectedImage, setSelectedImage] = useState(postinfo.imagesLink[0]); 

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };
 


  const [openAddContribution, setOpenAddContribution] = useState(false)
  const [openViewContribution, setOpenViewContribution] = useState(false)
  return (
 
    <div className={style.wrapper}>
      <div className={style.container}>
        {/* profile picture and UserName */}
        <div className={style.user}>
          {/* image */}
          <div>
            <img className={style.profile} src={img}></img>
          </div>

          <p className={style.username}>{postinfo.postedBy}</p>
        </div>

        <div className={style.top}>
          {/* Image-section */}
            

            <div className={style.imgSection}>
              <div className={style.leftImg}>
                <img src={`https://eflora.vangyaan.com/images/${selectedImage}`} alt='Selected Image'></img>
              </div>
              <div className={style.rightImg2Container}>
              <div className={style.rightImg}>
                <div className={style.rightImg1}>
                  {/* Assuming images array contains the source URLs */}
                  {postinfo.imagesLink.map((image, index) => (
                    <img
                      key={index}
                      src={`https://eflora.vangyaan.com/images/${image}`}
                      alt={`Right Image ${index + 1}`}
                      onClick={() => handleImageClick(image)} // Handle click event
                    />
                  ))}
                </div>
                </div>
              </div>
            </div>

          {/* Description-section */}
          <div className={style.desc}>
            <textarea name="postContent" rows={17} cols={80} value={postinfo.description}/>
          </div>
        </div>


        {/*  Button- section */}
        <div className={style.btn}>
          <div className={style.viewContri} onClick={() => setOpenViewContribution(true)}>
            <button>View Contribution</button>
          </div>
          <div className={style.addContri} >
            <button onClick={() => setOpenAddContribution(true)}>Add Contribution</button>
          </div>
        </div>
        {openAddContribution && <AddContribution closeAddContribution={setOpenAddContribution}  postID={postinfo.postID} ></AddContribution>}
        {openViewContribution && <ViewContribution closeViewContribution={setOpenViewContribution} postID={postinfo.postID}></ViewContribution>}


      </div>

      <div className='mt-20 ml-6 mb-10'>
           <Comments postID={postinfo.postID}></Comments>
        </div>
    </div>
  )
}
