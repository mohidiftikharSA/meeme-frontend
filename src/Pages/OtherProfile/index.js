import Banner from "Components/Banner";
import EarnBadge from "Components/EarnBadge";
import TabDetails from "Components/Tabs";
import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import AuthAPIs from '../../APIs/auth';
import Loader from "Components/Loader";

const OtherProfile = () => {

  const [isLoading, setIsLoading] = useState(false);
  const [profile , setProfile ] = useState();
  const [userPosts , setUserPosts ] = useState();
  const { id } = useParams();

  useEffect(() => {
    getOtherUserProfile();
    if(id) getOtherUserPosts(id)
  }, [id]);

  const getOtherUserProfile = async () => {
    setIsLoading(true);
    const user = await AuthAPIs.otherUserProfile(id);
    if (user) {
      setProfile(user?.data?.profile)
    }
    setIsLoading(false);
  }


 const getOtherUserPosts = async(id)=>{
    setIsLoading(true);
    console.log("currentUser ---- ", id);
    const userPosts = await AuthAPIs.getMyPosts(id);
    if (userPosts) {
      console.log("Get My Posts =", userPosts);
      setUserPosts(userPosts.data?.user_posts);
      setIsLoading(false);
    }
 }

  return (
    <>
      <Loader isLoading={isLoading} />
      <Banner other profile={profile} />
      <section>
        <div className="sectionHolder py-5">
          <EarnBadge data={profile?.badges} />
          <TabDetails otherProfile profile profilePosts={userPosts}/>
        </div>
      </section>
    </>
  );
};

export default OtherProfile;
