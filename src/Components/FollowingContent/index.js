import Posts from "Components/Post";
import Stories from "Components/Stories";
import UploadPost from "Components/UploadPost";
import React, {useEffect, useState} from "react";
import postAPIs from "APIs/dashboard/home";
import followingPostsData from '../Post/folllowingData.json'

const FollowingContent = () => {

    const [storyData, setStoryData] = useState([]);
    const [followingData, setFollowingData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
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
        console.log("Calling Follower Posts")
        try {
            setIsLoading(true)
            const res = await postAPIs.getFollowingPosts();
            if (res.status === 200) {
                // Assuming a 200 status code means success
                setFollowingData(res.data.following_posts);
                // Assuming the data is in a property called 'data'
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
        console.log("First call on mount..");
        const fetchData = async () => {
            await getFollowerPosts()
            await getStories()
        }
        fetchData();
        /** this for testing purposes**/
        /* setIsLoading(true)
         setTimeout(() => {
             setFollowingData(followingPostsData)
             setIsLoading(false)
         }, 3000)*/
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


    return (<>
        <Stories data={storyData} onStoryUpdate={onStoryUpdate}/>
        <UploadPost/>
        <Posts postData={followingData} isLoading={isLoading} likePost={likePost} />
    </>);
};

export default FollowingContent;
