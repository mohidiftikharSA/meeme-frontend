import React, { useEffect, useState } from "react";
import Heading from "Components/Heading";
import { Card } from "react-bootstrap";
import coin from "../../Images/coin.png";
import classes from "./index.module.scss";
import { Link } from "react-router-dom";
import CoinsAPI from "../../APIs/coins";

const Transaction = ({ data, noCard }) => {
  const [coinsHistory, setCoinsHistory] = useState([]);

  const getHistory = async () => {
    try {
      const res = await CoinsAPI.transactions();

      const formattedHistory = res?.data?.total_history.map((item) => {
        const date = new Date(item.created_at);
        const options = { year: "numeric", month: "short", day: "2-digit" };
        const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
          date
        );
        return { ...item, created_at: formattedDate };
      });
      setCoinsHistory(formattedHistory, "transaction res");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getHistory();
  }, []);

  return (
    <Card className={`${noCard ? classes.cardBox : "profileCard"}`}>
      {noCard ? (
        <>
          <div className={classes.headingBox}>
            <h5 className="mb-0">Purchasing History</h5>
            <Link href={""}>View all</Link>
          </div>
        </>
      ) : (
        <Heading title={"Transaction History"} noLink />
      )}
      <ul
        className={`${classes.transaction} ${noCard && `${classes.minHeight}`}`}
      >
        {coinsHistory?.map((item, ind) => {
          return (
            <li key={ind}>
              <div className={classes.head}>
                <img src={coin} alt="coin"></img>
                <p className={classes.title}>{item.coins}</p>
              </div>
              <span>{item.created_at}</span>
            </li>
          );
        })}
      </ul>
    </Card>
  );
};

export default Transaction;
