import React, { useEffect, useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { logout } from "Redux/reducers/authSlice";
import { useNavigate } from "react-router-dom";
import AuthAPIs from "APIs/auth";


export const Aside = ({isActive, toggleActive}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { profile } = useSelector((state) => state.auth);


  /**
   * To Set the Active Status of the User
   */
  const active_status_change = async()=>{
    const data = {
      status: "false"
    }
    const response = await AuthAPIs.active_status_change(data);
    console.log("active_status_change response, ",response)
  }

  const logoutUser = () => {
    navigate('/')
    active_status_change();
    dispatch(logout());
    localStorage.removeItem("accessToken");
  };

  const handleDropdownItemClick = (text) => {
    navigate(`/profile-setting?text=${text}`);
  };
 
  return (
    <>
       <span
        className={`px-4 nav-opener ${isActive ? "active" : ""}`}
        onClick={toggleActive}
      >
        <BiMenuAltLeft size={'32px'} className={`${isActive? 'd-none' : "d-block"}`} />
        <RxCross1 size={'24px'} className={`${isActive? 'd-block' : "d-none"}`} />
      </span>
      <aside className={`px-3 aisde-box ${isActive ? "active" : ""}`} id={"aisde"}>
        <div className="asideHolder d-flex flex-column justify-content-between pb-5">
          <div className="w-100">
            <Navigation />
            <AccordianData responsive />
            <div className="d-xl-none d-block">
              <AccordianData following responsive />
            </div>
            <Dropdown className="navDropdown py-lg-0 py-3">
            <Dropdown.Toggle
              variant="success"
              id="dropdown-basic"
              style={{
                fontSize: "15px",
                display: "flex",
                alignItems: "center",
                margin:"25px 0",
              }}
            >
              <img src={setting} style={{ marginRight: "8px" }} alt="Profile" />{" "}
              Settings
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item  onClick={() => handleDropdownItemClick("account")}>
                <span>
                  <img src={Profile} alt="Profile" />
                </span>
                Account Details
              </Dropdown.Item>
              {/* <Dropdown.Item onClick={() => handleDropdownItemClick("billing")}>
                <span>
                  <img src={Wallet} alt="Wallet" />
                </span>
                Billing Details
              </Dropdown.Item> */}
              {/* <Dropdown.Item onClick={() => handleDropdownItemClick("notifications")}>
                <span>
                  <img src={Notification} alt="Notification" />
                </span>
                Notifications
              </Dropdown.Item> */}
              <Dropdown.Item onClick={() => handleDropdownItemClick("support")}>
                <span>
                  <img src={support} alt="support" />
                </span>
                Support
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handleDropdownItemClick("faq")}>
                <span>
                  <img src={Faq} alt="Faq" />
                </span>
                FAQ
              </Dropdown.Item>
              <Dropdown.Item onClick={logoutUser}>
                <span>
                  <img src={Logout} alt="Logout" />
                </span>
                Log Out
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          </div>
        </div>
      </aside>
    </>
  );
};
