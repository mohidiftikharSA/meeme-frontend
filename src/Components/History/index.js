import React, { useEffect, useState } from "react";
import classes from "./index.module.scss";
import { Button, Form, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import EarnCoinsModal from "Components/EarnCoinsModal";
import { toast } from "react-toastify";
import classesModal from "./index2.module.scss";
import { LiaTimesSolid } from 'react-icons/lia';
import { modalClasses } from "@mui/material";


const historyData = [{
    days: "01", memeNo: "40", status: false,
}, {
    days: "02", memeNo: "100", status: true,
}, {
    days: "03", memeNo: "100", status: true,
}, {
    days: "04", memeNo: "100", status: false,
},];
const History = ({ tournamentData }) => {
    const [judgedPosts, setJudgedPosts] = useState([]);
    const [showAgreeModal, setShowAgreeModal] = useState(false);
    const [selectedCount, setSelectedCount] = useState(null); // Store selected count
    const navigate = useNavigate();

    const nextPage = (count) => {
        navigate(`/judge?count=${count}`);
    };

    const hydrateFields = () => {
        const daysJudgedPosts = (tournamentData?.judged_posts ?? [])
            .sort((a, b) => new Date(b.post_date) - new Date(a.post_date));
        setJudgedPosts(daysJudgedPosts);
    };

    useEffect(() => {
        hydrateFields();
    }, []);

    const handleItemClick = (item, ind) => {
        if (ind === 0) {
            setSelectedCount(item.judged_post_date_count);
            if (!item.status) {
                const modalShown = sessionStorage.getItem('agreeModalShown');
                if (!modalShown) {
                    setShowAgreeModal(true);
                    sessionStorage.setItem('agreeModalShown', 'true');
                } else {
                    if (selectedCount !== null) {
                        nextPage(selectedCount);
                    }
                }
            } else {
                toast.error('Your count limit has been reached.');
            }
        } else {
            toast.error('Your selected day has passed');
        }
    };

    return (
        <>
            <div className="my-4">
                <h5>History</h5>
                <ul className={classes.list}>
                    <li>Days</li>
                    <li>No. of Memes</li>
                    <li>Status</li>
                </ul>
                <ul className={`${classes.list} ${classes.historyList}`}>
                    {judgedPosts.map((item, ind) => (
                        <li
                            key={`${item.id}_${ind}`}
                            onClick={() => handleItemClick(item, ind)}
                        >
                            <div className={classes.counter}>
                                <span>{ind + 1}</span>
                            </div>
                            <div>{item.judged_post_date_count}/25</div>
                            <div className={classes.checkboxHolder}>
                                <Form.Check
                                    type="checkbox"
                                    className={`custom-checkbox ${ind === 0 ? "no-cross" : ""}`}
                                    checked={item.status}
                                    readOnly
                                />
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            <Modal
                show={showAgreeModal}
                onHide={() => setShowAgreeModal(false)}
                className={classes.infoModal}
                size="sm"
                centered
            >
                <Modal.Header className="justify-content-end">
                    <span
                        className={classes.closeBtn}
                        onClick={() => {setShowAgreeModal(false)}}
                    >
                        <LiaTimesSolid />
                    </span>
                </Modal.Header>
                <Modal.Body className="m-0">
                    <h4 className='title'>Judge</h4>
                    <p className='text'>
                        To qualify for coin rewards, you need to judge 25 memes per day
                    </p>
                    <Button
                        onClick={() => {
                            setShowAgreeModal(false);
                            if (selectedCount !== null) {
                                nextPage(selectedCount);
                            }
                        }}
                    >
                        Agree
                    </Button>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default History;
