import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ViewPost from "Components/ViewPost";
import classes from "./index.module.scss";
import avatar from "../../Images/avatar.jpg";
import PostViewModal from "Components/PostViewModal";

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
        // Call your delete API or perform delete action here using selectedPostIds
    };

    const toggleSelectAll = () => {
        if (selectAll) {
            setSelectedPostIds([]);
        } else {
            const allPostIds = data?.map((item) => item.post?.id) || [];
            setSelectedPostIds(allPostIds);
        }
        setSelectAll(!selectAll);
    };

    const prepareMonthOptions = () => {
        // ... Your existing prepareMonthOptions logic
    };

    useEffect(() => {
        prepareMonthOptions();
    }, []);

    return (
        <>
            <h1 onClick={deleteSelectedPosts}>Delete</h1>
            <div className={classes.postHolder}>
                <Form.Check
                    type="checkbox"
                    label="Select All"
                    checked={selectAll}
                    onChange={toggleSelectAll}
                />
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
