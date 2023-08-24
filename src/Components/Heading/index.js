import React from 'react'
import { IoIosArrowBack } from 'react-icons/io';
import classes from "./index.module.scss"
import { useNavigate } from 'react-router-dom';
const Heading = ({title}) => {
  const navigate = useNavigate();
    const backPage = () => {
      navigate(`/home`);
    };

  return (
    <div className={classes.heading} onClick={backPage}>
        <h5><IoIosArrowBack/>{title}</h5>
    </div>
  )
}

export default Heading