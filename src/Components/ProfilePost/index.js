import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import classes from "./index.module.scss";
import PostViewModal from "Components/PostViewModal";
import { FaTrash } from "react-icons/fa";
import PostsAPIs from '../../APIs/dashboard/home';
import { toast } from "react-toastify";
import Loader from "Components/Loader";
import Skeleton from "react-loading-skeleton";


const ProfilePost = ({ data, postRemoved, tournament, myProfile, otherProfile }) => {
  const [selectedPostIds, setSelectedPostIds] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [PostViewModalShow, setPostViewModalShow] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState([]);
  const [isDataLoading, setIsDataLoading] = useState(true);


  const toggleSelectPost = (postId) => {
    if (selectedPostIds.includes(postId)) {
      setSelectedPostIds(selectedPostIds.filter((id) => id !== postId));
    } else {
      setSelectedPostIds([...selectedPostIds, postId]);
    }
  };

  const handleImageLoad = (index) => {
    setImagesLoaded((prevImagesLoaded) => {
      const newImagesLoaded = [...prevImagesLoaded];
      newImagesLoaded[index] = true;
      return newImagesLoaded;
    });
  };

  const handleImageError = (index) => {
    imagesLoaded[index] = true;
    setImagesLoaded(imagesLoaded);
  };

  /**
   * Delete Multiple Posts on Checkbox Select
   * Send Back prop to render profile posts again
   */
  const deleteSelectedPosts = async () => {
    console.log("Deletion IDs: ", selectedPostIds);
    if (selectedPostIds && selectedPostIds[0]) {
      setIsLoading(true);
      const res = await PostsAPIs.deletePosts({ post_ids: selectedPostIds });
      if (res) {
        postRemoved(res.data);
        toast.success("Post Deleted Successfully.");
        setIsLoading(false);
      }
    } else {
      toast.error("Select Post To Delete.");
    }
    setIsLoading(false);
  };

  const toggleSelectAll = () => {
    if (selectAll) {
      setSelectedPostIds([]);
    } else {
      const allPostIds = data?.map((item) => item.post_id) || [];
      setSelectedPostIds(allPostIds);
    }
    setSelectAll(!selectAll);
  };

  useEffect(() => {
    if (selectAll) {
      const allPostIds = data?.map((item) => item.post_id) || [];
      setSelectedPostIds(allPostIds);
    } else {
      setSelectedPostIds([]);
    }
  }, [selectAll, data]);

  useEffect(() => {
    if (data !== undefined) {
      setIsDataLoading(false);
    }
  }, [data]);

  function isImage(item) {
    return item.post_type && item.post_type.startsWith("image/");
  }

  return (
    <>
      {isLoading && <Loader isLoading={isLoading} />}
      <div className="d-flex align-items-center justify-content-between flex-wrap mb-3">
        {!otherProfile && (
          <>
            <Form.Check
              type="checkbox"
              label="Select All"
              checked={selectAll}
              onChange={toggleSelectAll}
              className="checkbox-profile"
            />
            <span
              onClick={() => {
                deleteSelectedPosts();
              }}
              className="btn btn-danger"
              style={{ padding: "0px 12px", borderRadius: "8px" }}
            >
              <FaTrash size={12} />
            </span>
          </>
        )}
      </div>
      <div className={classes.postHolder}>
        <div className={data && data[0] ? classes.box : ''}>
          {isDataLoading ? (
            <p className="text-center w-100">Please wait...</p>
          ) : (
            data && data[0] ? data
              .slice()
              .map((item, ind) => (
                <div key={ind} className={classes.imgBox}>
                  <div className={classes.checkboxContainer}>
                    {!otherProfile && (
                      <Form.Check
                        type="checkbox"
                        checked={selectedPostIds.includes(item.post_id)}
                        onChange={() => toggleSelectPost(item.post_id)}
                      />
                    )}
                  </div>
                  {isImage(item) ? (
                    <>
                      <div
                        className={classes.imgBox}
                        style={{
                          display: imagesLoaded[ind] ? "none" : "block",
                        }}
                      >
                        <Skeleton
                          baseColor="#7c7b7c"
                          highlightColor="#969696"
                          height={300}
                          width="300px"
                          style={{
                            marginTop: "10px",
                            borderRadius: "20px",
                          }}
                        />
                      </div>
                      <img
                        style={{
                          display: imagesLoaded[ind] ? "block" : "none",
                          cursor: "pointer", // Optional: to indicate it's clickable for modal
                        }}
                        onLoad={() => handleImageLoad(ind)}
                        onError={() => handleImageError(ind)}
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent the checkbox toggle
                          setPostViewModalShow(true);
                          setModalData(item);
                        }}
                        src={item?.post_image}
                        alt="img"
                      />
                    </>
                  ) : (
                    <video className="videoTagProfile" width="100%" height="auto" controls autoPlay loop muted>
                      <source src={item.post_image} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  )}
                </div>
              )) : <p className="text-center w-100">No Post Available</p>
          )}
        </div>
      </div>
      <PostViewModal
        data={modalData}
        show={PostViewModalShow}
        onHide={() => setPostViewModalShow(false)}
        tournament={tournament}
      />
    </>

  );
};

export default ProfilePost;
