import Banner from "Components/Banner";
import EarnBadge from "Components/EarnBadge";
import TabDetails from "Components/Tabs";
import React, { useEffect, useState } from "react";
import Loader from "Components/Loader";
import AuthAPIs from "APIs/auth";



const ProfilePage = () => {

  const [isLoading, setIsLoading] = useState(false);
  const [profile , setProfile ] = useState();

  useEffect(()=>{
    getUserProfile();
  },[])

  const getUserProfile = async ()=>{
    setIsLoading(true);
    const userDetails = await AuthAPIs.getCurrentUserProfile();
    if(userDetails){
      setIsLoading(false);
      setProfile(userDetails.data.profile)
    }
  }

  return (
    <>  {
      isLoading ? <Loader isLoading={isLoading} /> :
        <>
          <Banner profile={profile} />
          <section>
            <div className="sectionHolder py-md-5 py-3">
              <EarnBadge />
              <TabDetails profile profilePosts={profile?.profile_posts} />
            </div>
          </section>
        </>
    }
    </>

  );
};

export default ProfilePage;
