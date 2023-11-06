import AccordianData from "Components/Accordian";
import { Aside } from "Components/Aside";
import ChatPopup from "Components/ChatPopup";
import TabDetails from "Components/Tabs";
import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import AuthAPIs from "APIs/auth";
import { useDispatch } from "react-redux";
import { setAuthProfile } from "../../Redux/reducers/authSlice";


const LandingPage = () => {

  const [isActive, setIsActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(()=>{
    getUserProfile();
  },[])


  const getUserProfile = async ()=>{
    setIsLoading(true);
    const userDetails = await AuthAPIs.getCurrentUserProfile();
    if(userDetails){
      setIsLoading(false);
      console.log("All user Details on Profile Page  =", userDetails.data.profile);
      dispatch(
        setAuthProfile({
          profile : userDetails.data.profile
        })
      )
      
    }
  }


  const toggleActive = () => {
    setIsActive(!isActive);
  };
  return (
    <>
      <Row className="main-page">
        <Col xl={3} md={4} className={`pe-0 aside-responsive page-sides ${isActive ? "active" : ""}`}>
          <Aside isActive={isActive} toggleActive={toggleActive} />         
        </Col>
        <Col xl={6} md={8} className={`p-lg-0 content-responsive center-side ${isActive ? "active" : ""}`}>
          <section>
            <Container>
              <TabDetails first={"following"} main />
            </Container>
          </section>
        </Col>
        <Col xl={3} className="d-xl-block d-none page-sides">
          <AccordianData following />
        </Col>
      </Row>
      <ChatPopup />
    </>
  );
};

export default LandingPage;
