import AccordianData from "Components/Accordian";
import Navigation from "Components/Nav";
import React from "react";
import { Dropdown } from "react-bootstrap";
import Profile from "../../Images/Profile.png"
import setting from "../../Images/setting.png"
import Wallet from "../../Images/Wallet.png"
import Notification from "../../Images/Notification.png"
import support from "../../Images/support.png"
import Faq from "../../Images/Faq.png"
import Logout from "../../Images/Logout.png"
export const Aside = () => {
  return (
    <>
      <aside className="px-4" id={"aisde"}>
        <div className="d-flex  flex-column justify-content-between h-100 pb-5">
          <div className="w-100">
            <Navigation />
            <AccordianData />
          </div>
          <Dropdown className="navDropdown">
                <Dropdown.Toggle   variant="success" id="dropdown-basic" style={{fontSize:'14px',display:"flex",alignItems:"center"}}>
                <img src={setting} style={{marginRight:"8px"}} alt="Profile"/> Setting
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item href="#/action-1"><span><img src={Profile} alt="Profile"/></span>Account Details</Dropdown.Item>
                  <Dropdown.Item href="#/action-2"><span><img src={Wallet} alt="Wallet"/></span>Billing Details</Dropdown.Item>
                  <Dropdown.Item href="#/action-3"><span><img src={Notification} alt="Notification"/></span>Notifications</Dropdown.Item>
                  <Dropdown.Item href="#/action-3"><span><img src={support} alt="support"/></span>Support</Dropdown.Item>
                  <Dropdown.Item href="#/action-3"><span><img src={Faq} alt="Faq"/></span>FAQ</Dropdown.Item>
                  <Dropdown.Item href="#/action-3"><span><img src={Logout} alt="Logout"/></span>Log Out</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
        </div>
      </aside>
    </>
  );
};
