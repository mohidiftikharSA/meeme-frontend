import Posts from "Components/Post";
import Stories from "Components/Stories";
import UploadPost from "Components/UploadPost";
import React, {useEffect, useState} from "react";
import avatar from "../../Images/avatar.jpg";
import postAPIs from "APIs/dashboard/home";
import followingPostsData from '../Post/folllowingData.json'

const FollowingContent = () => {

    const [storyData, setStoryData] = useState([]);
    const [followingData, setFollowingData] = useState([]);
    const [apiCallMade, setApiCallMade] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const getStories = async () => {
        try {
            const res = await postAPIs.getStories();
            if (res.status === 200) {
                // Assuming a 200 status code means success
                if (res.data.user_stories && res.data.user_stories[0]) {
                    const data = res.data.user_stories[0]?.stories;
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
    return (<>
        <Stories data={storyData} avatar={avatar}/>
        <UploadPost/>
        <Posts postData={followingData} isLoading={isLoading} avatar={avatar}/>
    </>);
};

export default FollowingContent;
