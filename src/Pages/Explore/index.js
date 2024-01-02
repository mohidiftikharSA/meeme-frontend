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
    const [tags, setTags] = useState([]);
    const [tagSearchedData , setTagSearchedData ] = useState([]);

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
            const filteredData = recentPosts.filter(item => {
                const postTags = (item.post.tag_list || []).map(tag => tag.toLowerCase());
                return value.some((searchTag) => postTags.some((postTag) => postTag.includes(searchTag)));
            });
            if (!filteredData[0]) {
                const resTag = await postAPIs.user_search_tag({ tag: value[0] });
                if (resTag) {
                    setFilteredPost(resTag.data.recent_posts);
                    return;
                }
            }
            setFilteredPost(filteredData)
        } else {
            setFilteredPost(recentPosts);
        }
    }

    const onTextSearch = (value) => {
        if (value.length > 0) {
            const filteredData = recentPosts.filter(recentPost => {
                return recentPost.username.toLowerCase().includes(value.toLowerCase());
            });
            setFilteredPost(filteredData);
        } else {
            setFilteredPost(recentPosts);
        }
    }
    useEffect(() => {
        getRecentPostAndTags();
    }, []);

    return (<>
        <section>
            <Container fluid>
                <Search expolore text={"Search hashtags, usernames"} onSearchChange={onTextSearch} />
                <AccordianBadge data={tags} expolore
                    onTagSelect={onTagSearch} />
                <MemesDetails isLoading={loading} newMemesData={filteredPosts} avatar={avatar} explore />
            </Container>
        </section>
    </>);
};

export default Explore;
