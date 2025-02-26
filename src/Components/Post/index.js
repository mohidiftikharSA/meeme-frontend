import React, { useEffect, useState } from "react";
import ViewPost from "Components/ViewPost";
import postAPIs from "../../APIs/dashboard/home";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import SkeletonPostsLoading from '../Loader/SkeletonPostsLoading'
import PostItem from "./PostItem";
import avatar from "../../Images/avatar.png";
import { useSelector } from "react-redux";

const Posts = ({ postData, comment, isLoading, disable, likePost, setPostRemovalIdRoot, sharePost }) => {
    const [isModalOpen, setIsModalOpenfull] = useState(false);
    const [selectedPostId, setSelectedPostId] = useState(null);
    const [followingData, setFollowingData] = useState([]);
    const navigate = useNavigate();
    const [imagesLoaded, setImagesLoaded] = useState([]);
    const [postRemovalId, setPostRemovalId] = useState();
    const { userId } = useSelector(state => state.auth);

    const openModal = (postId) => {
        console.log('postId', postId)
        if (!comment) {
            setSelectedPostId(postId);
            setIsModalOpenfull(true);
        }
    }

    const closeModal = (modifiedPost) => {
        setIsModalOpenfull(false);
        const updatedItems = postData.map(item => {
            // console.log("Post ", JSON.stringify(modifiedPost))
            if (item.post.id === modifiedPost.post.id) {
                return modifiedPost
            }
            return item
        });
        setFollowingData(updatedItems);
    }

    useEffect(() => {
        setFollowingData(postData);
    }, [postData, isLoading]);



    const copyToClipboard = (linkToCopy) => {
        console.log("Copy Link function =", linkToCopy);
        navigator.clipboard.writeText(linkToCopy)
            .then(() => {
                console.log('Link copied to clipboard:', linkToCopy);

            })
            .catch(err => {
                console.error('Unable to copy link to clipboard', err);
            });
    }


    const toggleActive = (itemId) => {
        const updatedItems = postData.map(item => {
            if (item.post.id === itemId) {
                return { ...item, liked_by_current_user: !item.liked_by_current_user };
            }
            return item;
        });
        console.log('updatedItems', updatedItems)
        setFollowingData(updatedItems);
    };

    const redirectToOtherProfile = (data) => {
        console.log("On CLick Data = ", data);
        navigate(`/otherProfile/${data?.post?.user_id}`)
    }


    const downloadMedia = async (mediaUrl, post) => {
        console.log("Download  == ", post);
        if (post.post_type !== "video/mp4" &&  post.post_type !=='video/quicktime') {
            try {
                const response = await fetch(mediaUrl, {
                    method: 'GET',
                    mode: 'cors',           // Ensures CORS is handled
                    cache: 'no-cache',
                    headers: {
                        'Content-Type': 'application/octet-stream'
                    }
                });
                console.log("downloadMedia response, ", response);
                if (!response.ok) {
                    throw new Error('Failed to download the file');
                }

                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);

                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', `Meme_${post?.username}_${post?.post?.id}.png`);
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                // Revoke the object URL after download
                window.URL.revokeObjectURL(url);
            } catch (error) {
                console.error(error);
            }
        } else if (post.post_type === "video/mp4" || post.post_type ==='video/quicktime'){
            // Show processing toast
            const toastId = toast.loading("Processing your video download...");

            try {
                console.log("Media url -=",);
                const videoUrl = post?.post_image;
                const response = await fetch(videoUrl, {
                    method: 'GET',
                    mode: 'cors',          
                    cache: 'no-cache',
                    headers: {
                        'Content-Type': 'application/octet-stream'
                    }
                });
                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = `${post.username}_${post.post.id}.mp4`;
                document.body.appendChild(a);
                a.click();
                a.remove();
                window.URL.revokeObjectURL(url);

                // Close the toast after download is complete
                toast.dismiss(toastId);
                toast.success("Video downloaded successfully!");
            } catch (error) {
                console.error(error);
                // Close the toast and show error message
                toast.dismiss(toastId);
                toast.error("Failed to download video.");
            }
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

    return (<>
        <iframe id="my_iframe" style={{ display: "none" }}></iframe>
        {isLoading ? <SkeletonPostsLoading /> : followingData[0] && followingData.map((item, ind) =>
            <>
                <PostItem
                    key={ind}
                    item={item}
                    ind={ind}
                    likePost={likePost}
                    sharePost={sharePost}
                    downloadMedia={downloadMedia}
                    redirectToOtherProfile={redirectToOtherProfile}
                    openModal={openModal}
                    copyToClipboard={copyToClipboard}
                    handleImageLoad={handleImageLoad}
                    handleImageError={handleImageError}
                    imagesLoaded={imagesLoaded}
                    comment={comment}
                    disable
                    postRemovalId={setPostRemovalIdRoot}
                /></>
        )}

        {isModalOpen &&
            <ViewPost
                likePost={likePost}
                sharePost={sharePost}
                onHide={closeModal} show={isModalOpen} selectedPostId={selectedPostId} postData={followingData}
                avatar={avatar} />}
    </>);
};

export default Posts;