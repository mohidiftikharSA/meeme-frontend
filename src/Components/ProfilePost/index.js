import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import classes from "./index.module.scss";
import PostViewModal from "Components/PostViewModal";
import { FaTrash } from "react-icons/fa";

const ProfilePost = ({ data }) => {
    const [selectedPostIds, setSelectedPostIds] = useState([]);
    const [selectAll, setSelectAll] = useState(false);
    const [monthOptions, setMonthOptions] = useState([]);
    const [PostViewModalShow, setPostViewModalShow] = useState(false);
    const [modalData, setModalData] = useState(null);

    const toggleSelectPost = (postId) => {
        if (selectedPostIds.includes(postId)) {
            setSelectedPostIds(selectedPostIds.filter((id) => id !== postId));
        } else {
            setSelectedPostIds([...selectedPostIds, postId]);
        }
    };

    const deleteSelectedPosts = async () => {
        console.log("Deletion IDs: ", selectedPostIds);
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

    // Handle checking/unchecking all individual post checkboxes when clicking "Select All"
    useEffect(() => {
        if (selectAll) {
            const allPostIds = data?.map((item) => item.post_id) || [];
            setSelectedPostIds(allPostIds);
        } else {
            setSelectedPostIds([]);
        }
    }, [selectAll, data]);

    return (
        <>
           <div className="d-flex align-items-center justify-content-between flex-wrap mb-3">
           <Form.Check
           type="checkbox"
           label="Select All"
           checked={selectAll}
           onChange={toggleSelectAll}
           />
           <span className="btn btn-danger" style={{padding:"0px 12px", borderRadius:"8px"}}><FaTrash  size={12}/></span>
           </div>
            <div className={classes.postHolder}>
                
                <div className={classes.box}>
                    {data?.slice()?.reverse()?.map((item, ind) => (
                        <div key={ind} className={classes.imgBox}>
                            <label className={classes.checkboxLabel}>
                                <Form.Check
                                    type="checkbox"
                                    checked={selectedPostIds.includes(
                                        item.post_id
                                    )}
                                    onChange={() =>
                                        toggleSelectPost(item.post_id)
                                    }
                                />
                                <img
                                    src={item?.post_image}
                                    alt=""
                                    onClick={() => {
                                        setPostViewModalShow(true);
                                        setModalData(item);
                                    }}
                                />
                            </label>
                        </div>
                    ))}
                </div>
            </div>
            <PostViewModal
                data={modalData}
                show={PostViewModalShow}
                onHide={() => setPostViewModalShow(false)}
            />
        </>
    );
};

export default ProfilePost;
