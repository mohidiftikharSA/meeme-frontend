import React, { useEffect, useState } from "react";

import classes from "./index.module.scss";
import avatar from "../../Images/youuser.png";
import Slider from "react-slick";
import { useSelector } from "react-redux";
import user from "../../Images/avatar.png";

import { Col, Row } from "react-bootstrap";
import UploadModal from "Components/UploadViewModal";
import { FaPlus } from "react-icons/fa6";

const otherUserStories = [];

const Stories = (props) => {
  const [modalShow, setModalShow] = useState(false);
  const [selectedStoryIndex, setSelectedStoryIndex] = useState(null);
  const [storyData, setStoryData] = useState([]);
  const [addStory, setAddStory] = useState(false);
  const [userStories, setUserStories] = useState([]);
  const { profile } = useSelector((state) => state.auth);

  const onClickAddStory = () => {
    setSelectedStoryIndex(null);
    setModalShow(true);
    setAddStory(true);
  };
  const openModalWithStory = (index) => {
    setSelectedStoryIndex(index);
    setUserStories(props.data[index]);
    setModalShow(true);
  };
  const onModalHide = () => {
    setAddStory(false);
    setSelectedStoryIndex(null);
    setModalShow(false);
  };
  const onStoryAdded = () => {
    props.onStoryUpdate();
    console.log("story added");
  };
  const hydrateFields = () => {
    setStoryData([]);
    props.data.forEach((userStory, index) => {
      setStoryData((prevState) => {
        return userStory.stories?.[0]
          ? [...prevState, userStory.stories[0]]
          : prevState;
      });
    });
  };
  useEffect(() => {
    hydrateFields();
  }, [props]);

  // useEffect(() => {

  // }, [storyData]);
  var settings = {
    dots: false,
    arrows: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 580,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <>
      <div className={classes.ImgWrapper}>
        <Row>
          <Col md={3} sm={4} xs={6} className="pe-0">
            <button onClick={onClickAddStory} className={classes.imgUploader}>
              <span>Add story </span>
              <div className={classes.profile}>
                <img
                  src={profile?.user_image || user}
                  alt="img"
                  style={{ objectFit: "cover" }}
                />
                <span><FaPlus /> </span>
                <p>You</p>
              </div>
            </button>
          </Col>
          <Col md={9} sm={8} xs={6}>
            <Slider {...settings} className="stories-slider">
              {/* {imageList.map((image, index) => (
                <div key={index} className={classes.ImgBox}>
                  <img src={image.data_url} alt="" width="100" />
                  <div className={classes.prilfe}>
                    <img src={profile} alt="img" />
                    
                    <p>Fahad</p>
                  </div>
                </div>
              ))} */}
              {storyData &&
                storyData.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className={classes.ImgBox}
                      onClick={() => openModalWithStory(index)}
                    >
                      {item.story_type === "video/quicktime" || item.story_type === "video" ? (
                        <video className={classes.storyvideo} autoPlay muted>
                          <source src={item.story_image} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                      ) : (
                        <img src={item.story_image} alt="img" />
                      )}
                      <div id={classes.story_pic} className={classes.prilfe}>
                        {/* <img src={item?.user_image} alt="img"/> */}
                        <img
                          src={item?.user_image || user}
                          alt="img"
                          style={{ objectFit: "cover" }}
                        />
                        <p>{item?.username}</p>
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
        onHide={onModalHide}
        story={storyData[selectedStoryIndex]}
        stories={userStories?.stories ?? []}
        title={addStory ? "Add Story" : "Story"}
        addStory={addStory}
        storyAdded={onStoryAdded}
      />
    </>
  );
};

export default Stories;
