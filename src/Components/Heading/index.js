import React, { useState } from 'react'
import { IoIosArrowBack } from 'react-icons/io';
import classes from "./index.module.scss"
import { useNavigate } from 'react-router-dom';
import CongratsModal from 'Components/CongratsModal';
const Heading = ({ title, judge }) => {
  const [modalShow, setModalShow] = useState(false);
  const navigate = useNavigate();
  const backPage = () => {
    navigate(`/home`);
  };

  return (
    <>
      <div className={`${classes.heading} ${judge && `${classes.heading} d-flex align-items-center justify-content-between`} `} onClick={''}>
        <h5><IoIosArrowBack />{title}</h5>
        {
          judge &&
          <div className={classes.memeNo}><span className='text-light' onClick={() => setModalShow(true)}>40</span>/100</div>
        }
      </div>
      {/* <CongratsModal
        show={modalShow}
        onHide={() => setModalShow(false)} /> */}
    </>
  )
}

export default Heading