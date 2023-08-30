import React from 'react'
import { IoIosArrowBack } from 'react-icons/io';
import classes from "./index.module.scss"
import { useNavigate } from 'react-router-dom';
const Heading = ({title, judge}) => {
  const navigate = useNavigate();
    const backPage = () => {
      navigate(`/home`);
    };

  return (
    <div className={`${classes.heading} ${judge&& `${classes.heading} d-flex align-items-center justify-content-between`} `} onClick={backPage}>
        <h5><IoIosArrowBack/>{title}</h5>
      {
        judge&&
        <div className={classes.memeNo}><span className='text-light'>40</span>/100</div>
      }
    </div>
  )
}

export default Heading