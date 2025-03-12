import React, { useEffect, useState } from "react";
import { ButtonGroup, Dropdown, Nav, Navbar } from "react-bootstrap";
import { FaBars } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import coin from "../../Images/coin.png";
import avatar from "../../Images/Buy.png";
import home from "../../Images/Home (1).png";
import explore from "../../Images/expore.png";
import trophy from "../../Images/trophies.png";
import Buy from "../../Images/Buy.png";
import judge from "../../Images/judges.png";
import shop from "../../Images/shop.png";
import trophies from "../../Images/trophy (1) 1.png";
import classes from "./index.module.scss";
import { IoMdNotificationsOutline } from "react-icons/io";
import ab from "../../Images/ab.png";
import api from 'APIs/dashboard/home'
import dayjs from 'dayjs';
import { useDispatch, useSelector } from "react-redux";
import { coinConvert } from "Helper/Converters";
import CongratsModal from "Components/CongratsModal";
import { coinsBuy } from "Redux/reducers/buyCoins";
import AuthAPIs from "../../APIs/auth";

function Navigation({ header, footer }) {
    const location = useLocation();
    const { profile, user } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const { allCoins } = useSelector((state) => state.coins);
    const [modalShow, setModalShow] = useState(false);
    const dispatch = useDispatch();
    const [notificationMessage, setNotificationMessage] = useState('');
    const [notificationType, setNotificationType] = useState('');
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const isLinkActive = (path) => {
        return location.pathname === path ? 'active' : '';
    };

    const [isActive, setIsActive] = useState(false);

    const toggleActive = () => {
        setIsActive(!isActive);
    };
    const [notifications, setNotifications] = useState([]);
    const prepareNotifications = (_notifications) => {
        _notifications?.forEach(item => {
            //.filter(row => row.status === 'un_read')
            item?.data?.forEach(row => {
                setNotifications(prevState => {
                    return [...prevState, { ...row, date: dayjs(row.created_at).format('MMM DD, YYYY h:mm A') }];
                })
            })

        })
    }
    const fetchUserNotifications = async () => {
        const response = await api.getUserNotificationsList();
        if (response?.status == 200) {
            prepareNotifications(response.data.notifications)
        }
    }
    useEffect(() => {
        fetchUserNotifications()
        getCurrentUser();
        setDropdownOpen(false);
    }, [location]);

    const handleDeleteModal = () => {
        setModalShow(false);
    };

    const navigateToOtherProfile = (noti) => {
        console.log("Shoo noti", noti);
        if (noti.notification_type === 'tournament_winner' || noti.notification_type === 'tournament_judge') {
            console.log("noti ---", noti)
            setModalShow(true);
            setNotificationType(noti.notification_type);
            setNotificationMessage(noti);
        }else if(noti.notification_type === 'admin_chat'){
            navigate(`/profile-setting?text=support&ticket=${noti?.message_ticket}&conversation_id=${noti?.conversation_id}`)

        } else {
            navigate(`/otherProfile/${noti?.sender_id}`)
        }
    }

    const getCurrentUser = async () => {
        const res = await AuthAPIs.getCurrentUserProfile();
        if (res) {
            console.log("curret uusert  == ", res.data.profile?.user?.coins);
            if (res.data.profile?.user?.coins)
                dispatch(coinsBuy(res.data.profile?.user?.coins));
        }
    }

    return (
        <>
            <CongratsModal notification={notificationMessage} type={notificationType} show={modalShow} onHide={handleDeleteModal} />
            <Navbar
                expand="lg"
                className={header ? "navBar" : "navBar aside pt-lg-5 pb-lg-3 py-3"}
            >
                {header ? (<>
                    <span
                        onClick={toggleActive}
                        className={`${isActive ? "d-none" : "d-block"}`}
                    >
                        <FaBars className="custom-icon1" />
                    </span>
                    <Navbar className={`responsive-nav ${isActive ? "active" : ""}`}>
                        <span
                            onClick={toggleActive}
                            className={`${isActive ? "d-block" : "d-none"}`}
                        >
                            <IoClose className="custom-icon2" />
                        </span>

                        <Nav className="me-auto flex-lg-row flex-column">
                            <Nav.Link as={Link} to="/home" className={isLinkActive('/home')}>
                                <img src={home} alt="icon" />
                                Home
                            </Nav.Link>
                            <Nav.Link as={Link} to="/explore" className={isLinkActive('/explore')}>
                                <img src={explore} alt="icon" />
                                Explore
                            </Nav.Link>
                            <Nav.Link as={Link} to="/tornament/tournament" className={isLinkActive('/tornament')}>
                                <img src={trophy} alt="icon" />
                                Tournament
                            </Nav.Link>
                            <Nav.Link as={Link} to="/tornament/store" className={isLinkActive('/BuyCoin')}>
                                <img src={Buy} alt="icon" />
                                Store
                            </Nav.Link>
                            <span className="notification">
                                <Dropdown show={dropdownOpen} onToggle={() => setDropdownOpen(!dropdownOpen)}>
                                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                                        <span className="bell-icon"> <IoMdNotificationsOutline /></span>
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        <ul style={{ overflowY: 'auto', maxHeight: '400px' }}>
                                            <span className="list">
                                                <p className="white">
                                                    Notifications
                                                </p>
                                                {/* <p className="yellow">Mark all as read</p>*/}
                                            </span>
                                            {notifications.length ? notifications.map((notification, index) => (<li key={index}>
                                                <div onClick={() => { navigateToOtherProfile(notification) }}>
                                                    {notification.sender_image ? <img src={notification.sender_image} decoding={"async"} /> :
                                                        <div className={classes.roundedImageContainer}>
                                                            <p className={classes.letter}>
                                                                {notification.sender_name?.slice(0, 2).toUpperCase()}
                                                            </p>
                                                        </div>
                                                    }
                                                </div>
                                                <div style={{ cursor: 'pointer' }} onClick={() => { navigateToOtherProfile(notification) }}>
                                                    <p className="white">{notification.body}</p>
                                                    <p className="light">{notification.date}</p>
                                                </div>
                                            </li>)) :
                                                <li style={{ color: '#7c7b7c' }}>
                                                    &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;  No New Notifications &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;
                                                </li>
                                                // <p style={{ textAlign: 'center', color: 'white', width: '100%' }}>No New Notifications</p>
                                            }

                                        </ul>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </span>
                            <ButtonGroup className="align-items-center" id="profile-btn">
                                <Link to={"/Purchase"} className={`btn ${classes.iconBtn}`}>
                                    <span className={classes.icon}>
                                        <i className="fas fa-plus"></i>
                                    </span>
                                    <span className={classes.text}>{coinConvert(allCoins) || '0'} </span>
                                    <img src={coin} alt="icon" />
                                </Link>
                                <Link to={"/profile"} className={`btn ${classes.profileBtn}`}>
                                    <img src={profile?.user_image} alt="icon" />
                                </Link>
                            </ButtonGroup>
                        </Nav>
                    </Navbar>
                </>) : (<Nav className="me-auto flex-column w-100 nav-links">
                    <Nav.Link to="/home" className="mb-3 active home-icon">
                        <img src={home} alt="icon" />
                        Home
                    </Nav.Link>
                    <Nav.Link as={Link} to="/tornament/tournament" className="btn btn-primary btn-bg trophy mb-3">
                        <img src={trophies} alt="icon" />
                        Tournament
                    </Nav.Link>
                    <Nav.Link as={Link} to="/tornament/judge" className="btn btn-primary btn-bg store mb-3">
                        <img src={judge} alt="icon" />
                        Judge
                    </Nav.Link>
                    <Nav.Link as={Link} to="/tornament/store" className="btn btn-primary btn-bg judge mb-3">
                        <img src={shop} alt="icon" />
                        Store
                    </Nav.Link>

                </Nav>)}
            </Navbar>
        </>
    );

}

export default Navigation;
