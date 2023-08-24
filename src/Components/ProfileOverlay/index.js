import React from "react";
import coin from "../../Images/coin.png";
import { Link } from "react-router-dom";
import { Col, Row } from "react-bootstrap";

const ProfileOverlay = ({ data }) => {
    return (
        <Row>
            {data.map((item, ind) => {
                return (
                    <Col md={4} key={ind}>
                        <div className={"imgBox mb-3"}>
                            <img src={item.img} alt="img" />
                        </div>
                        <Link
                            className={"btn iconBtncust"}
                            style={{ maxWidth: "85px", height: "30px" }}
                        >
                            <img width={100} src={coin} alt="icon" />
                            <span className={"text"}>{item.coin}</span>
                        </Link>
                    </Col>
                );
            })}
        </Row>
    );
};

export default ProfileOverlay;
