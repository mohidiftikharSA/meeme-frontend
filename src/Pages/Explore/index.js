import AccordianBadge from "Components/AccordainBadge";
import MemesDetails from "Components/Memes";
import Search from "Components/Search";
import React, { useEffect, useState } from "react";
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
import Loader from "../../Components/Loader";

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
  const [loading, setLoading] = useState(true);
  const [filteredPosts, setFilteredPost] = useState([]);
  const [tags , setTags ] = useState([]);

  const getRecentPostAndTags = async () => {
    try {
      const res = await postAPIs.getRecentPosts();
      if (res.status === 200) {
        // Assuming a 200 status code means success
        setRecentPosts(res.data.recent_posts);
        setFilteredPost(res.data.recent_posts);
        setLoading(false)
      } else {
        console.error("Error: Unexpected status code", res.status);
      }

      const resTags  = await postAPIs.getTags();
      if(resTags){
        console.log("Tags response =====================", resTags.data.tags);
        setTags(resTags.data.tags);
      }
    } catch (error) {
      console.error("Error while fetching data:", error);
    }
  };


  const onSearchChange = (value) => {

    if (value.length > 0) {
      
      const filteredData = recentPosts.filter(user => {
        const usernameMatch = user.username.toLowerCase().includes(value.toLowerCase());
        const tagListMatch = user.post.tag_list.some(tag => tag.toLowerCase().includes(value.toLowerCase()));
        return usernameMatch || tagListMatch;
      });

      setFilteredPost(filteredData);
    } else {
      setFilteredPost(recentPosts);
      return;
    }
  }


  useEffect(() => {
    getRecentPostAndTags();
  }, []);
  return (
    loading ? (
      // Render this component when loading is true
      <Loader isLoading={loading} />
    ) : (
      <>
        <section>
          <Container fluid>
            <Search expolore text={"Search hashtags, usernames"} onSearchChange={onSearchChange} />
            <AccordianBadge data={tags} expolore />
            <MemesDetails newMemesData={filteredPosts} avatar={avatar} explore />
          </Container>
        </section>
      </>
    )
  );
};

export default Explore;
