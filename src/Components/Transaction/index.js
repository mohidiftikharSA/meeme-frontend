import React from "react";
import Heading from "Components/Heading";
import { Card } from "react-bootstrap";
import coin from "../../Images/coin.png";
import classes from "./index.module.scss";
import { Link } from "react-router-dom";

const Transaction = ({ data, noCard }) => {
  return (
    <Card className={`${noCard ? classes.cardBox : "profileCard"}`}>
      {noCard ? (
        <>
          <div className={classes.headingBox}>
            <h5 className="mb-0">Purchasing History</h5>
            <Link href={''}>View all</Link>
          </div>
        </>
      ) : (
        <Heading title={"Transaction History"} noLink/>
      )}
      <ul className={`${classes.transaction} ${noCard && `${classes.minHeight}`}`}>
        {data.map((item, ind) => {
          return (
            <li>
              <div className={classes.head}>
                <img src={coin} alt="coin"></img>
                <p className={classes.title}>{item.coins}</p>
              </div>
              <span>{item.date}</span>
            </li>
          );
        })}
      </ul>
    </Card>
  );
};

export default Transaction;
