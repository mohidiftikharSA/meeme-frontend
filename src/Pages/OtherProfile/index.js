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
  const { id } = useParams();

  useEffect(() => {
    console.log("Id on other profile =", id);
    getOtherUserProfile();
  }, [id]);

  const getOtherUserProfile = async () => {
    setIsLoading(true);
    const user = await AuthAPIs.otherUserProfile(id);
    if (user) {
      console.log(" Other User =  ", user?.data?.profile);
      setProfile(user?.data?.profile)
    }
    setIsLoading(false);
  }

  return (
    <>
      <Loader isLoading={isLoading} />
      <Banner other profile={profile} />
      <section>
        <div className="sectionHolder py-5">
          <EarnBadge />
          <TabDetails profile profilePosts={profile?.profile_posts} />
        </div>
      </section>
    </>
  );
};

export default OtherProfile;
