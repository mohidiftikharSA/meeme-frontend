import React from "react";
import { Card, } from "react-bootstrap";
import amazon from "../../Images/Amazonicon.png";
import classes from "./index.module.scss"
import { Link } from "react-router-dom";
import coin from "../../Images/coin.png"

const GiftCard = ({ data }) => {
  return (
    <>
     <h5 className='py-3 mb-0'>Gift cards</h5>
      <div className={classes.cardHolder}>
        {data.map((item, ind) => {
          return (
            <div className={classes.item}>
              <Card className="mb-3">
                <div className={classes.box}>
                  <small className="text-light"><b>{item.price}</b></small>
                  <div className={classes.icon}>
                  <img width={35} src={amazon} alt="icon" />
                  </div>
                </div>
              </Card>
              <Link  className={`btn ${classes.iconBtn}`}>
                <img src={coin} alt="icon" />
                <span className={classes.text}>{item.coin}</span>
              </Link>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default GiftCard;
