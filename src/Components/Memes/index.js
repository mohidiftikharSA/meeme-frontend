import React, {useEffect, useState} from "react";
import classes from "./index.module.scss";
import ViewPost from "Components/ViewPost";
import avatar from "../../Images/avatar.jpg";
import MemeItem from "./MemeItem";
import MemeItemSkeleton from "./MemeItemSkeleton";

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
                            <MemeItem key={item.post.id} item={item} openModal={openModal} explore/>
                        ))}
                    </div>
            }
            <ViewPost
                onHide={closeModal}
                show={isModalOpen}
                selectedPostId={selectedPostId}
                postData={postData}
                avatar={avatar}
                explore
            />
        </>
    );
};

export default MemesDetails;
