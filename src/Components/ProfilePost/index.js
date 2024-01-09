import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import classes from "./index.module.scss";
import PostViewModal from "Components/PostViewModal";
import { FaTrash } from "react-icons/fa";
import PostsAPIs from '../../APIs/dashboard/home';
import { toast } from "react-toastify";
import Loader from "Components/Loader";
import Skeleton from "react-loading-skeleton";


const ProfilePost = ({ data, postRemoved, myProfile, otherProfile }) => {
    const [selectedPostIds, setSelectedPostIds] = useState([]);
    const [selectAll, setSelectAll] = useState(false);
    const [PostViewModalShow, setPostViewModalShow] = useState(false);
    const [modalData, setModalData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [imagesLoaded, setImagesLoaded] = useState([]);


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
                toast.success("Posts Deleted Successfully.");
                setIsLoading(false)
            }
        } else {
            toast.error('Select Post To Delete.')
        }
        setIsLoading(false)
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

    return (
        <>
            {isLoading && <Loader isLoading={isLoading} />}
            <div className="d-flex align-items-center justify-content-between flex-wrap mb-3">
                {!otherProfile ?
                    <>
                        <Form.Check
                            type="checkbox"
                            label="Select All"
                            checked={selectAll}
                            onChange={toggleSelectAll}
                        />
                        <span onClick={() => { deleteSelectedPosts() }} className="btn btn-danger" style={{ padding: "0px 12px", borderRadius: "8px" }}><FaTrash size={12} /></span
                        ></> : ''}
            </div>
            <div className={classes.postHolder}>

                <div className={classes.box}>
                    {data?.slice()?.reverse()?.map((item, ind) => (
                        <div key={ind} className={classes.imgBox}>
                            <label className={classes.checkboxLabel}>
                                {!otherProfile ? <Form.Check
                                    type="checkbox"
                                    checked={selectedPostIds.includes(item.post_id)}
                                    onChange={() =>
                                        toggleSelectPost(item.post_id)
                                    }
                                /> : ''}
                                <div className={classes.imgBox} style={{ display: imagesLoaded[ind] ? 'none' : 'block' }}>
                                    <Skeleton
                                        baseColor="#7c7b7c"
                                        highlightColor="#969696"
                                        height={300} width="300px"
                                        style={{
                                            marginTop: '10px', borderRadius: '20px'
                                        }} />
                                </div>
                                <img
                                    style={{ display: imagesLoaded[ind] ? 'block' : 'none' }}
                                    onLoad={() => handleImageLoad(ind)}
                                    onError={() => handleImageError(ind)}
                                    onClick={() => {
                                        setPostViewModalShow(true);
                                        setModalData(item);
                                    }}
                                    src={item?.post_image} alt="img"
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
