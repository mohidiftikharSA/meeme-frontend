import React, { useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import classes from "./index.module.scss";
import { useNavigate } from "react-router-dom";
import CongratsModal from "Components/CongratsModal";
import { Button } from "react-bootstrap";
import JudgeModal from "Components/JudgeModal";

const Heading = ({
  title,
  judge,
  badge,
  linkPath,
  likedCounts,
  noLink,
  comment,
  onHide,
}) => {
  const [modalShow, setModalShow] = useState(false);
  const [JudgeModalShow, setJudgeModalShow] = useState(false);
  const navigate = useNavigate();
  const backPage = () => {
    if (linkPath) {
      navigate(`/${linkPath}`);
      console.log(linkPath);
    }
  };
  const handleCloseClick = () => {
    window.close();
  };

  const handleDeleteModal = () => {
    setModalShow(false);
  };
  useEffect(() => {
    console.log("Counts ", likedCounts);
  }, [likedCounts]);
  return (
    <>
      {noLink ? (
        <div className={classes.heading}>
          <h5>{title}</h5>
        </div>
      ) : (
        <div
          className={`${classes.heading} ${
            [badge, judge] &&
            `${classes.heading} d-flex align-items-center justify-content-between`
          } `}
          onClick={backPage}
        >
          {onHide ? (
            <h5>
              {comment !== true && <IoIosArrowBack onClick={onHide} />}

              {title}
            </h5>
          ) : (
            <h5>
              <IoIosArrowBack />
              {title}
            </h5>
          )}

          {judge && (
            <div className={classes.memeNo} onClick={() => setModalShow(true)}>
              <span
                className="text-light"
                onClick={() => setJudgeModalShow(true)}
              >
                {likedCounts ?? 0}
              </span>
              /100
            </div>
          )}
          {badge && (
            <Button
              style={{ height: "42px", lineHeight: "42px", padding: "0 42px" }}
            >
              Upload Badge
            </Button>
          )}
        </div>
      )}
      <CongratsModal show={modalShow} onHide={handleDeleteModal} />
      <JudgeModal
        post
        show={JudgeModalShow}
        onHide={() => setJudgeModalShow(false)}
      />
    </>
  );
};
export default Heading;
