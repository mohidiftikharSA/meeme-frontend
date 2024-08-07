import Banner from "Components/Banner";
import EarnBadge from "Components/EarnBadge";
import TabDetails from "Components/Tabs";
import React, { useEffect, useState } from "react";
import Loader from "Components/Loader";
import AuthAPIs from "APIs/auth";
import { useSelector } from "react-redux";

const ProfilePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [profile, setProfile] = useState();
  const [postRemoved, setPostRemoved] = useState();
  const [userPosts , setUserPosts ] = useState([]);
  const  currentUser = useSelector((state) => state.auth);

  useEffect(() => {
    getUserProfile();
    getMyPosts();
  }, []);

  const getUserProfile = async () => {
    setIsLoading(true);
    const userDetails = await AuthAPIs.getCurrentUserProfile();
    if (userDetails) {
      setIsLoading(false);
      setProfile(userDetails.data.profile);
    }
  };

  const getMyPosts = async () => {
    setIsLoading(true);
    console.log("currentUser ---- ", currentUser?.user?.id);
    const userPosts = await AuthAPIs.getMyPosts(currentUser?.user?.id);
    if (userPosts) {
      console.log("Get My Posts =", userPosts);
      setUserPosts(userPosts.data?.user_posts);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (postRemoved) {
      getUserProfile();
      getMyPosts();
    }
  }, [postRemoved]);

  return (
    <>
      {" "}
      {isLoading ? (
        <Loader isLoading={isLoading} />
      ) : (
        <>
          <Banner profile={profile} />
          <section>
            <div className="sectionHolder py-md-5 py-3">
              <EarnBadge />
              <TabDetails
                profile
                tournamentPosts={profile?.tournament_posts}
                profilePosts={userPosts}
                postRemoved={setPostRemoved}
              />
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default ProfilePage;
