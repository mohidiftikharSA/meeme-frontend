import Banner from "Components/Banner";
import EarnBadge from "Components/EarnBadge";
import TabDetails from "Components/Tabs";
import React, { useEffect, useState } from "react";
import Loader from "Components/Loader";
import AuthAPIs from "APIs/auth";
import { useSelector } from "react-redux";
import ProfileAPIs from 'APIs/profile/settings'

const ProfilePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [profile, setProfile] = useState();
  const [postRemoved, setPostRemoved] = useState();
  const [userPosts , setUserPosts ] = useState([]);
  const  currentUser = useSelector((state) => state.auth);
  const [userTournamentPost , setUserTournamentPost ] = useState([]);

  useEffect(() => {
    getUserProfile();
    getMyPosts();
    getUserTournamentPosts();
  }, []);

  const getUserTournamentPosts = async ()=>{

    const res = await ProfileAPIs.current_user_tournament_posts();
    if(res){
      console.log("Tournament posts response  - ", res.data.current_user_tournament_posts);
      setUserTournamentPost(res.data.current_user_tournament_posts);
    }
  }

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
              <EarnBadge data={profile?.badges} />
              <TabDetails
                profile
                tournamentPosts={userTournamentPost}
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
