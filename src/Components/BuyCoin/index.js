import React, { useState } from "react";
import { Accordion, Button, Form } from "react-bootstrap";
import classes from "./index.module.scss";
import coin from "../../Images/coin.png";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import shuffle from "../../Images/shuffle.png";

const BuyCoin = () => {
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
    <Accordion.Body className="p-2 pt-1 pb-3">
      <h6 className="mb-3">Amount</h6>
      <div className={classes.box}>
        <div className={classes.header}>
          <img width={"40"} src={coin} alt="coin" />
          <h3>{sliderValue}</h3>
        </div>

        <div className="px-2">
          <Slider
            min={minValue}
            max={maxValue}
            value={sliderValue}
            onChange={handleSliderChange}
            className="mb-3"
          />
          <div className={classes.inputBox}>
            <span style={{ cursor: "pointer" }}>
              <img width={20} className="mb-3" src={shuffle} alt="icon" />
            </span>
            <Form.Group className="form-group">
              <Form.Control
                type="number"
                min={minValue}
                max={maxValue}
                value={sliderValue}
                onChange={handleInputChange}
                className={classes.buyCoinInput}
              />
              <div className={classes.currencyBox}>
                <img width={"22px"} src={coin} alt="coin" />
                USD
              </div>
            </Form.Group>

            <Button className="w-75 fs-6">Top Up</Button>
          </div>
        </div>
      </div>
    </Accordion.Body>
  );
};

export default BuyCoin;
