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


const ThemeRare = ({ data2, card }) => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch()

  const buyTheme = async (name, amount) => {
    setIsLoading(true);
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
    setIsLoading(false);
  };
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
                  <img src={item.path} alt="img" />
                </div>

                {card ? (
                  ""
                ) : (
                  <Link
                    onClick={() => {
                      buyTheme(item?.ref, item?.coin);
                    }}
                    className={"btn iconBtncust"}
                    style={{ maxWidth: "85px", height: "30px" }}
                  >
                    <img width={100} src={coin} alt="icon" />
                    <span className={"text"}>{coinConvert(item.coin)}</span>
                  </Link>
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
