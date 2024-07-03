import AccordianBadge from "Components/AccordainBadge";
import MemesDetails from "Components/Memes";
import Search from "Components/Search";
import React, { useEffect, useRef, useState } from "react";
import { Container } from "react-bootstrap";
import postAPIs from "../../APIs/dashboard/home";
import avatar from "../../Images/avatar.png";

const Explore = () => {
  const [recentPosts, setRecentPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredPosts, setFilteredPost] = useState([]);
  const [tags, setTags] = useState([]);
  const pageNumberRef = useRef(1);
  const [hasMore, setHasMore] = useState(true);
  let firstAPICall = false;

  const getRecentPostAndTags = async () => {
    try {
      if (firstAPICall && pageNumberRef.current === 1) {
        return;
      }
      const res = await postAPIs.getRecentPosts(pageNumberRef.current);
      if (res.status === 200) {
        firstAPICall = true;
        // Extract IDs of recent posts
        const existingPostIds = new Set(
          recentPosts.map((post) => post.post.id)
        );
        // Filter out new posts that are not duplicates
        const newPosts = res.data.recent_posts.filter(
          (post) => !existingPostIds.has(post.post.id)
        );
        // Filter out posts with duplicate IDs
        const uniqueNewPosts = newPosts.filter(
          (post, index, self) =>
            index === self.findIndex((p) => p.post.id === post.post.id)
        );

        setRecentPosts((prevPosts) => [...prevPosts, ...uniqueNewPosts]);
        setFilteredPost((prevPosts) => [...prevPosts, ...uniqueNewPosts]);
        setLoading(false);
        pageNumberRef.current++;
        if (uniqueNewPosts.length === 0) {
          setHasMore(false);
        }
      } else {
        console.error("Error: Unexpected status code", res.status);
      }

      const resTags = await postAPIs.getTags();
      if (resTags) {
        setTags(resTags.data.tags);
      }
    } catch (error) {
      console.error("Error while fetching data:", error);
    }
  };

  const onTagSearch = async (value) => {
    if (value.length > 0) {
      const filteredData = recentPosts.filter((item) => {
        const postTags = (item.post.tag_list || []).map((tag) =>
          tag?.toLowerCase()
        );
        return value.some((searchTag) =>
          postTags.some((postTag) => postTag.includes(searchTag))
        );
      });
      if (!filteredData[0]) {
        const resTag = await postAPIs.user_search_tag({ tag: value[0] });
        if (resTag) {
          setFilteredPost(resTag.data.recent_posts);
          return;
        }
      }
      setFilteredPost(filteredData);
    } else {
      setFilteredPost(recentPosts);
    }
  };

  const onTextSearch = (value) => {
    if (value.length > 0) {
      const filteredData = recentPosts.filter((recentPost) => {
        return recentPost.username?.toLowerCase().includes(value?.toLowerCase());
      });
      setFilteredPost(filteredData);
    } else {
      setFilteredPost(recentPosts);
    }
  };
  useEffect(() => {
    getRecentPostAndTags();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, {
      root: null,
      rootMargin: "0px",
      threshold: 1.0,
    });

    const sentinel = document.getElementById("sentinel");
    if (sentinel) {
      observer.observe(sentinel);
    }

    return () => {
      if (sentinel) {
        observer.unobserve(sentinel);
      }
    };
  }, []);

  const handleIntersection = async (entries) => {
    const target = entries[0];
    if (target.isIntersecting && hasMore) {
      await getRecentPostAndTags();
    }
  };

  return (
    <>
      <section>
        <Container fluid>
          <Search
            expolore
            text={"Search hashtags, usernames"}
            onSearchChange={onTextSearch}
          />
          <AccordianBadge data={tags} expolore onTagSelect={onTagSearch} />
          <MemesDetails
            isLoading={loading}
            newMemesData={filteredPosts}
            avatar={avatar}
            explore
          />
          <div id="sentinel"></div>
        </Container>
      </section>
    </>
  );
};

export default Explore;

// comment
