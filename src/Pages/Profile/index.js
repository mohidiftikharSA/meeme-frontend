import Banner from "Components/Bannner";
import EarnBadge from "Components/EarnBadge";
import TabDetails from "Components/Tabs";
import React from "react";

const ProfilePage = () => {
  return (
    <>
      <Banner />
      <div className="sectionHolder py-5">
      <EarnBadge />
      <TabDetails profile/>
      </div>
    </>
  );
};

export default ProfilePage;
