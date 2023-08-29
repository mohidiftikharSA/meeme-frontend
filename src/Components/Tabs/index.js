import FollowingContent from "Components/FollowingContent";
import MemesDetails from "Components/Memes";
import React from "react";
import { Tab, Tabs } from "react-bootstrap";
import userProfile1 from "../../Images/user1.png";
import meme1 from "../../Images/meme1.png";
import userProfile2 from "../../Images/user2.png";
import meme2 from "../../Images/meme2.png";
import userProfile3 from "../../Images/user3.png";
import meme3 from "../../Images/meme3.png";
import userProfile4 from "../../Images/user4.png";
import meme4 from "../../Images/meme4.png";
import meme5 from "../../Images/meme5.png";
import meme6 from "../../Images/meme6.png";
import meme7 from "../../Images/meme7.png";
import meme8 from "../../Images/meme8.png";
import img13 from "../../Images/bg1.png";
import img14 from "../../Images/bg2.png";
import img15 from "../../Images/bg3.png";
import img16 from "../../Images/Profile01.png";
import img17 from "../../Images/Profile2.png";
import img18 from "../../Images/Profile3.png";
import TournamentTabs from "Components/TournamentTab";
import Store from "Components/Store";
import classes from "./index.module.scss";
import SubTabs from "Components/SubTabs";
import BackgroundOverlay from "Components/BackgroundOverlay";
import ProfileOverlay from "Components/ProfileOverlay";
import Judge from "Components/Judge";

const newMemesData = [
  {
    name: "Jullian Fortan",
    userProfile: userProfile1,
    memeImg: meme1,
  },
  {
    name: "Amna Adam",
    userProfile: userProfile2,
    memeImg: meme2,
  },
  {
    name: "Julie Artist",
    userProfile: userProfile3,
    memeImg: meme3,
  },
  {
    name: "Sarah",
    userProfile: userProfile4,
    memeImg: meme4,
  },
  {
    name: "Jullian Fortan",
    userProfile: userProfile1,
    memeImg: meme5,
  },
  {
    name: "Julie Artist",
    userProfile: userProfile3,
    memeImg: meme6,
  },
  {
    name: "Julie Artist",
    userProfile: userProfile3,
    memeImg: meme7,
  },
  {
    name: "Julie Artist",
    userProfile: userProfile3,
    memeImg: meme8,
  },
];
const newMemesData2 = [
  {
    name: "Julie Artist",
    userProfile: userProfile3,
    memeImg: meme3,
  },
  {
    name: "Sarah",
    userProfile: userProfile4,
    memeImg: meme4,
  },
  {
    name: "Jullian Fortan",
    userProfile: userProfile1,
    memeImg: meme5,
  },
  {
    name: "Jullian Fortan",
    userProfile: userProfile1,
    memeImg: meme1,
  },
  {
    name: "Amna Adam",
    userProfile: userProfile2,
    memeImg: meme2,
  },
  {
    name: "Julie Artist",
    userProfile: userProfile3,
    memeImg: meme3,
  },
  {
    name: "Sarah",
    userProfile: userProfile4,
    memeImg: meme4,
  },
  {
    name: "Jullian Fortan",
    userProfile: userProfile1,
    memeImg: meme5,
  },
  {
    name: "Julie Artist",
    userProfile: userProfile3,
    memeImg: meme6,
  },
  {
    name: "Julie Artist",
    userProfile: userProfile3,
    memeImg: meme7,
  },
  {
    name: "Julie Artist",
    userProfile: userProfile3,
    memeImg: meme8,
  },
];
const backgroundOverlayData = [
  {
    
    img: img13,
    coin: "100"
  },
  {
    
    img: img14,
    coin: "100"
  },
  {
    
    img: img15,
    coin: "100"
  },
  
]
const ProfileOverlayData = [
  {
    
    img: img16,
    coin: "100"
  },
  {
    
    img: img17,
    coin: "100"
  },
  {
    
    img: img18,
    coin: "100"
  },
  
]

