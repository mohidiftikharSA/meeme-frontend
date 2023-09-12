import React from "react";
import coin from "../../Images/coin.png";
import { Link } from "react-router-dom";
import { Col, Row } from "react-bootstrap";
import classes from "./index.module.scss";

const BackgroundOverlay = ({ data,noCoin }) => {
    return (
        <Row>
            {data.map((item, ind) => {
                return (
                    <Col md={4} sm={6} key={ind} className="mb-md-0 mb-3">
                       <div className={`${noCoin&& `tab-card-box`}`}>
                       {noCoin ? <h6>{item.title}</h6> : ""}
                       <div className={`imgBox mb-3 ${classes.imgBox}`}>
                            <img src={item.img} alt="img" />
                        </div>
                        {
                            noCoin?
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

export default BackgroundOverlay;
