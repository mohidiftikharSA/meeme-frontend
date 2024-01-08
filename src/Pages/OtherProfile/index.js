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
    getOtherUserProfile();
  }, [id]);

  const getOtherUserProfile = async () => {
    setIsLoading(true);
    const user = await AuthAPIs.otherUserProfile(id);
    if (user) {
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
          <TabDetails otherProfile profile profilePosts={profile?.profile_posts} />
        </div>
      </section>
    </>
  );
};

export default OtherProfile;
