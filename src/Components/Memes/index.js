import React, {useEffect, useState} from "react";
import classes from "./index.module.scss";
import ViewPost from "Components/ViewPost";
import avatar from "../../Images/avatar.png";
import MemeItem from "./MemeItem";
import MemeItemSkeleton from "./MemeItemSkeleton";
import postAPIs from "../../APIs/dashboard/home";

const MemesDetails = ({newMemesData, explore, isLoading}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPostId, setSelectedPostId] = useState(null);
    const [postData, setPostData] = useState([]);

    const openModal = (postId) => {
        setSelectedPostId(postId);
        setIsModalOpen(true);
        console.log(postId);
    };

    useEffect(() => {
        setPostData(newMemesData);
    }, [newMemesData, isLoading]);

    const closeModal = () => {
        setIsModalOpen(false);
    };
    const likePost = async (post_id) => {
        try {
            const res = await postAPIs.likePost({post_id});
            if (res.status === 200) {
                const updatedItems = postData.map(item => {
                    if (item.post.id === post_id) {
                        return {
                            ...item,
                            liked_by_current_user: res.data.type_data.is_liked,
                            post_likes: res.data.likes_count,
                            test: ''
                        };
                    }
                    return item
                });
                setPostData(updatedItems);
            } else {
                console.error("Error: Unexpected status code", res.status);
            }
        } catch (error) {
            console.error("Error while fetching data:", error);
        }
    }
    
    return (
        <>
            {
                isLoading ? <MemeItemSkeleton explore={explore}/> :
                    <div
                        className={`${classes.flexBox} ${
                            explore ? `${classes.exploreBox}` : ""
                        }`}
                    >
                        {postData.map((item, ind) => (
                            <MemeItem key={ind} item={item} openModal={openModal} explore/>
                        ))}
                    </div>
            }
            <ViewPost
                onHide={closeModal}
                show={isModalOpen}
                selectedPostId={selectedPostId}
                postData={postData}
                avatar={avatar}
                likePost={likePost}
                explore
            />
        </>
    );
};

export default MemesDetails;
