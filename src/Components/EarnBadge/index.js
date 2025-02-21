import React, { useState } from "react";
import classes from "./index.module.scss";
import badge from "../../Images/badge1.png";
import badge1 from "../../Images/2nd.png";
import badge2 from "../../Images/badge3.png";
import badge4 from "../../Images/badge5.png";
import badge5 from "../../Images/badge6.png";
import badge6 from "../../Images/badge7.png";
import OrganizeBadges from "Components/OrganizeBadgesModal";
import Slider from "react-slick";
import { useSelector } from "react-redux";
const EarnBadge = ({ profile ,data }) => {
    const { user } = useSelector((state) => state.auth);
  
  // console.log("Data is Earned badges  --- ", data);
  // console.log("Profile in Earned badges  --- ", profile?.user?.id);
  // console.log("user in Earned badges  --- ", user.id);
  const [organizeModalShow, setOrganizeShow] = useState(false);
  const settings = {
    dots: false,
    infinite: false,
    arrows: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 667,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
          infinite: true,

        },
      },
      {
        breakpoint: 580,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,

        },
      },
      {
        breakpoint: 440,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,

        },
      },
    ],
  };
  return (
    <>
      <div className={classes.badgeHolder}>
        <div className={classes.header}>
          <h5 className="mb-0">Earned Badges</h5>
          {user.id === profile?.user?.id && <p className={`mb-0 ${classes.btn}`} onClick={() => setOrganizeShow(true)}>
            Organize Badges
          </p>}
        </div>

        <ul className={classes.listBadge}>
          <Slider {...settings}>
            {data && data[0] ? data.map((item, index) => {
              return (
                <li key={index}>
                  <div className={classes.iconBox}>
                    <img src={item.badge_image} alt="img"></img>
                  </div>
                  <p>{item?.title}</p>
                </li>
              )
            }) :
              <p>No Badges Available</p>
            }
          </Slider>
        </ul>
      </div>
      <OrganizeBadges
        show={organizeModalShow}
        onHide={() => setOrganizeShow(false)}
        userId={profile?.user?.id}
      />
    </>
  );
};

export default EarnBadge;
