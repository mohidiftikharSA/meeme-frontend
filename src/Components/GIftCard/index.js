import React, { useState } from "react";
import { Card } from "react-bootstrap";
import amazon from "../../Images/amazon.png";
import classes from "./index.module.scss";
import { Link } from "react-router-dom";
import coin from "../../Images/coin.png";
import AmazonCardAPIs from "../../APIs/amazonCard";
import { toast } from "react-toastify";
import Loader from "Components/Loader";

const GiftCard = ({ data, setCardRemovalId }) => {
  const [isLoading, setIsLoading] = useState(false);

  const purshaseAmazonCard = async (id) => {
    setIsLoading(true);
    const buy = await AmazonCardAPIs.purchaseAmazonCard({ card_id: id });
    if (buy) {
      setCardRemovalId(id);
      console.log("Card buy ---", buy.data);
      toast.success("Amazon Card has been to you via Email");
    }
    setIsLoading(false);
  };

  return (
    <>
      <Loader isLoading={isLoading} />
      <h5 className="py-3 mb-0">Gift cards</h5>
      <div className={`${classes.cardHolder}`}>
        {data && data[0] ? data.map((item, ind) => {
          return (
            <div className={classes.item}>
              <Card className="mb-3">
                <div className={classes.box}>
                  <small className="text-light">
                    <b>$ {item?.amount}</b>
                  </small>
                  <div className={classes.icon}>
                    <img width={35} src={amazon} alt="icon" />
                  </div>
                </div>
              </Card>
              <Link
                className={"btn iconBtncust"}
                onClick={() => {
                  purshaseAmazonCard(item?.id);
                }}
              >
                <img src={coin} alt="icon" />
                <span className={"text"}>{item?.coin_price}</span>
              </Link>
            </div>
          );
        }): <p className="w-100" style={{textAlign:'center'}}>No Amazon Cards Available</p>}
      </div>
    </>
  );
};

export default GiftCard;
