import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import classes from "./index.module.scss";
import coin from "../../Images/coin.png";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import shuffle from "../../Images/shuffle.png";
import logo from "../../Images/logo.png";

const BuyCoin = ({ purchase }) => {
  const [sliderValue, setSliderValue] = useState(7412); // Initial value
  const minValue = 1;
  const maxValue = 14000;

  const handleSliderChange = (newValue) => {
    setSliderValue(newValue);
  };

  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    if (inputValue === "") {
      setSliderValue(""); // Clear the slider value when input is empty
    } else {
      const newValue = parseInt(inputValue);
      if (!isNaN(newValue) && newValue >= minValue && newValue <= maxValue) {
        setSliderValue(newValue);
      } else if (newValue < minValue) {
        setSliderValue(minValue);
      } else {
        setSliderValue(maxValue);
      }
    }
  };

  return (
    <>
      {purchase ? (
        <div className="text-center mb-5">
          <img width={"100px"} src={logo} alt="img" />
        </div>
      ) : (
        <h6 className="mb-3">Amount</h6>
      )}
      <div className={`${classes.box} ${purchase && `${classes.box} ${classes.cardBox}`}`}>
        <div className={classes.header}>
          <img width={"40"} src={coin} alt="coin" />
          <h3>{sliderValue}</h3>
        </div>

        <div className="px-2">
          {purchase ?
            <>

            </> : (
              <>
                <Slider
                  min={minValue}
                  max={maxValue}
                  value={sliderValue}
                  onChange={handleSliderChange}
                  className="mb-3"
                />
                <div className="d-flex align-items-center justify-content-between">
                  <p><span style={{marginRight:'5px'}}><img width={"20"} src={coin} alt="coin" /></span>0</p>
                  <p>14,000<span style={{marginLeft:'5px'}}><img width={"20"} src={coin} alt="coin" /></span></p>
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
                value={sliderValue}
                onChange={handleInputChange}
                className={classes.buyCoinInput}
              />
              {purchase ? (
                ""
              ) : (
                <div className={classes.currencyBox}>
                  <img width={"22px"} src={coin} alt="coin" />
                  USD
                </div>
              )}
            </Form.Group>

            <Button className="w-75 fs-6">Top Up</Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default BuyCoin;