const TabDetails = ({
  tournament,
  first,
  main,
  footer,
  tabTitle,
  storeitems,
}) => {
  return (
    <>
      {main && (
        <Tabs
          defaultActiveKey={first}
          id="uncontrolled-tab-example"
          className="mb-5 px-4"
        >
          <Tab eventKey="following" title="Following">
            <FollowingContent />
          </Tab>
          <Tab eventKey="memes" title="New Memes">
            <MemesDetails newMemesData={newMemesData} />
          </Tab>
          <Tab eventKey="trending" title="Trending">
            <MemesDetails newMemesData={newMemesData2} />
          </Tab>
        </Tabs>
      )}
      {tournament && (
        <div className={classes.contentHolder}>
          <Tabs
            defaultActiveKey={first}
            id="uncontrolled-tab-example"
            className="mb-3"
          >
            <Tab eventKey="tournament" title="Tournament">
              <TournamentTabs />
            </Tab>
            <Tab eventKey="store" title="Store">
              <Store />
            </Tab>
            <Tab eventKey="judge" title="Judge">
              <Judge/>
            </Tab>
          </Tabs>
        </div>
      )}
      {footer && (
        <Tabs defaultActiveKey={tabTitle} className="modalTabs">
          <Tab
            eventKey="terms"
            title="Terms of Services"
            className="CustTabContent scroller"
          >
            <div className={classes.modalContant}>
              <p>Welcome to MeMee!</p>
              <p>
                Welcome to MeMee! The following terminology applies to these
                Terms and Conditions, Privacy Statement and Disclaimer Notice
                and all Agreements: "Client", "You" and "Your" refers to you,
                the person log on this website and compliant to the Company’s
                terms and conditions. "The Company", "Ourselves", "We", "Our"
                and "Us", refers to our Company. "Party", "Parties", or "Us",
                refers to both the Client and ourselves. All terms refer to the
                offer, acceptance and consideration of payment necessary to
                undertake the process of our assistance to the Client in the
                most appropriate manner for the express purpose of meeting the
                Client’s needs in respect of provision of the Company’s stated
                services, in accordance with and subject to, prevailing law of
                Netherlands. Any use of the above terminology or other words in
                the singular, plural, capitalisation and/or he/she or they, are
                taken as interchangeable and therefore as referring to same.
              </p>
              <p>
                Welcome to MeMee! The following terminology applies to these
                Terms and Conditions, Privacy Statement and Disclaimer Notice
                and all Agreements: "Client", "You" and "Your" refers to you,
                the person log on this website and compliant to the Company’s
                terms and conditions. "The Company", "Ourselves", "We", "Our"
                and "Us", refers to our Company. "Party", "Parties", or "Us",
                refers to both the Client and ourselves. All terms refer to the
                offer, acceptance and consideration of payment necessary to
                undertake the process of our assistance to the Client in the
                most appropriate manner for the express purpose of meeting the
                Client’s needs in respect of provision of the Company’s stated
                services, in accordance with and subject to, prevailing law of
                Netherlands. Any use of the above terminology or other words in
                the singular, plural, capitalisation and/or he/she or they, are
                taken as interchangeable and therefore as referring to same.
              </p>
              <p>
                Welcome to MeMee! The following terminology applies to these
                Terms and Conditions, Privacy Statement and Disclaimer Notice
                and all Agreements: "Client", "You" and "Your" refers to you,
                the person log on this website and compliant to the Company’s
                terms and conditions. "The Company", "Ourselves", "We", "Our"
                and "Us", refers to our Company. "Party", "Parties", or "Us",
                refers to both the Client and ourselves. All terms refer to the
                offer, acceptance and consideration of payment necessary to
                undertake the process of our assistance to the Client in the
                most appropriate manner for the express purpose of meeting the
                Client’s needs in respect of provision of the Company’s stated
                services, in accordance with and subject to, prevailing law of
                Netherlands. Any use of the above terminology or other words in
                the singular, plural, capitalisation and/or he/she or they, are
                taken as interchangeable and therefore as referring to same.
              </p>
              <p>
                Welcome to MeMee! The following terminology applies to these
                Terms and Conditions, Privacy Statement and Disclaimer Notice
                and all Agreements: "Client", "You" and "Your" refers to you,
                the person log on this website and compliant to the Company’s
                terms and conditions. "The Company", "Ourselves", "We", "Our"
                and "Us", refers to our Company. "Party", "Parties", or "Us",
                refers to both the Client and ourselves. All terms refer to the
                offer, acceptance and consideration of payment necessary to
                undertake the process of our assistance to the Client in the
                most appropriate manner for the express purpose of meeting the
                Client’s needs in respect of provision of the Company’s stated
                services, in accordance with and subject to, prevailing law of
                Netherlands. Any use of the above terminology or other words in
                the singular, plural, capitalisation and/or he/she or they, are
                taken as interchangeable and therefore as referring to same.
              </p>
            </div>
          </Tab>
          <Tab
            eventKey="policy"
            title="Privacy Policy"
            className="CustTabContent"
          >
            <div className={classes.modalContant}>
              <p>Welcome to MeMee!</p>
              <p>
                Welcome to MeMee! The following terminology applies to these
                Terms and Conditions, Privacy Statement and Disclaimer Notice
                and all Agreements: "Client", "You" and "Your" refers to you,
                the person log on this website and compliant to the Company’s
                terms and conditions. "The Company", "Ourselves", "We", "Our"
                and "Us", refers to our Company. "Party", "Parties", or "Us",
                refers to both the Client and ourselves. All terms refer to the
                offer, acceptance and consideration of payment necessary to
                undertake the process of our assistance to the Client in the
                most appropriate manner for the express purpose of meeting the
                Client’s needs in respect of provision of the Company’s stated
                services, in accordance with and subject to, prevailing law of
                Netherlands. Any use of the above terminology or other words in
                the singular, plural, capitalisation and/or he/she or they, are
                taken as interchangeable and therefore as referring to same.
              </p>
              <p>
                Welcome to MeMee! The following terminology applies to these
                Terms and Conditions, Privacy Statement and Disclaimer Notice
                and all Agreements: "Client", "You" and "Your" refers to you,
                the person log on this website and compliant to the Company’s
                terms and conditions. "The Company", "Ourselves", "We", "Our"
                and "Us", refers to our Company. "Party", "Parties", or "Us",
                refers to both the Client and ourselves. All terms refer to the
                offer, acceptance and consideration of payment necessary to
                undertake the process of our assistance to the Client in the
                most appropriate manner for the express purpose of meeting the
                Client’s needs in respect of provision of the Company’s stated
                services, in accordance with and subject to, prevailing law of
                Netherlands. Any use of the above terminology or other words in
                the singular, plural, capitalisation and/or he/she or they, are
                taken as interchangeable and therefore as referring to same.
              </p>
              <p>
                Welcome to MeMee! The following terminology applies to these
                Terms and Conditions, Privacy Statement and Disclaimer Notice
                and all Agreements: "Client", "You" and "Your" refers to you,
                the person log on this website and compliant to the Company’s
                terms and conditions. "The Company", "Ourselves", "We", "Our"
                and "Us", refers to our Company. "Party", "Parties", or "Us",
                refers to both the Client and ourselves. All terms refer to the
                offer, acceptance and consideration of payment necessary to
                undertake the process of our assistance to the Client in the
                most appropriate manner for the express purpose of meeting the
                Client’s needs in respect of provision of the Company’s stated
                services, in accordance with and subject to, prevailing law of
                Netherlands. Any use of the above terminology or other words in
                the singular, plural, capitalisation and/or he/she or they, are
                taken as interchangeable and therefore as referring to same.
              </p>
              <p>
                Welcome to MeMee! The following terminology applies to these
                Terms and Conditions, Privacy Statement and Disclaimer Notice
                and all Agreements: "Client", "You" and "Your" refers to you,
                the person log on this website and compliant to the Company’s
                terms and conditions. "The Company", "Ourselves", "We", "Our"
                and "Us", refers to our Company. "Party", "Parties", or "Us",
                refers to both the Client and ourselves. All terms refer to the
                offer, acceptance and consideration of payment necessary to
                undertake the process of our assistance to the Client in the
                most appropriate manner for the express purpose of meeting the
                Client’s needs in respect of provision of the Company’s stated
                services, in accordance with and subject to, prevailing law of
                Netherlands. Any use of the above terminology or other words in
                the singular, plural, capitalisation and/or he/she or they, are
                taken as interchangeable and therefore as referring to same.
              </p>
            </div>
          </Tab>
          <Tab eventKey="faq" title="FAQ" className="CustTabContent">
            <div className={classes.modalContant}>
              <h3 className="faqTitle">How can we help you</h3>
              <p className="faqSubTitle">How do I buy coins?</p>
              <p>
                Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et.
                Sunt qui esse pariatur duis deserunt mollit dolore cillum minim
                tempor enim. Elit aute irure tempor cupidatat incididunt sint
                deserunt ut voluptate aute id deserunt nisi. Aliqua id fugiat
                nostrud irure ex duis ea quis id quis ad et. Sunt qui esse
                pariatur duis deserunt mollit dolore cillum minim tempor enim.
                Elit aute irure tempor cupidatat incididunt sint deserunt ut
                voluptate aute id deserunt nisi.
              </p>
              <p className="faqSubTitle">
                {" "}
                What methods of payment does memee accept?
              </p>
              <p>
                Memee accepts variety of payment methods which includes PayPal,
                Bitcoin, Bank trasnfers, Credit/Debit Cards, Google Pay, Apple
              </p>
              <p className="faqSubTitle">
                {" "}
                How do I place a cancellation request?
              </p>
              <p>
                Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et.
                Sunt qui esse pariatur duis deserunt mollit dolore cillum minim
                tempor enim. Elit aute irure tempor cupidatat incididunt sint
                deserunt ut voluptate aute id deserunt nisi. Aliqua id fugiat
                nostrud irure ex duis ea quis id quis ad et. Sunt qui esse
                pariatur duis deserunt mollit dolore cillum minim tempor enim.
                Elit aute irure tempor cupidatat incididunt sint deserunt ut
                voluptate aute id deserunt nisi.
              </p>
              <p className="faqSubTitle">How do I edit or remove a method? </p>
              <p>
                Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et.
                Sunt qui esse pariatur duis deserunt mollit dolore cillum minim
                tempor enim.
              </p>
            </div>
          </Tab>
        </Tabs>
      )}
      {storeitems && (
        <Tabs
          defaultActiveKey={'Icons'}
          id="uncontrolled-tab-example"
          className="mb-5 noBg"
        >
          <Tab eventKey="Icons" title="Icons">
            <SubTabs icon/>
          </Tab>
          <Tab eventKey="themes" title="Themes">
          <SubTabs themes/>
          </Tab>
          <Tab eventKey="overlay" title="Background Overlay">
          <BackgroundOverlay data={backgroundOverlayData}/>
          </Tab>
          <Tab eventKey="profile" title="Profile Overlay">
          <ProfileOverlay  data={ProfileOverlayData}/>
          </Tab>
        </Tabs>
      )}
    </>
  );
};

export default TabDetails;
