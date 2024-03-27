import React, { useEffect, useState } from "react";
import classes from "./index.module.scss";
import { Card, Col, Row } from "react-bootstrap";
import coin from "../../Images/coin.png";
import { Link } from "react-router-dom";
import PurchaseModal from "Components/PurchaseModal";
import AuthAPIs from "../../APIs/auth";
import CoinsAPIs from "../../APIs/coins";
import { useDispatch, useSelector } from "react-redux";
import { coinsBuy } from "Redux/reducers/buyCoins";
import { toast } from "react-toastify";
import Loader from "Components/Loader";
import { useLocation } from "react-router-dom";
import SuccessPurchase from "Components/SuccessPurchase";

const CoinCard = ({ data }) => {
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const [coinsPrices, setCoinsPrices] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();
  const myCoins = useSelector((state) => state.coins);


  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const amount = searchParams.get("amount");
    const coins = searchParams.get("coins");

    let curr_coins = myCoins?.allCoins;
    if (amount && coins) {
      curr_coins = parseInt(curr_coins) +  parseInt(coins)
      dispatch(coinsBuy(curr_coins));
      setShowSuccessModal(true);
    }
  }, [location.search]);

  const handleClosePurchaseModal = () => {
    setShowPurchaseModal(false);
  };                                                                                        
  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
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


  const buyCoins = async (name, amount) => {
    try {
      setIsLoading(true);
      const res = await CoinsAPIs.createCheckoutSession({
        product_name: name,
        amount: amount,
      });
      if (res) {
        setIsLoading(false);
        window.location.href = res.data.session_url;
      }
    } catch (error) {
      toast.error("Error Buying Coins");
    }
    setIsLoading(false);
  };

  return (
    <>
      <Loader isLoading={isLoading} />
      <Row className="mb-4">
        {coinsPrices.map((item, ind) => {
          return (
            <Col md={3} sm={4} xs={6} key={ind} className="mb-3">
              <Card className={classes.cardHolder}>
                <div className={"imgBox "}>
                  <img src={coin} alt="img" />
                </div>
                <h5>{item.coin || item.coins}</h5>
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
        coinsprices={[coinsPrices]}
        show={showPurchaseModal}
        onHide={handleClosePurchaseModal}
        buycoins={buyCoins}
        // flag={allCards.status === 404}
      />
      {showSuccessModal && (
        <SuccessPurchase
          show={showSuccessModal}
          onHide={handleCloseSuccessModal}
        />
      )}
    </>
  );
};

export default CoinCard;
