import Banner from "Components/Banner";
import EarnBadge from "Components/EarnBadge";
import TabDetails from "Components/Tabs";
import React, { useEffect, useState } from "react";
import Loader from "Components/Loader";
import AuthAPIs from "APIs/auth";



const ProfilePage = () => {

  const [isLoading, setIsLoading] = useState(false);
  const [profile, setProfile] = useState();
  const [postRemoved, setPostRemoved] = useState();

  useEffect(() => {
    getUserProfile();
  }, [])

  const getUserProfile = async () => {
    setIsLoading(true);
    const userDetails = await AuthAPIs.getCurrentUserProfile();
    if (userDetails) {
      setIsLoading(false);
      setProfile(userDetails.data.profile)
    }
  }

  useEffect(() => {

    if (postRemoved) {
      getUserProfile();
    }

  }, [postRemoved])

  return (
    <>  {
      isLoading ? <Loader isLoading={isLoading} /> :
        <>
          <Banner profile={profile} />
          <section>
            <div className="sectionHolder py-md-5 py-3">
              <EarnBadge />
              <TabDetails profile tournamentPosts={profile?.tournament_posts} profilePosts={profile?.profile_posts} postRemoved={setPostRemoved} />
            </div>
          </section>
        </>
    }
    </>

  );
};

export default ProfilePage;
