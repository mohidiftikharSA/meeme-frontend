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
import TournamentTabs from "Components/TournamentTab";

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

const TabDetails = ({ tournament,first }) => {
  return (
    <>
      {tournament ? 
       <Tabs
       defaultActiveKey={first}
       id="uncontrolled-tab-example"
       className="mb-3"
     >
         <Tab eventKey="tournament" title="Tournament">
           <TournamentTabs/>
         </Tab>
         <Tab eventKey="store" title="Store">
         
         </Tab>
         <Tab eventKey="judge" title="Judge">
           
         </Tab>
     </Tabs>  
       : 
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
      }
      </>
  );
};

export default TabDetails;
