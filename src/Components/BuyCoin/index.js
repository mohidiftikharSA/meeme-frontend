import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import classes from "./index.module.scss";
import coin from "../../Images/coin.png";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import shuffle from "../../Images/shuffle.png";
import logo from "../../Images/logo.png";
import { useDispatch, useSelector } from "react-redux";
import CoinsAPIs from "../../APIs/coins";
import { coinsBuy } from "Redux/reducers/buyCoins";
import { toast } from "react-toastify";
import Loader from "Components/Loader";

const BuyCoin = ({ purchase }) => {
  const [sliderValue, setSliderValue] = useState(0);
  const [calVal, setCalVal] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const minValue = 0;
  const maxValue = 14000;

  const dispatch = useDispatch();

  const handleSliderChange = (newValue) => {
    setSliderValue(newValue);
    const newCalculatedValue =
      newValue === 0 ? 0 : (newValue * 0.0005).toFixed(2);
    setCalVal(newCalculatedValue);
  };

  const buyCoins = async () => {
    try {
      if(calVal === 0 || isNaN(calVal)){
        toast.error("Please Select Price.");
        return;
      }
      setIsLoading(true);
      console.log("slider vale  == ", sliderValue);
      console.log("calVal vale  == ", parseFloat(calVal));
      const res = await CoinsAPIs.createCheckoutSession({
        product_name: sliderValue,
        amount: parseFloat(calVal),
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

  const handleInput = async(e)=>{
    setCalVal(e.target.value);
    const numberOfCoins = e.target.value === 0 ? 0 : (e.target.value / 0.0005).toFixed(2);
    setSliderValue(Math.round(numberOfCoins));
  }

  return (
    <>
      {isLoading && <Loader isLoading={isLoading} />}
      {purchase ? (
        <div className="text-center mb-5">
          <img width={"100px"} src={logo} alt="img" />
        </div>
      ) : (
        <h6 className="mb-3">Amount</h6>
      )}
      <div
        className={`${classes.box} ${
          purchase && `${classes.box} ${classes.cardBox}`
        }`}
      >
        <div className={classes.header}>
          <img width={"40"} src={coin} alt="coin" />
          <h3>{sliderValue}</h3>
        </div>

        <div className="px-2">
          {purchase ? (
            <></>
          ) : (
            <>
              <Slider
                min={minValue}
                max={maxValue}
                value={sliderValue}
                onChange={handleSliderChange}
                className="mb-3"
              />
              <div className="d-flex align-items-center justify-content-between">
                <p>
                  <span style={{ marginRight: "5px" }}>
                    <img width={"20"} src={coin} alt="coin" />
                  </span>
                  0
                </p>
                <p>
                  14,000
                  <span style={{ marginLeft: "5px" }}>
                    <img width={"20"} src={coin} alt="coin" />
                  </span>
                </p>
              </div>
            </>
          )}
          <div className={classes.inputBox}>
            {purchase ? (
              ""
            ) : (
              <span style={{ cursor: "pointer" }}>
                <img width={20} className="mb-3" src={shuffle} alt="icon" />
              </span>
            )}
            <Form.Group className="form-group">
              <Form.Control
                type="number"
                min={minValue}
                max={maxValue}
                value={calVal}
                // value={inputValue}
                // value={calVal}
                placeholder="0"
                onChange={handleInput}
                className={classes.buyCoinInput}
              />
              {purchase ? (
                ""
              ) : (
                <div className={classes.currencyBox}>
                  <img width={"22px"} src={coin} alt="coin" />
                  £
                </div>
              )}
            </Form.Group>

            <Button className="w-75 fs-6" onClick={buyCoins}>
              Top Up
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default BuyCoin;
