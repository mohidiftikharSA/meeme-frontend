import React, { useEffect, useRef, useState, useCallback } from "react";
import { Container } from "react-bootstrap";
import AccordianBadge from "Components/AccordainBadge";
import MemesDetails from "Components/Memes";
import Search from "Components/Search";
import postAPIs from "../../APIs/dashboard/home";
import avatar from "../../Images/avatar.png";
import { useSelector } from "react-redux";

const Explore = () => {
  const [recentPosts, setRecentPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [tags, setTags] = useState([]);
  const pageNumberRef = useRef(1);
  const [hasMore, setHasMore] = useState(true);
  const [searchMode, setSearchMode] = useState(false);
  const isLoadingRef = useRef(false);
  const deletedPost = useSelector((state) => state.postEditAndDeletionSlice);
  
  useEffect(() => {
    console.log("Delete or Edit post in useEffect explore == ", deletedPost );
  
    if (deletedPost?.postId && deletedPost.action === 'delete') {
      console.log("inside if  ===")
      const updatedData = recentPosts.filter(item => item?.post?.id !== deletedPost.postId);
      setRecentPosts(updatedData);
    } else if (deletedPost?.postId && deletedPost.action === 'edit') {
      const updatedData = recentPosts.map(item => {
        if (item?.post?.id === deletedPost?.postId) {
          console.log("Inside map ===", item)
          return {
            ...item,
            post: {
              ...item.post,
              description: deletedPost.post.description, 
              tag_list: deletedPost.post.duplicate_tags
            }
          };
        }
        return item;
      });
  
      setRecentPosts(updatedData);
    }
  }, [deletedPost]);

  const getRecentPostAndTags = useCallback(async () => {
    try {
      if (isLoadingRef.current || !hasMore || searchMode) {
        return;
      }

      isLoadingRef.current = true;

      // Fetch tags if they haven't been loaded yet
      if (tags.length === 0) {
        const resTags = await postAPIs.getTags();
        if (resTags?.data?.tags) {
          setTags(resTags.data.tags);
        }
      }

      const res = await postAPIs.getRecentPosts(pageNumberRef.current);
      if (res.status === 200) {
        const newPosts = res.data.recent_posts;

        setRecentPosts(prevPosts => {
          const existingPostIds = new Set(prevPosts.map(post => post.post.id));
          const uniqueNewPosts = newPosts.filter(post => !existingPostIds.has(post.post.id));

          if (uniqueNewPosts.length === 0) {
            setHasMore(false);
            return prevPosts;
          }

          pageNumberRef.current++;
          return [...prevPosts, ...uniqueNewPosts];
        });

        setLoading(false);
      }
    } catch (error) {
      console.error("Error while fetching data:", error);
    } finally {
      isLoadingRef.current = false;
    }
  }, [hasMore, searchMode, tags.length]);

  const onTagSearch = async (value) => {
    setSearchMode(true);
    setFilteredPosts([]);

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
          setFilteredPosts(resTag.data.recent_posts);
          return;
        }
      }
      setFilteredPosts(filteredData);
    } else {
      setSearchMode(false);
      setFilteredPosts(recentPosts);
    }
  };

  const onTextSearch = async (value) => {
    setSearchMode(true);
    setFilteredPosts([]);

    if (value.length <= 0) {
      setSearchMode(false);
      setFilteredPosts(recentPosts);
    }
  };

  const onSearchSubmit = async (value) => {
    setSearchMode(true);
    setFilteredPosts([]);

    if (value.length > 0) {
      try {
        const data = {
          tag: `#${value}`,
          username: `${value}`,
        };
        const responsePosts = await postAPIs.searchPostByUsernameAndTag(data);
        setFilteredPosts(responsePosts.data.explore_posts);
      } catch (error) {
        setFilteredPosts([]);
      }
    } else {
      setSearchMode(false);
      setFilteredPosts(recentPosts);
    }
  };

  useEffect(() => {
    getRecentPostAndTags();
  }, [getRecentPostAndTags]);

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
    if (target.isIntersecting && hasMore && !searchMode && !isLoadingRef.current) {
      await getRecentPostAndTags();
    }
  };

  return (
    <>
      <section>
        <Container fluid>
          <Search
            expolore
            text={"Search by hashtags or usernames"}
            onSearchChange={onTextSearch}
            onSearchSubmit={onSearchSubmit}
          />
          <AccordianBadge data={tags} expolore onTagSelect={onTagSearch} />
          <MemesDetails
            isLoading={loading}
            newMemesData={searchMode ? filteredPosts : recentPosts}
            avatar={avatar}
            explore
          />
          <div id="sentinel"></div>
        </Container>
      </section>
    </>
  );
};

export default React.memo(Explore);
