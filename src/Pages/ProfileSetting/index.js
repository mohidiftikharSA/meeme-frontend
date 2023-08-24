import React, { useState } from "react";
import { Col, Container, Nav, Row, Tab } from "react-bootstrap";
import Profile from "../../Images/Profile.png";

const ProfileSetting = () => {
  const [tabClicked, setTabClicked] = useState(false);

  const handleTabClick = () => {
    console.log(tabClicked)
    setTabClicked(true);
  };

  return (
    <section>
      <Container>
        <div className="vertical-NavHolder" style={tabClicked? {maxWidth:"100%"} : {maxWidth:"600px", margin:"auto"}} >
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
                        <img src={Profile} alt="Profile" />
                      </span>
                      <div className="profileDetails">
                        <h6 className="mb-1">Wallet</h6>
                      </div>
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="wallet" onClick={handleTabClick}>
                      <span>
                        <img src={Profile} alt="Profile" />
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
                        <img src={Profile} alt="Profile" />
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
                        <img src={Profile} alt="Profile" />
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
                        <img src={Profile} alt="Profile" />
                      </span>
                      <div className="profileDetails">
                        <h6 className="mb-1">Support</h6>
                      </div>
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="wallet" onClick={handleTabClick}>
                      <span>
                        <img src={Profile} alt="Profile" />
                      </span>
                      <div className="profileDetails">
                        <h6 className="mb-1">FAQ</h6>
                      </div>
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="wallet" onClick={handleTabClick}>
                      <span>
                        <img src={Profile} alt="Profile" />
                      </span>
                      <div className="profileDetails">
                        <h6 className="mb-1">Rules & Regulation</h6>
                      </div>
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="wallet" onClick={handleTabClick}>
                      <span>
                        <img src={Profile} alt="Profile" />
                      </span>
                      <div className="profileDetails">
                        <h6 className="mb-1">App Tutorial</h6>
                      </div>
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="wallet" onClick={handleTabClick}>
                      <span>
                        <img src={Profile} alt="Profile" />
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
                  <Tab.Pane eventKey="account">First tab content</Tab.Pane>
                  <Tab.Pane eventKey="second">Second tab content</Tab.Pane>
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
