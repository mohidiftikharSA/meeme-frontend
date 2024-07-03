import React, { useState } from "react";
import coin from "../../Images/coin.png";
import { Link } from "react-router-dom";
import classes from "./index.module.scss";
import { Col, Row } from "react-bootstrap";
import ThemesAPIs from "../../APIs/amazonCard";
import Loader from "Components/Loader";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { coinsUsed } from "Redux/reducers/buyCoins";
import { coinConvert } from "Helper/Converters";


const ThemeRare = ({ data2, card , purchasedList}) => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch()

  const buyTheme = async (name, amount) => {
    setIsLoading(true);
    try {
      console.log("buyTheme ", name, amount);
      const buy = await ThemesAPIs.buyItem({ name, amount });
      if (buy) {
        console.log("Theme Purshased Successfully ",buy.data?.message);
        if(buy.data?.message === 'Item Exists'){
          toast.error(buy.data?.message)
        }else{
          toast.success(buy.data?.message)
          dispatch(coinsUsed(amount));
        }
      }
    } catch (error) {
      console.log("Error in Theme buy =", error);
      toast.error("Try Again After Some time")
    }
   
    setIsLoading(false);
  };

  function isItemPurchase(nameToCheck) {
    return purchasedList?.some(obj => obj.name.includes(nameToCheck));
}

  return (
    <>
      {isLoading && <Loader isLoading={isLoading} />}
      <Row>
        {data2.map((item, ind) => {
          return (
            <Col md={4} sm={6} key={ind} className={classes.col}>
              <div
                className={`${classes.themeHolder}  ${card && `tab-card-box`}`}
              >
                {card ? <h6>{item.title}</h6> : ""}
                <div className={"imgBox mb-3"}>
                  <img src={item.path || item?.theme_image} alt="img" />
                </div>

                {card ? (
                  ""
                ) : (
                  <button
                    onClick={() => {
                      buyTheme(item?.ref, item?.coin);
                      const isExist  = isItemPurchase('rare1');
                      console.log("Is exist item -- ", isExist, '---Array---', purchasedList);

                    }}
                    className={`btn ${isItemPurchase(item?.ref) ? 'purchasedPill':'iconBtncust'} `}
                    // style={{ maxWidth: "85px", height: "30px" }}
                    disabled={isItemPurchase(item?.ref)}
                  >
                    {!isItemPurchase(item?.ref) && <img width={100} src={coin} alt="icon" />}
                    <span className={"text"}>{isItemPurchase(item?.ref) ? 'Purchased' :coinConvert(item.coin)}</span>
                  </button>
                )}
              </div>
            </Col>
          );
        })}
      </Row>
    </>
  );
};

export default ThemeRare;
