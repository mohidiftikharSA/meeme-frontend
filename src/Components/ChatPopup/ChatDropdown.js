import React, { useState } from "react";
import { BsFillChatDotsFill } from "react-icons/bs";
import Dropdown from "react-bootstrap/Dropdown";
import classes from "./index.module.scss";
import avatar from "../../Images/avatar.png";
import { timeAgo } from "../../Helper/Converters";


const ChatDropdown = ({
    isDropdownOpen,
    toggleDropdown,
    countOnlineUsers,
    isOpen,
    inboxList,
    isWideScreen,
    handleClick,
    user
}) => {
    return (<Dropdown
        className={`chatDropDown ${isDropdownOpen ? "show" : ""}`}
        show={isDropdownOpen}
        onToggle={isOpen}
    >
        <Dropdown.Toggle variant="success" id="dropdown-basic" onClick={toggleDropdown}>
            {isWideScreen ? (<>
                <span className="status d-inline-block me-2"></span> Chat ({countOnlineUsers()} Active)
            </>) : (<BsFillChatDotsFill size={"18px"} />)}
        </Dropdown.Toggle>
        <Dropdown.Menu onClick={(e) => e.stopPropagation()}>
            {isDropdownOpen && (<div className={classes.inbox}>
                <p className="inboxText">Inbox</p>
                <ul>
                    {inboxList.map((item, ind) => {
                        return (<li key={`${ind}_${item.id}`} onClick={() => {
                            handleClick(item)
                        }}>
                            <div className={classes.messageBox}>
                                <div className={classes.imgBox}>
                                    {item?.receiver_image || item?.sender_image ? <img
                                        src={(item?.sender_id === user.id ? item?.receiver_image : item?.sender_image) || avatar}
                                        alt={"img 11"} /> : <img src={avatar} alt="img" />}
                                    {item?.sender_id === user.id ? item?.receiver_active_status && (<span className="status"></span>) : item?.sender_active_status && (<span className="status"></span>)}
                                </div>

                                <div className={classes.textBox}>
                                    <div className="d-flex align-items-start justify-content-between">
                                        <h6>{item?.sender_id === user.id ? item?.receiver_name : item?.sender_name} </h6>

                                    </div>

                                    <p className="text-truncate"
                                        style={{ maxWidth: "120px" }}>{item?.body}</p>
                                    <span className="d-block text-end"
                                        style={{ fontSize: "8px" }}>{timeAgo(item?.created_at)}</span>
                                </div>
                            </div>
                        </li>);
                    })}
                </ul>
            </div>)}
        </Dropdown.Menu>
    </Dropdown>);
};

export default ChatDropdown;
