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
import { loadStripe } from "@stripe/stripe-js";


const CoinCard = ({ data }) => {
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const [coinsPrices, setCoinsPrices] = useState([]);
  const [stripe, setStripe] = useState(null);
  
  const handleClosePurchaseModal = () => {
    setShowPurchaseModal(false);
  };
  
  useEffect(() => {
    getCoinPrices();
    
 
    const initializeStripe = async () => {
      const stripePromise = loadStripe(
        "pk_test_51JVDVdETiAUwBhfEIyI7d2Fb0V2cnYM0K6irquHFzUHITElhnVbKnZdc0kEprNaikLTyv8nBz6exFHbMnZOjQ81e003bqOrlqE"
      );
      const stripeObject = await stripePromise;
      setStripe(stripeObject);
    };
    initializeStripe();
  }, []);
  
  const getCoinPrices = async () => {
    const coins = await AuthAPIs.getcoinprices();
    if (coins) {
      setCoinsPrices(coins.data);
    }
  };

  const [selectedCoin, setSelectedCoin] = useState(null);

  const dispatch = useDispatch();
  
  const buyCoins = async () => {
    if (!stripe) {
      console.error("Stripe has not been initialized yet.");
      return;
    }
    try {
      const res = await CoinsAPIs.createCheckoutSession();
        // window.location.href = res.data.session_url
        window.open(res.data.session_url, '_blank');
        // const result = await stripe.redirectToCheckout({
        //   sessionId: res.data.sessionId,
        // });
        // console.log("Results ===", result);
    } catch (error) {
      console.error("Error during checkout:", error);
    }
  };
  
  
  // try {
  //   const resAllCard = await CoinsAPIs.fetchAllCard();
  //   const userCardData = resAllCard?.data?.user_cards[0];
  //   const priceInteger = parseInt(selectedCoin.price);
  //   const data = {
  //     amount_to_be_paid: priceInteger,
  //     card_id: userCardData?.card_id,
  //   };
  //   if (resAllCard.status === 404) {
  //     return console.log("404 Error");
  //   } else {
  //     const res = await CoinsAPIs.customerCharge(data);
  //     dispatch(coinsBuy(res?.data.coins));
  //     toast.success("Successfully Coins Buy");
  //   }
  // } catch (error) {
  //   console.log(error, "404 Error");
  // }
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
        selectedCoin={selectedCoin}
        coinsPrices={[coinsPrices]}
        show={showPurchaseModal}
        onHide={handleClosePurchaseModal}
        buyCoins={buyCoins}
        // flag={allCards.status === 404}
      />
    </>
  );
};

export default CoinCard;
