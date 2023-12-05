import React, {useEffect, useState} from "react";
import ViewPost from "Components/ViewPost";
import postAPIs from "../../APIs/dashboard/home";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import SkeletonPostsLoading from '../Loader/SkeletonPostsLoading'
import PostItem from "./PostItem";
import avatar from "../../Images/avatar.jpg";

const Posts = ({postData, comment, isLoading}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPostId, setSelectedPostId] = useState(null);
    const [followingData, setFollowingData] = useState([]);
    const navigate = useNavigate();
    const [imagesLoaded, setImagesLoaded] = useState([]);
    const openModal = (postId) => {
        console.log('postId', postId)
        setSelectedPostId(postId);
        setIsModalOpen(true);
    }

    const closeModal = () => {
        setIsModalOpen(false);
    }


    useEffect(() => {
        setFollowingData(postData);
    }, [postData, isLoading]);

    const likePost = async (post_id) => {
        try {
            const res = await postAPIs.likePost({post_id});
            if (res.status === 200) {
                const updatedItems = postData.map(item => {
                    if (item.post.id === post_id) {
                        return {
                            ...item,
                            liked_by_current_user: res.data.type_data.is_liked,
                            post_likes: res.data.likes_count
                        };
                    }
                    return item
                });
                setFollowingData(updatedItems);
            } else {
                console.error("Error: Unexpected status code", res.status);
            }
        } catch (error) {
            console.error("Error while fetching data:", error);
        }

    };

    const copyToClipboard = (linkToCopy) => {

        navigator.clipboard.writeText(linkToCopy)
            .then(() => {
                console.log('Link copied to clipboard:', linkToCopy);
                toast.success('Link Copied Successfully', {
                    position: "top-right", autoClose: 2000,
                });

            })
            .catch(err => {
                console.error('Unable to copy link to clipboard', err);
                toast.error('Failed Link Copy', {
                    position: "top-right", autoClose: 2000,
                });
            });
    }


    const toggleActive = (itemId) => {
        const updatedItems = postData.map(item => {
            if (item.post.id === itemId) {
                return {...item, liked_by_current_user: !item.liked_by_current_user};
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

    const downloadMedia = (mediaUrl, id) => {
        console.log("media url === ", mediaUrl);

        const link = document.createElement('a');
        link.href = mediaUrl;
        link.download = 'image.jpg'; // You can set the desired filename here
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
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
        {isLoading ? <SkeletonPostsLoading/> : followingData.map((item, ind) => <PostItem
            key={ind}
            item={item}
            ind={ind}
            likePost={likePost}
            downloadMedia={downloadMedia}
            redirectToOtherProfile={redirectToOtherProfile}
            openModal={openModal}
            copyToClipboard={copyToClipboard}
            handleImageLoad={handleImageLoad}
            handleImageError={handleImageError}
            imagesLoaded={imagesLoaded}
            comment={comment}
        />)}

        <ViewPost onHide={closeModal} show={isModalOpen} selectedPostId={selectedPostId} postData={postData}
                  avatar={avatar}/>
    </>);
};

export default Posts;