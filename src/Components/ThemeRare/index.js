import React from "react";
import coin from "../../Images/coin.png";
import { Link } from "react-router-dom";
import classes from "./index.module.scss";
import { Col, Row } from "react-bootstrap";

const ThemeRare = ({ data2, card }) => {
  return (
    <Row>
      {data2.map((item, ind) => {
        return (
          <Col md={4} key={ind} className={classes.col} >
            <div className={`${classes.themeHolder}  ${card&& `tab-card-box`}`}>
              {card ? <h6>{item.title}</h6> : ""}
              <div className={"imgBox mb-3"}>
                <img src={item.img} alt="img" />
              </div>

             {
                card? 
                ""
                :
                <Link
                className={"btn iconBtncust"}
                style={{ maxWidth: "85px", height: "30px" }}
              >
                <img width={100} src={coin} alt="icon" />
                <span className={"text"}>{item.coin}</span>
              </Link>
             }
            </div>
          </Col>
        );
      })}
    </Row>
  );
};

export default ThemeRare;
