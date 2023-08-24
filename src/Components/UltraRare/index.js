import React from "react";
import { Card, Col, Row } from "react-bootstrap";
import classes from "./index.module.scss";
import { Link } from "react-router-dom";
import coin from "../../Images/coin.png";
const UltraRare = ({ data , data2 }) => {
  return (
    <Row>
      {data.map((item, ind) => {
        return (
          <Col md={4} key={ind} className={classes.col}>
            <Card>
              <div className={classes.themeHolder}>
                <p className="mb-0">{item.title}</p>
                <div className={"imgBox mb-3"}>
                  <img height={'50px'} src={item.img} alt="img" />
                </div>

                <Link  className={"btn iconBtncust"} style={{maxWidth:'85px',height:"30px"}}>
                <img width={100} src={coin} alt="icon" />
                <span className={"text"}>{item.coin}</span>
              </Link>
              </div>
            </Card>
          </Col>
        );
      })}
    </Row>
  );
};

export default UltraRare;
