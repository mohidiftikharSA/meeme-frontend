import React, { useState } from "react";
import { Dropdown } from "react-bootstrap";
import { BiMenuAltLeft } from "react-icons/bi";
import { RxCross1 } from "react-icons/rx";
import Navigation from "Components/Nav";
import AccordianData from "Components/Accordian";
import ProfileSetting from "Pages/ProfileSetting";
import Profile from "../../Images/Profile.png";
import setting from "../../Images/setting.png";
import Wallet from "../../Images/Wallet.png";
import Notification from "../../Images/Notification.png";
import support from "../../Images/support.png";
import Faq from "../../Images/Faq.png";
import Logout from "../../Images/Logout.png";

export const Aside = ({isActive, toggleActive}) => {
 
  return (
    <>
       <span
        className={`px-4 nav-opener ${isActive ? "active" : ""}`}
        onClick={toggleActive}
      >
        <BiMenuAltLeft className={`${isActive? 'd-none' : "d-block"}`} />
        <RxCross1 className={`${isActive? 'd-block' : "d-none"}`} />
      </span>
      <aside className={`px-4 ${isActive ? "active" : ""}`} id={"aisde"}>
        <div className="d-flex flex-column justify-content-between h-lg-100 h-auto pb-5">
          <div className="w-100">
            <Navigation />
            <AccordianData responsive />
            <div className="d-xl-none d-block">
              <AccordianData following responsive />
            </div>
          </div>
          <Dropdown className="navDropdown py-lg-0 py-5">
            <Dropdown.Toggle
              variant="success"
              id="dropdown-basic"
              style={{
                fontSize: "14px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <img src={setting} style={{ marginRight: "8px" }} alt="Profile" />{" "}
              Setting
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href="/profile-setting">
                <span>
                  <img src={Profile} alt="Profile" />
                </span>
                Account Details
              </Dropdown.Item>
              <Dropdown.Item href="/profile-setting">
                <span>
                  <img src={Wallet} alt="Wallet" />
                </span>
                Billing Details
              </Dropdown.Item>
              <Dropdown.Item href="/profile-setting">
                <span>
                  <img src={Notification} alt="Notification" />
                </span>
                Notifications
              </Dropdown.Item>
              <Dropdown.Item href="/profile-setting">
                <span>
                  <img src={support} alt="support" />
                </span>
                Support
              </Dropdown.Item>
              <Dropdown.Item href="/profile-setting">
                <span>
                  <img src={Faq} alt="Faq" />
                </span>
                FAQ
              </Dropdown.Item>
              <Dropdown.Item href="/profile-setting">
                <span>
                  <img src={Logout} alt="Logout" />
                </span>
                Log Out
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </aside>
    </>
  );
};
