import React from "react";
import classes from "./index.module.scss";
import { Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
    const nextPage = () => {
      navigate(`/judge`);
    };
  return (
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
    </div>
  );
};

export default History;
