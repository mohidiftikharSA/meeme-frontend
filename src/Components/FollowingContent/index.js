import Posts from "Components/Post";
import Stories from "Components/Stories";
import UploadPost from "Components/UploadPost";
import React, { useEffect, useState, useRef } from "react";
import postAPIs from "APIs/dashboard/home";
import followingPostsData from '../Post/folllowingData.json'
import { toast } from "react-toastify";
import Loader from "Components/Loader";
import TailSpinLoader from "Components/TailSpin";

const FollowingContent = ({ setNewPost }) => {

    const [storyData, setStoryData] = useState([]);
    const [followingData, setFollowingData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const postsRef = useRef(null);
    const pageNumberRef = useRef(1);

    const getStories = async () => {
        try {
            const res = await postAPIs.getStories();
            if (res?.status === 200) {
                // Assuming a 200 status code means success
                if (res.data.user_stories && res.data.user_stories[0]) {
                    const data = res.data.user_stories;//[0]?.stories;
                    setStoryData(data);
                }
                // Assuming the data is in a property called 'data'
            } else {
                console.error("Error: Unexpected status code", res.status);
            }
        } catch (error) {
            console.error("Error while fetching data:", error);
        }

    };
    const getFollowerPosts = async () => {
        try {
            setIsLoading(true)
            const res = await postAPIs.getFollowingPosts(pageNumberRef.current, 10);
            if (res.status === 200) {
                pageNumberRef.current++
                setFollowingData(res.data.following_posts);
            } else {
                console.error("Error: Unexpected status code", res.status);
            }
        } catch (error) {
            console.error("Error while fetching data:", error);
        } finally {
            setIsLoading(false)
        }
    };
    const onStoryUpdate = () => {
        console.log('story refresh')
        getStories();
    }
    useEffect(() => {
        const fetchData = async () => {
            await getFollowerPosts()
            await getStories()
        }
        fetchData();
        return () => console.log("Cleanup..");
    }, []);

    const likePost = async (post_id) => {
        try {
            const res = await postAPIs.likePost({ post_id });
            if (res.status === 200) {
                const updatedItems = followingData.map(item => {
                    if (item.post.id === post_id) {
                        console.log('updating with like')
                        return {
                            ...item,
                            liked_by_current_user: res.data.type_data.is_liked,
                            post_likes: res.data.likes_count,
                            test: ''
                        };
                    }
                    return item
                });
                setFollowingData(updatedItems);
            } else {
                console.error("Error: Unexpected status code", res.status);
            }
        } catch (error) {
            console.error("Error while fetching data:", error);
        }

    };
    const sharePost = async (post_id) => {
        console.log("share post in root -----", post_id);
        try {
            const res = await postAPIs.sharePost({ post_id });
            if (res) {
                toast.success("Link Copied Successfully");
                const index = followingData.findIndex(item => item.post.id === post_id);

                if (index !== -1) {
                    // Create a shallow copy of postData
                    const updatedPostData = [...followingData];

                    // Update the share count of the found post
                    updatedPostData[index] = {
                        ...updatedPostData[index],
                        post: {
                            ...updatedPostData[index].post,
                            share_count: (updatedPostData[index].post.share_count || 0) + 1
                        }
                    };

                    setFollowingData(updatedPostData);
                }
            } else {
                console.error("Error: Unexpected status code", res);
            }
        } catch (error) {
            console.error("Error while fetching data:", error);
        }

    };

    const loadMorePosts = async () => {
        console.log("Loading more follower posts...", pageNumberRef.current);
        try {
            const res = await postAPIs.getFollowingPosts(pageNumberRef.current, 10);
            if (res.status === 200) {
                pageNumberRef.current++
                // setFollowingData((prevPosts) => [...prevPosts, ...res.data.following_posts]);
            } else {
                console.error("Error: Unexpected status code", res.status);
            }
        } catch (error) {
            console.error("Error while fetching data:", error);
        } finally {
            setIsLoading(false)
        }

    };

    useEffect(() => {
        const handleScroll = () => {
            if (postsRef.current) {
                const { scrollTop, scrollHeight, clientHeight } = postsRef.current;
                if (scrollTop + clientHeight >= scrollHeight - 10) {
                    loadMorePosts();
                }
            }
        };

        const currentRef = postsRef.current;
        if (currentRef) {
            currentRef.addEventListener("scroll", handleScroll);
        }

        return () => {
            if (currentRef) {
                currentRef.removeEventListener("scroll", handleScroll);
            }
        };
    }, []);

    return (<>
        <div ref={postsRef} className="scrollable">
            <Stories data={storyData} onStoryUpdate={onStoryUpdate} />
            <UploadPost setNewPost={setNewPost} />
            <div>
                {followingData && followingData[0] ? <Posts postData={followingData} isLoading={isLoading} sharePost={sharePost} likePost={likePost} />
                    : <div style={{ textAlign: 'center' }}>
                        <p style={{ marginTop: '20%' }}>No posts found</p>
                    </div>
                }
            </div>
        </div>
    </>);
};

export default FollowingContent;
