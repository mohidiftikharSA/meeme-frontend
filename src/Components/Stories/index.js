import React, {useEffect, useState} from "react";

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

];

const Stories = (data) => {

  const [modalShow, setModalShow] = React.useState(false);
  const [selectedStoryIndex, setSelectedStoryIndex] = useState(null); // Track the selected index
  const [storyData, setStoryData] = useState([]); // Track the selected index

  const openModalWithStory = (index) => {
    setSelectedStoryIndex(index);
    setModalShow(true);
  };
  useEffect(() => {
    setStoryData(data.data)
  }, [data]);
  useEffect(() => {
    console.log('storyData',storyData);
  }, [storyData]);
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
        }
      },
      {
        breakpoint: 580,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  return (
    <>
      <div className={classes.ImgWrapper}>
        <Row>
          <Col md={3} sm={4} xs={6}  className="pe-0">
            <button
              className={classes.imgUploader}
            >
              <span>Add story</span>
              <div className={classes.prilfe}>
                <img src={profile} alt="img" />
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
              {storyData && storyData.map((item, index) => {
                return (
                  <div key={index} className={classes.ImgBox}  onClick={() => openModalWithStory(index)}>
                    <img src={item.story_image} alt="img" />
                    <div className={classes.prilfe}>
                      <img src={item.user_image} alt="img" />
                      <p>{item.username}</p>
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
        story={storyData[selectedStoryIndex]}
        title={"Story"}
      />
    </>
  );
};

export default Stories;
