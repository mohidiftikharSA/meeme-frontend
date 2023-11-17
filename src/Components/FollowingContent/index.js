import Posts from "Components/Post";
import Stories from "Components/Stories";
import UploadPost from "Components/UploadPost";
import React, {useEffect, useState} from "react";
import user from "../../Images/postuser.png";
import user2 from "../../Images/user10.png";
import post1 from "../../Images/post1.png";
import post2 from "../../Images/post2.png";
import postAPIs from "APIs/dashboard/home";


const postData = [
  {
    id:"1",
    user: user,
    name: "Jullian Fortan",
    location: "Madrid, Spain",
    postTitle: "New Popular meme.",
    tags: "#memes #bestmeme #funnymemes #dankmemes" ,
    post: post1,
    comments: [
      {
        username:'Jullian Fortan',
        comment:'Hahah....You nailed it!',
        userImg:user

      },
      {
        username:'Charlotte',
        comment:'Awesome meme!, I like this one LOL.',
        userImg:user2

      }
    ]
  },
  
  {
    id:"2",
    user: user2,
    name: "Tyler Mady",
    location: "Madrid, Spain",
    post: post2,
    comments: [
      {
        username:'Charlotte',
        comment:'Awesome meme!, I like this one LOL.',
        userImg:user2

      },
      {
        username:'Jullian Fortan',
        comment:'Hahah....You nailed it!',
        userImg:user
      },

    ]

  },
]

const FollowingContent = (avatar) => {

  const [storyData, setStoryData] = useState([]);
  const [followingData, setFollowingData] = useState([]);
  const [apiCallMade, setApiCallMade] = useState(false);
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
    try {
      const res = await postAPIs.getFollowingPosts();
      if (res.status === 200) {
        console.log("Following Posts  = ", res.data.following_posts);
        // Assuming a 200 status code means success
        setFollowingData(res.data.following_posts);
        // Assuming the data is in a property called 'data'
      } else {
        console.error("Error: Unexpected status code", res.status);
      }
    } catch (error) {
      console.error("Error while fetching data:", error);
    }

  };
  useEffect(() => {
      getStories()
    getFollowerPosts()
  }, []);
  return (
    <>
      <Stories data={storyData} avatar={avatar}/>
      <UploadPost />
      <Posts postData={followingData} avatar={avatar}/>
    </>
  );
};

export default FollowingContent;
