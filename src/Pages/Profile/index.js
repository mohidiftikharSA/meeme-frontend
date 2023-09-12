import Banner from "Components/Banner";
import EarnBadge from "Components/EarnBadge";
import TabDetails from "Components/Tabs";
import React from "react";

const ProfilePage = () => {
  return (
    <>
      <Banner />
     <section>
     <div className="sectionHolder py-md-5 py-3">
      <EarnBadge />
      <TabDetails profile/>
      </div>
     </section>
    </>
  );
};

export default ProfilePage;
