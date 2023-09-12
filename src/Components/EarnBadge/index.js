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
const EarnBadge = () => {
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
          <p className={`mb-0 ${classes.btn}`} onClick={() => setOrganizeShow(true)}>
            Organize Badges
          </p>
        </div>

        <ul className={classes.listBadge}>
          <Slider {...settings}>
            <li>
              <div className={classes.iconBox}>
                <img src={badge} alt="img"></img>
              </div>
              <p>1st Place</p>
            </li>
            <li>
              <div className={classes.iconBox}>
                <img src={badge1} alt="img"></img>
              </div>
              <p>2nd Place</p>
            </li>
            <li>
              <div className={classes.iconBox}>
                <img src={badge2} alt="img"></img>
              </div>
              <p>3rd Place</p>
            </li>
            <li>
              <div className={classes.iconBox}>
                <img src={badge4} alt="img"></img>
              </div>
              <p>100 Hrs Spent</p>
            </li>
            <li>
              <div className={classes.iconBox}>
                <img src={badge5} alt="img"></img>
              </div>
              <p>Most Wins</p>
            </li>
            <li>
              <div className={classes.iconBox}>
                <img src={badge6} alt="img"></img>
              </div>
              <p>Top shot</p>
            </li>
          </Slider>
        </ul>
      </div>
      <OrganizeBadges
        show={organizeModalShow}
        onHide={() => setOrganizeShow(false)}
      />
    </>
  );
};

export default EarnBadge;
