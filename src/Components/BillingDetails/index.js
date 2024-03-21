import Heading from "Components/Heading";
import React, { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import classes from "./index.module.scss";
import wallet from "../../Images/Wallet.png";
import calender from "../../Images/Calendar.png";
import password from "../../Images/Password.png";
import api from "../../APIs/settings";
import NotificationService from "../../Services/NotificationService";
import { useSelector } from "react-redux";
import { loadStripe } from "@stripe/stripe-js";
// import {
//   CardElement,
//   Elements,
//   useStripe,
//   useElements,
// } from "@stripe/react-stripe-js";

const BillingDetails = ({ existingCardDetails }) => {
  const [cardDetails, setCardDetails] = useState({
    number: "",
    expiry: "",
    cvc: "",
  });

  // const stripe = useStripe();
  // const elements = useElements();
  const [error, setError] = useState(null);

  const { profile } = useSelector((state) => state.auth);
  const onChangeHandler = (event, type) => {
    setCardDetails((prevState) => {
      let inputValue = event.target.value;
      inputValue = inputValue.replace(/\D/g, "");
      if (type === "expiry") {
        if (inputValue.length > 2) {
          const month = inputValue.substring(0, 2);
          const year = inputValue.substring(2, 4);
          inputValue = `${month}/${year}`;
        }
      } else if (type === "number") {
        if (inputValue.length > 16) {
          inputValue = inputValue.substring(0, 16);
        }
      } else if (type === "cvc") {
        if (inputValue.length > 3) {
          inputValue = inputValue.substring(0, 3);
        }
      }
      return {
        ...prevState,
        [type]: inputValue,
      };
    });
  };
  const preparedAndValidateData = () => {
    const { number, expiry, cvc } = cardDetails;
    const [expiryMonth, expiryYear] = expiry.split("/");
    const currentYear = new Date().getFullYear() % 100;
    const currentMonth = new Date().getMonth() + 1;

    if (
      isNaN(expiryMonth) ||
      isNaN(expiryYear) ||
      parseInt(expiryYear, 10) < currentYear ||
      (parseInt(expiryYear, 10) === currentYear &&
        parseInt(expiryMonth, 10) < currentMonth)
    ) {
      NotificationService.showError("Invalid expiry date");
      return null;
    }

    const formattedNumber = number
      .replace(/\D/g, "")
      .replace(/(\d{4})/g, "$1 ");
    const names = profile.user.username.split(" ");
    return {
      number: formattedNumber.trim(),
      exp_month: expiryMonth,
      exp_year: expiryYear,
      first_name: names[0],
      last_name: names.slice(1)?.join(" "),
      cvc,
    };
  };
  const onClickSave = async (e) => {
    e.preventDefault();
    console.log("TODO");
    // const data = preparedAndValidateData();
    // console.log("Data in billinng ==", CardElement);
    // console.log("stripe ....", stripe);

    // if (!stripe || !elements) {
    //   // Stripe.js has not loaded yet. Make sure to disable form submission until Stripe.js has loaded.
    //   return;
    // }

    // const cardElement = elements.getElement(CardElement);
    // console.log("Create token --", cardElement);
    // setTimeout(async () => {
    //   console.log("After 3 sec");
    //   const { error, token } = await stripe.createToken(cardElement);
    //   console.log("[Token]", token)
    // }, 3000);

    // if (error) {
    //   console.log("[error]", error);
    // } else {
    //   // You can now use the token to make a payment or save it on your server
    // }

    // try {
    //   const data = preparedAndValidateData();
    //   if (data == null) {
    //     return;
    //   }
    //   const res = await api.addUserBillingCard(data);
    //   if (res.status === 200) {
    //     NotificationService.showSuccess("Billing details saved successfully.");
    //   } else {
    //     console.error("Error: Unexpected status code", res.status);
    //   }
    // } catch (error) {
    //   console.error("Error while fetching data:", error);
    // }
  };

  return (
    <Card className="profileCard">
      <Heading title={"Billing"} noLink />
      <div className={classes.billingHolder}>
        <h6>Card Number</h6>
        <div className={classes.box}>
          <img src={wallet} alt="img" width={25} />
          <input
            placeholder="1234 1234 1234 0123"
            name=""
            type="text"
            disabled={existingCardDetails?.number}
            className={classes.formControl}
            onChange={(event) => onChangeHandler(event, "number")}
            value={existingCardDetails?.number || cardDetails.number}
          />
        </div>
        <h6>Expiry Date</h6>
        <div className={classes.box}>
          <img src={calender} alt="img" width={25} />
          <input
            type="text"
            placeholder="mm/yy"
            className={classes.formControl}
            disabled={existingCardDetails?.expiry}
            value={existingCardDetails?.expiry || cardDetails.expiry}
            onChange={(event) => onChangeHandler(event, "expiry")}
          />
        </div>
        <h6>CVV Code</h6>
        <div className={`${classes.box} mb-4`}>
          <img src={password} alt="img" width={25} />
          <input
            placeholder="123"
            type="number"
            value={existingCardDetails?.cvc || cardDetails.cvc}
            onChange={(event) => onChangeHandler(event, "cvc")}
            className={classes.formControl}
          />
        </div>

        <Button
          disabled={existingCardDetails?.number}
          type="submit"
          className="w-100 authButton"
          onClick={onClickSave}
        >
          Save
        </Button>
      </div>
      {/* <form onSubmit={onClickSave}>
        <CardElement />
        {error && <div>{error}</div>}
        <button type="submit" disabled={!stripe}>
          Pay
        </button>
      </form> */}
    </Card>
  );
};

export default BillingDetails;
