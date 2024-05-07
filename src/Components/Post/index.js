import React, { useEffect, useState } from "react";
import ViewPost from "Components/ViewPost";
import postAPIs from "../../APIs/dashboard/home";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import SkeletonPostsLoading from '../Loader/SkeletonPostsLoading'
import PostItem from "./PostItem";
import avatar from "../../Images/avatar.jpg";
import { useSelector } from "react-redux";

const Posts = ({ postData, comment, isLoading, disable, likePost }) => {
    const [isModalOpen, setIsModalOpenfull] = useState(false);
    const [selectedPostId, setSelectedPostId] = useState(null);
    const [followingData, setFollowingData] = useState([]);
    const navigate = useNavigate();
    const [imagesLoaded, setImagesLoaded] = useState([]);
    const [postRemovalId, setPostRemovalId] = useState();
    const {userId } = useSelector(state => state.auth);

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
        console.log("Download  == ",post);
        try {
          const response = await fetch(mediaUrl, {
            method: 'GET',
          });
      
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
        } catch (error) {
          console.error(error);
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
     * Remove the post from Array when Flagged or Report
     */
    useEffect(() => {
        // console.log("Post Removal id ===", postRemovalId);
        // console.log("followingData ===", followingData);
        // if (postRemovalId) {
        //     const updatedData = followingData.filter(item => item?.post?.id !== postRemovalId);
        //     setFollowingData(updatedData);
        // }

    }, [postRemovalId])

    return (<>
        <iframe id="my_iframe" style={{ display: "none" }}></iframe>
        {isLoading ? <SkeletonPostsLoading /> : followingData.map((item, ind) => <PostItem
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
            disable
            postRemovalId={setPostRemovalId}
        />)}

        {isModalOpen &&
            <ViewPost
                likePost={likePost}
                onHide={closeModal} show={isModalOpen} selectedPostId={selectedPostId} postData={followingData}
                avatar={avatar} />}
    </>);
};

export default Posts;