import React, { useState } from "react";
import classes from "./index.module.scss";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import EarnCoinsModal from "Components/EarnCoinsModal";

const historyData = [
  {
    days: "01",
    memeNo: "40",
    status: false,
  },
  {
    days: "02",
    memeNo: "100",
    status: true,
  },
  {
    days: "03",
    memeNo: "100",
    status: true,
  },
  {
    days: "04",
    memeNo: "100",
    status: true,
  },
];
const History = () => {
  const [modalShow, setModalShow] = useState(false);
  const navigate = useNavigate();
    const nextPage = () => {
      navigate(`/judge`);
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
      <ul className={` ${classes.list} ${classes.historyList}`}>
        {historyData.map((item, ind) => {
          return (
            <li onClick={nextPage}>
              <div className={classes.counter}>
                <span>{item.days}</span>
              </div>
              <div>{item.memeNo}/100</div>
              <div className={classes.checkboxHolder}>
                <Form.Check // prettier-ignore
                  type={"checkbox"}
                  className="custom-checkbox"
                  checked={item.status}
                />
              </div>
            </li>
          );
        })}
      </ul>
      <Button className='reset-btn w-100' onClick={() => setModalShow(true)}>Earn Coins</Button>
    </div>
    <EarnCoinsModal
        show={modalShow}
        onHide={() => setModalShow(false)} />
        </>
  );
};

export default History;
