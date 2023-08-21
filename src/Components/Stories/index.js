import React, { useState } from "react";

import classes from "./index.module.scss";
import profile from "../../Images/youuser.png";
import user from "../../Images/user5.png";
import meme9 from "../../Images/meme9.png";
import user2 from "../../Images/user6.png";
import meme2 from "../../Images/sotries1.png";
import user3 from "../../Images/user7.png";
import meme3 from "../../Images/stories2.png";
import Slider from "react-slick";

import { Col, Row } from "react-bootstrap";
import UploadModal from "Components/UploadViewModal";


const otherUserStories = [
  {
    userImg: user,
    meme: meme9,
    name: "Charlotte",
  },
  {
    userImg: user2,
    meme: meme2,
    name: "Charlotte",
  },
  {
    userImg: user3,
    meme: meme3,
    name: "Charlotte",
  },
  {
    userImg: user,
    meme: meme9,
    name: "Charlotte",
  },
];

const Stories = () => {
  const [modalShow, setModalShow] = React.useState(false);
  const [selectedStoryIndex, setSelectedStoryIndex] = useState(null); // Track the selected index

  const openModalWithStory = (index) => {
    setSelectedStoryIndex(index);
    setModalShow(true);
    console.log("fahad", selectedStoryIndex)
  };

  var settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  };
  return (
    <>
      <div className={classes.ImgWrapper}>
        <Row>
          <Col lg={3}>
            <button
              className={classes.imgUploader}
           
              onClick={() => setModalShow(true)}
            >
              <span>Add story</span>
              <div className={classes.prilfe}>
                <img src={profile} alt="img" />
                <p>You</p>
              </div>
            </button>
          </Col>
          <Col lg={9}>
            <Slider {...settings}>
              
              {/* {imageList.map((image, index) => (
                <div key={index} className={classes.ImgBox}>
                  <img src={image.data_url} alt="" width="100" />
                  <div className={classes.prilfe}>
                    <img src={profile} alt="img" />
                    <p>Fahad</p>
                  </div>
                </div>
              ))} */}
              {otherUserStories.map((item, index) => {
                return (
                  <div className={classes.ImgBox}  onClick={() => openModalWithStory(index)}>
                    <img src={item.meme} alt="img" />
                    <div className={classes.prilfe}>
                      <img src={item.userImg} alt="img" />
                      <p>{item.name}</p>
                    </div>
                  </div>
                );
              })}
            </Slider>
          </Col>
        </Row>
      </div>
      <UploadModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        selectedStory={otherUserStories[selectedStoryIndex]}
        // onlyView={selectedStoryIndex}
      />
    </>
  );
};

export default Stories;
