import React, { useState } from "react";
import { Col, Container, Nav, Row, Tab } from "react-bootstrap";
import Profile from "../../Images/Profile.png";
import Wallet from "../../Images/Wallet.png"
import Notification from "../../Images/Notification.png"
import support from "../../Images/support.png"
import Faq from "../../Images/Faq.png"
import bag from "../../Images/bag.png"
import documents from "../../Images/document .png"
import file from "../../Images/file-text.png"
import msg from "../../Images/msg.png"
import del from "../../Images/delete.png"
import Heading from "Components/Heading";
import EditProfile from "Components/EditProfile";
import Transaction from "Components/Transaction";



const ProfileSetting = () => {
  const [tabClicked, setTabClicked] = useState(false);

  const handleTabClick = () => {
    console.log(tabClicked);
    setTabClicked(true);
  };

  return (
    <section>
      <Container>
        <div
          className="vertical-NavHolder"
          style={
            tabClicked
              ? { maxWidth: "100%" }
              : { maxWidth: "600px", margin: "auto" }
          }
        >
          <Heading title="Setting" />
          <Tab.Container id="verticalNav">
            <Row>
              <Col sm={tabClicked ? 6 : 12}>
                <Nav variant="pills" className="flex-column">
                  <Nav.Item>
                    <Nav.Link eventKey="account" onClick={handleTabClick}>
                      <span>
                        <img src={Profile} alt="Profile" />
                      </span>
                      <div className="profileDetails">
                        <h6 className="mb-1">Account Details</h6>
                        <p>John Smith</p>
                      </div>
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="wallet" onClick={handleTabClick}>
                      <span>
                        <img src={bag} alt="bag-icon" />
                      </span>
                      <div className="profileDetails">
                        <h6 className="mb-1">Wallet</h6>
                      </div>
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="transaction" onClick={handleTabClick}>
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
                    <Nav.Link eventKey="wallet" onClick={handleTabClick}>
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
                    <Nav.Link eventKey="wallet" onClick={handleTabClick}>
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
                    <Nav.Link eventKey="wallet" onClick={handleTabClick}>
                      <span>
                        <img src={support} alt="support-icon" />
                      </span>
                      <div className="profileDetails">
                        <h6 className="mb-1">Support</h6>
                      </div>
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="wallet" onClick={handleTabClick}>
                      <span>
                        <img src={Faq} alt="faq-icon" />
                      </span>
                      <div className="profileDetails">
                        <h6 className="mb-1">FAQ</h6>
                      </div>
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="wallet" onClick={handleTabClick}>
                      <span>
                        <img src={file} alt="file-icon" />
                      </span>
                      <div className="profileDetails">
                        <h6 className="mb-1">Rules & Regulation</h6>
                      </div>
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="wallet" onClick={handleTabClick}>
                      <span>
                        <img src={msg} alt="msg-icon" />
                      </span>
                      <div className="profileDetails">
                        <h6 className="mb-1">App Tutorial</h6>
                      </div>
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="wallet" onClick={handleTabClick}>
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
              <Col sm={tabClicked ? 6 : 12}>
                <Tab.Content>
                  <Tab.Pane eventKey="account">
                    <EditProfile />
                  </Tab.Pane>
                  <Tab.Pane eventKey="transaction">
                  <Transaction /></Tab.Pane>
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
        </div>
      </Container>
    </section>
  );
};

export default ProfileSetting;
