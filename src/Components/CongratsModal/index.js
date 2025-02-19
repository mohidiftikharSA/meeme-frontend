import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { LiaTimesSolid } from "react-icons/lia";
import clapping from "../../Images/clapping.png";
import winnerbox from "../../Images/winner-box.png";
import Cup from "../../Images/tournamentCup.png";
import EarnCoinsModal from "Components/EarnCoinsModal";

const CongratsModal = ({ notification, type,...props }) => {
  const [modalShow, setModalShow] = useState(false);

  const clickHandler = () => {
    setModalShow(true)
    props.onHide()
  }
  return (
    <>
      <Modal
        className={"infoModal"}
        {...props}
        size="sm"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header className="justify-content-end header">
          <span className={"closeBtn"} onClick={clickHandler}>
            <LiaTimesSolid />
          </span>
        </Modal.Header>
        <Modal.Body className={`m-0 congrats ${type === 'tournament_winner' ? 'tournament' : 'coins_winner'}`}>
          <div
            className="imgBox mb-4"
            style={{ width: "75px", margin: "auto", marginTop: "150px" }}
          >
          </div>
          <div className="congrats_text">
            <h4 className="title">Congratulations</h4>
            <p className="m-0">{notification ? notification.body : " You Earn 50 coins for judging!"}</p>
          </div>
        </Modal.Body>
      </Modal>
      {!notification && <EarnCoinsModal show={modalShow} onHide={() => setModalShow(false)} />}
    </>
  );
};

export default CongratsModal;
