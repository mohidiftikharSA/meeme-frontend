import React, { useState } from "react";
import classes from "./index.module.scss";
import { Card, Col, Row } from "react-bootstrap";
import coin from "../../Images/coin.png";
import { Link } from "react-router-dom";
import PurchaseModal from "Components/PurchaseModal";

const CoinCard = ({ data }) => {
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);

  const handleClosePurchaseModal = () => {
    setShowPurchaseModal(false);
  };

  return (
    <>
      <Row className="mb-4">
        {data.map((item, ind) => {
          return (
            <Col md={3} key={ind}>
              <Card className={classes.cardHolder}>
                <div className={"imgBox "}>
                  <img src={coin} alt="img" />
                </div>
                <h5>{item.coin}</h5>
                <Link
                  onClick={() => setShowPurchaseModal(true)}
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
      <PurchaseModal
        show={showPurchaseModal}
        onHide={handleClosePurchaseModal}
      />
    </>
  );
};

export default CoinCard;
