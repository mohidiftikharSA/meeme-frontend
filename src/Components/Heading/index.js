import React, { useEffect, useState } from 'react'
import { IoIosArrowBack } from 'react-icons/io';
import classes from "./index.module.scss"
import { useNavigate } from 'react-router-dom';
import CongratsModal from 'Components/CongratsModal';
import { Button } from 'react-bootstrap';
import JudgeModal from "Components/JudgeModal";

const Heading = ({ title, judge, badge, linkPath, likedCounts }) => {
    const [modalShow, setModalShow] = useState(false);
    const [JudgeModalShow, setJudgeModalShow] = useState(false);
    const navigate = useNavigate();
    const backPage = () => {
        if (linkPath) {
            navigate(`/${linkPath}`);
            console.log(linkPath);

        }else{
            navigate(`/home`);

        }
    };
    const handleCloseClick = () => {
        window.close();
      };

    const handleDeleteModal = () => {
        setModalShow(false);
    };
    useEffect(() => {
        console.log("Counts ", likedCounts)
    }, [likedCounts]);
    return (
        <>
            <div
                className={`${classes.heading} ${[badge, judge] && `${classes.heading} d-flex align-items-center justify-content-between`} `}
                onClick={backPage}>
                <h5><IoIosArrowBack />{title}</h5>
                {
                    judge &&
                    <div className={classes.memeNo} onClick={() => setModalShow(true)}><span
                        className='text-light' onClick={() => setJudgeModalShow(true)} >{likedCounts ?? 0}</span>/100</div>
                }
                {
                    badge &&

                    <Button style={{ height: "42px", lineHeight: "42px", padding: "0 42px" }}>Upload Badge</Button>
                }
            </div>
            <CongratsModal
                show={modalShow}
                onHide={handleDeleteModal} />
            <JudgeModal post show={JudgeModalShow} onHide={() => setJudgeModalShow(false)} />

        </>
    )
}
export default Heading