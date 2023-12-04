import React, { useEffect, useState } from "react";
import classes from "./index.module.scss";
import { Card, Col, Row } from "react-bootstrap";
import coin from "../../Images/coin.png";
import { Link } from "react-router-dom";
import PurchaseModal from "Components/PurchaseModal";
import AuthAPIs from '../../APIs/auth';

const CoinCard = ({ data }) => {
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const [coinsPrices , setCoinsPrices] = useState([]);

  const handleClosePurchaseModal = () => {
    setShowPurchaseModal(false);
  };

  useEffect(()=>{
    getCoinPrices()
  },[])

  const getCoinPrices = async()=>{
    const coins = await AuthAPIs.getcoinprices();
    if(coins){
      setCoinsPrices(coins.data);
    }
  }

  



  return (
    <>
      <Row className="mb-4">
        {coinsPrices.map((item, ind) => {
          return (
            <Col md={3} sm={4} xs={6} key={ind} className="mb-3">
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
                  <span className={"text"}>Buy for ${Math.round(item.price)}</span>
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
