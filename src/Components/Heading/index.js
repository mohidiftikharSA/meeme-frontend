import React, { useState } from 'react'
import { IoIosArrowBack } from 'react-icons/io';
import classes from "./index.module.scss"
import { useNavigate } from 'react-router-dom';
import CongratsModal from 'Components/CongratsModal';
import { Button } from 'react-bootstrap';
const Heading = ({ title, judge,badge }) => {
  const [modalShow, setModalShow] = useState(false);
  const navigate = useNavigate();
  const backPage = () => {
    navigate(`/home`);
  };

  const handleDeleteModal = () => {
    setModalShow(false);
  };
  return (
    <>
      <div className={`${classes.heading} ${[badge,judge] && `${classes.heading} d-flex align-items-center justify-content-between`} `} onClick={''}>
        <h5><IoIosArrowBack />{title}</h5>
        {
          judge &&
          <div className={classes.memeNo} onClick={() => setModalShow(true)}><span className='text-light'>40</span>/100</div>
        }
        {
          badge &&
          
            <Button style={{height:"42px", lineHeight:"42px", padding:"0 42px"}}>Upload Badge</Button>
        }
      </div>
      <CongratsModal
        show={modalShow}
        onHide={handleDeleteModal} />
    </>
  )
}

export default Heading