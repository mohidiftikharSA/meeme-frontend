import Banner from "Components/Banner";
import EarnBadge from "Components/EarnBadge";
import TabDetails from "Components/Tabs";
import React from "react";

const OtherProfile = () => {
  return (
    <>
      <Banner other />
      <div className="sectionHolder py-5">
      <EarnBadge />
      <TabDetails profile/>
      </div>
    </>
  );
};

export default OtherProfile;
