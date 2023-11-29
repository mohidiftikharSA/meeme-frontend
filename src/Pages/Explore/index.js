import AccordianBadge from "Components/AccordainBadge";
import MemesDetails from "Components/Memes";
import Search from "Components/Search";
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import postAPIs from "../../APIs/dashboard/home";
import avatar from "../../Images/avatar.jpg";

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
      <>
        <section>
          <Container fluid>
            <Search expolore text={"Search hashtags, usernames"} onSearchChange={onSearchChange} />
            <AccordianBadge data={tags} expolore selectedTagsString={onSearchChange} />
            <MemesDetails isLoading={loading} newMemesData={filteredPosts} avatar={avatar} explore />
          </Container>
        </section>
      </>
  );
};

export default Explore;
