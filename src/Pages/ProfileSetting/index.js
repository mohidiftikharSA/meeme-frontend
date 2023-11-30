import React, { useState } from "react";
import { Col, Container, Nav, Row, Tab } from "react-bootstrap";
import Profile from "../../Images/Profile.png";
import Wallet from "../../Images/Wallet.png";
import Notification from "../../Images/Notification.png";
import support from "../../Images/support.png";
import Faq from "../../Images/Faq.png";
import bag from "../../Images/bag.png";
import documents from "../../Images/document .png";
import file from "../../Images/file-text.png";
import msg from "../../Images/msg.png";
import del from "../../Images/delete.png";
import Heading from "Components/Heading";
import EditProfile from "Components/EditProfile";
import NotificationCard from "Components/NotificationCard";
import Transaction from "Components/Transaction";
import FAQ from "Components/Faq";
import RuleList from "Components/RuleList";
import BillingDetails from "Components/BillingDetails";
import DeleteAccountModal from "Components/DeleteAccountModal";
import Support from "Components/Support";
import { Wizard } from "react-use-wizard";
import SupportChat from "Components/SupportChat";
import SupportDetail from "Components/SupportDetail";
import TutorialModals from "Components/Tutorial";
import { BiMenuAltLeft } from "react-icons/bi";
import { RxCross1 } from "react-icons/rx";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";


const transactionData = [
  {
    coins: "50,000",
    date: "Oct 20, 2022",
  },
  {
    coins: "10,000",
    date: "Sept 12, 2022",
  },
];

const ProfileSetting = () => {
 
  const [deleteAccountModalShow, setDeleteAccountShow] = useState(false);
  const [show, setShow] = useState(false);
  const [selectedSupportTicket , setSelectedSupportTicket] = useState();
  const location = useLocation();

  const textParam = new URLSearchParams(location.search).get("text");

  const { profile } = useSelector((state) => state.auth);


  const deleteClick = () => {
    setDeleteAccountShow(true);
  };
  const tutorialClick = () => {
    setShow(true);
  };
  const handleDeleteModal = () => {
    setDeleteAccountShow(false);
  };
  const [isActive, setIsActive] = useState(null);

  const toggleActive = () => {
    setIsActive(!isActive);
  };

  return (
    <>
      <section className="mb-5" style={{ position: "unset" }}>
        <Container>
          <div
            className="vertical-NavHolder"
          >
            <Heading title="Setting" />
            <Tab.Container id="verticalNav" defaultActiveKey={textParam}>
              <Row>
                <Col
                  lg={6}
                  className={` aside-responsive profile-setting ${
                    isActive ? "active" : ""
                  }`}
                >
                  <span
                    className={`nav-opener ${isActive ? "active" : ""}`}
                    onClick={toggleActive}
                  >
                    <BiMenuAltLeft
                      size={"32px"}
                      className={`${isActive ? "d-none" : "d-block"}`}
                    />
                    <RxCross1
                      size={"24px"}
                      className={`${isActive ? "d-block" : "d-none"}`}
                    />
                  </span>
                  <Nav variant="pills" className="flex-column">
                    <Nav.Item>
                      <Nav.Link eventKey="account" >
                        <span>
                          <img src={Profile} alt="Profile" />
                        </span>
                        <div className="profileDetails">
                          <h6 className="mb-1">Account Details</h6>
                          <p>{profile?.user?.username}</p>
                        </div>
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link href="/Purchase">
                        <span>
                          <img src={bag} alt="bag-icon" />
                        </span>
                        <div className="profileDetails">
                          <h6 className="mb-1">Wallet</h6>
                        </div>
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="transaction" >
                        <span>
                          <img src={documents} alt="document-icon" />
                        </span>
                        <div className="profileDetails">
                          <h6 className="mb-1">Transaction History</h6>
                          <p>Latest Jan 23 2023</p>
                        </div>
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="billing" >
                        <span>
                          <img src={Wallet} alt="wallet-icon" />
                        </span>
                        <div className="profileDetails">
                          <h6 className="mb-1">Billing Details</h6>
                          <p>Mastercard ****0123</p>
                        </div>
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link
                        eventKey="notifications"
                        
                      >
                        <span>
                          <img src={Notification} alt="notification-icon" />
                        </span>
                        <div className="profileDetails">
                          <h6 className="mb-1">Notifications</h6>
                          <p>Enabled</p>
                        </div>
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="support" >
                        <span>
                          <img src={support} alt="support-icon" />
                        </span>
                        <div className="profileDetails">
                          <h6 className="mb-1">Support</h6>
                        </div>
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="faq" >
                        <span>
                          <img src={Faq} alt="faq-icon" />
                        </span>
                        <div className="profileDetails">
                          <h6 className="mb-1">FAQ</h6>
                        </div>
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="rule" >
                        <span>
                          <img src={file} alt="file-icon" />
                        </span>
                        <div className="profileDetails">
                          <h6 className="mb-1">Rules & Regulation</h6>
                        </div>
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="tutorial" onClick={tutorialClick}>
                        <span>
                          <img src={msg} alt="msg-icon" />
                        </span>
                        <div className="profileDetails">
                          <h6 className="mb-1">App Tutorial</h6>
                        </div>
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="Delete" onClick={deleteClick}>
                        <span>
                          <img src={del} alt="del-icon" />
                        </span>
                        <div className="profileDetails">
                          <h6 className="mb-1">Delete Account</h6>
                        </div>
                      </Nav.Link>
                    </Nav.Item>
                  </Nav>
                </Col>
                <Col
                lg={6}
                  className={`p-lg-0 content-responsive profile-setting ${
                    isActive ? "active" : ""
                  }`}
                >
                  <Tab.Content>
                    <Tab.Pane eventKey="account">
                      <EditProfile />
                    </Tab.Pane>
                    <Tab.Pane eventKey="notifications">
                      <NotificationCard />
                    </Tab.Pane>
                    <Tab.Pane eventKey="faq">
                      <FAQ />
                    </Tab.Pane>
                    <Tab.Pane eventKey="transaction">
                      <Transaction data={transactionData} />
                    </Tab.Pane>
                    <Tab.Pane eventKey="rule">
                      <RuleList />
                    </Tab.Pane>
                    <Tab.Pane eventKey="billing">
                      <BillingDetails />
                    </Tab.Pane>
                    <Tab.Pane eventKey="support">
                      <Wizard>
                        <Support supportTicket={setSelectedSupportTicket} />
                        <SupportDetail />
                        <SupportChat selectedSupportTicket={selectedSupportTicket} />
                      </Wizard>
                    </Tab.Pane>
                  </Tab.Content>
                </Col>
              </Row>
            </Tab.Container>
          </div>
        </Container>
      </section>
      <DeleteAccountModal
        show={deleteAccountModalShow}
        onHide={handleDeleteModal}
      />
      <TutorialModals show={show} onHide={() => setShow(false)} />
    </>
  );
};

export default ProfileSetting;
