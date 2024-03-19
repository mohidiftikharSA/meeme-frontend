import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import icon from "../../Images/coin.png";
import classes from "./index.module.scss";
import SuccessPurchase from "Components/SuccessPurchase";
import { useDispatch } from "react-redux";
import { coinsBuy } from "Redux/reducers/buyCoins";

const PurchaseModal = (props) => {
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
  };

  const dispatch = useDispatch();

  const handleBuyClick = () => {
    setShowSuccessModal(true);
    props?.buycoin();
    console.log(props.selectedcoin.coin, "props.selectedcoin.coin");
    dispatch(coinsBuy(props.selectedcoin.coin));
    props.onHide();
  };

  // const priceINT = parseInt(props?.selectedcoin?.price);

  return (
    <>
      <Modal
        className={"transparentModa"}
        {...props}
        size="sm"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <div className="mb-3">
            <img width={"60px"} src={icon} alt="icon" />
          </div>
          <h2 className="grad-text fw-bold">{props?.selectedcoin?.coin}</h2>
          <p className="text-light fw-bold">
            are you sure you want to buy {props?.selectedcoin?.coin} coins for $
            {parseInt(props?.selectedcoin?.price)}?
          </p>
          <div className={classes.btnBox}>
            <Button onClick={handleBuyClick}>Buy</Button>
            <Button onClick={props.onHide}>Deny</Button>
          </div>
        </Modal.Body>
      </Modal>
      {/* {props.flag ? (
        <></>
      ) : (
        <SuccessPurchase
          show={showSuccessModal}
          onHide={handleCloseSuccessModal}
        />
      )} */}
    </>
  );
};

export default PurchaseModal;
