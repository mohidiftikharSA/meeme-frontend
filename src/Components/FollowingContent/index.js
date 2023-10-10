import Posts from "Components/Post";
import Stories from "Components/Stories";
import UploadPost from "Components/UploadPost";
import React, { useEffect } from "react";
import user from "../../Images/postuser.png";
import user2 from "../../Images/user10.png";
import post1 from "../../Images/post1.png";
import post2 from "../../Images/post2.png";
import postAPIs from "APIs/dashboard/home";
const postData = [
  {
    user: user,
    name: "Jullian Fortan",
    location: "Madrid, Spain",
    postTitle: "New Popular meme.",
    tags: "#memes #bestmeme #funnymemes #dankmemes",
    post: post1,
  },
  {
    user: user2,
    name: "Tyler Mady",
    location: "Madrid, Spain",
    post: post2,
  },
];

const FollowingContent = () => {
  return (
    <>
      <Stories />
      <UploadPost />
      <Posts postData={postData} />
    </>
  );
};

export default FollowingContent;
