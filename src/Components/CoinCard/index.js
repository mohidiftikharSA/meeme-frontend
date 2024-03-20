import React, { useEffect, useState } from "react";
import classes from "./index.module.scss";
import { Card, Col, Row } from "react-bootstrap";
import coin from "../../Images/coin.png";
import { Link } from "react-router-dom";
import PurchaseModal from "Components/PurchaseModal";
import AuthAPIs from "../../APIs/auth";
import CoinsAPIs from "../../APIs/coins";
import { useDispatch } from "react-redux";
import { coinsBuy } from "Redux/reducers/buyCoins";
import { toast } from "react-toastify";

const CoinCard = ({ data }) => {
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const [coinsPrices, setCoinsPrices] = useState([]);

  const handleClosePurchaseModal = () => {
    setShowPurchaseModal(false);
  };

  useEffect(() => {
    getCoinPrices();
  }, []);

  const getCoinPrices = async () => {
    const coins = await AuthAPIs.getcoinprices();
    if (coins) {
      setCoinsPrices(coins.data);
    }
  };

  const [selectedCoin, setSelectedCoin] = useState(null);

  const dispatch = useDispatch();

  const buycoin = async () => {
    try {
      const resAllCard = await CoinsAPIs.fetchAllCard();
      const userCardData = resAllCard?.data?.user_cards[0];
      const priceInteger = parseInt(selectedCoin.price);
      const data = {
        amount_to_be_paid: priceInteger,
        card_id: userCardData?.card_id,
      };
      console.log(resAllCard, "resAllCard");
      if (resAllCard.status == 404) {
        toast.success("Error");
      } else {
        const res = await CoinsAPIs.customerCharge(data);
        // console.log(res, "res");
        dispatch(coinsBuy(res?.data.coins));
        toast.success("Successfully Coins Buy");
      }
    } catch (error) {
      console.log(error, "404 Error");
    }
  };

  return (
    <>
      <Row className="mb-4">
        {coinsPrices?.map((item, ind) => {
          return (
            <Col md={3} sm={4} xs={6} key={ind} className="mb-3">
              <Card className={classes.cardHolder}>
                <div className={"imgBox "}>
                  <img src={coin} alt="img" />
                </div>
                <h5>{item.coin}</h5>
                <Link
                  onClick={() => {
                    setShowPurchaseModal(true);
                    setSelectedCoin(item);
                  }}
                  className={"btn iconBtncust w-100"}
                  style={{ maxWidth: "100%" }}
                >
                  <span className={"text"}>
                    Buy for ${Math.round(item.price)}
                  </span>
                </Link>
              </Card>
            </Col>
          );
        })}
      </Row>
      <PurchaseModal
        selectedcoin={selectedCoin}
        // coinsprices={[coinsPrices]}
        show={showPurchaseModal}
        onHide={handleClosePurchaseModal}
        buycoin={buycoin}
        // flag={allCards.status === 404}
      />
    </>
  );
};

export default CoinCard;
