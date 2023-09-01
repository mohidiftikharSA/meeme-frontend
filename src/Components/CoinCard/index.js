import React, { useState } from "react";
import classes from "./index.module.scss";
import { Card, Col, Row } from "react-bootstrap";
import coin from "../../Images/coin.png";
import { Link } from "react-router-dom";
import PurchaceModal from "Components/PurchaseModal";
const CoinCard = ({ data }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(!show);
  };
  return (
    <>
      <Row className="mb-4">
        {data.map((item, ind) => {
          return (
            <Col md={3}>
              <Card className={classes.cardHolder}>
                <div className={"imgBox "}>
                  <img src={coin} alt="img" />
                </div>
                <h5>{item.coin}</h5>
                <Link
                  onClick={handleClose}
                  
                  className={"btn iconBtncust w-100"}
                  style={{ maxWidth: "100%" }}
                >
                  <span className={"text"}>Buy for ${item.price}</span>
                </Link>
              </Card>
            </Col>
          );
        })}
      </Row>
      <PurchaceModal show={show} onHide={() => setShow(false)} />
    </>
  );
};

export default CoinCard;
