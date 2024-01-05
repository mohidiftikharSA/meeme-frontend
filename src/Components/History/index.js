import React, { useEffect, useState } from "react";
import classes from "./index.module.scss";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import EarnCoinsModal from "Components/EarnCoinsModal";

const historyData = [{
    days: "01", memeNo: "40", status: false,
}, {
    days: "02", memeNo: "100", status: true,
}, {
    days: "03", memeNo: "100", status: true,
}, {
    days: "04", memeNo: "100", status: true,
},];
const History = ({ tournamentData }) => {
    console.log(JSON.stringify(tournamentData));
    const [judgedPosts, setJudgedPosts] = useState([])
    const navigate = useNavigate();
    const nextPage = (count) => {
        navigate(`/judge?count=${count}`);
    };
    const hydrateFields = () => {
        const daysJudgedPosts = (tournamentData?.judged_posts ?? [])
            .sort((a, b) => new Date(b.post_date) - new Date(a.post_date));
        console.log("Posts# ", JSON.stringify(daysJudgedPosts))
        setJudgedPosts(daysJudgedPosts);

    }
    useEffect(() => {
        hydrateFields()
    }, [])
    return (<>
        <div className="my-4">
            <h5>History</h5>
            <ul className={classes.list}>
                <li>Days</li>
                <li>No. of Memes</li>
                <li>Status</li>
            </ul>
            <ul className={` ${classes.list} ${classes.historyList}`}>
                {judgedPosts.map((item, ind) => {
                    return (<li key={`${item.id}_${ind}`} onClick={() => { if (ind === 0) { nextPage(item.judged_post_date_count) } }}>
                        <div className={classes.counter}>
                            <span>{ind + 1}</span>
                        </div>
                        <div  >{item.judged_post_date_count}/100 </div>
                        <div className={classes.checkboxHolder}>
                            <Form.Check
                                type={"checkbox"}
                                className="custom-checkbox"
                                checked={item.status}
                            />
                        </div>
                    </li>);
                })}
            </ul>
        </div>
    </>
    );
};

export default History;
