import React, { useEffect, useState } from "react";
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
            {/* <Link href={""}>View all</Link> */}
          </div>
        </>
      ) : (
        <Heading title={"Transaction History"} noLink />
      )}
      <ul
        className={`${classes.transaction} ${noCard && `${classes.minHeight}`}`}
      >
        {data && data[0] ? (
          data?.map((item, ind) => {
            return (
              <li key={ind}>
                <div className={classes.head}>
                  <img src={coin} alt="coin"></img>
                  <p className={classes.title}>{item.coins}</p>
                </div>
                <span>{item.created_at}</span>
              </li>
            );
          })
        ) : (
          <p style={{ color: "white", textAlign: "center" }}>
            No Purchasing History Available
          </p>
        )}
      </ul>
    </Card>
  );
};

export default Transaction;
