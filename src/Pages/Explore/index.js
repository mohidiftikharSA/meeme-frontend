import AccordianBadge from "Components/AccordainBadge";
import MemesDetails from "Components/Memes";
import Search from "Components/Search";
import React, {useEffect, useState} from "react";
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
import { Container } from "react-bootstrap";
import postAPIs from "../../APIs/dashboard/home";
import avatar from "../../Images/avatar.jpg";

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
const data = [
  {
    title: "Funny",
  },
  {
    title: "CanadaPolitics",
  },
  {
    title: "TrumpSeason",
  },
];


const Explore = () => {
  const [recentPosts, setRecentPosts] = useState([]);
  const getRecentPost = async () => {
    try {
      const res = await postAPIs.getRecentPosts();
      if (res.status === 200) {
        // Assuming a 200 status code means success
        setRecentPosts(res.data.recent_posts); // Assuming the data is in a property called 'data'
      } else {
        console.error("Error: Unexpected status code", res.status);
      }
    } catch (error) {
      console.error("Error while fetching data:", error);
    }
  };
  useEffect(() => {
    getRecentPost();
  }, []);
  return (
    <>
      <section>
        <Container fluid>
          <Search expolore text={"Search hashtags, usernames"} />
          <AccordianBadge data={data} expolore />
          <MemesDetails newMemesData={recentPosts} avatar={avatar} expolore />
        </Container>
      </section>
    </>
  );
};

export default Explore;
