import Heading from "Components/Heading";
import React, { useEffect, useState, useRef } from "react";
import { Button, Container } from "react-bootstrap";
import { useLocation } from 'react-router-dom';
import judge1 from "../../Images/judge1.png";
import judge2 from "../../Images/judge2.png";
import classes from "./index.module.scss";
import { AiFillHeart } from 'react-icons/ai';
import { FaTimes } from 'react-icons/fa';
import api from 'APIs/tournaments'
import SkeletonTournamentPostsLoading from "../../Components/Loader/SkeletonTournamentPostsLoading";
import Skeleton from "react-loading-skeleton";
import { toast } from "react-toastify";
import Loader from "Components/Loader";


const JudgePage = () => {
    const location = useLocation();
    const [isLoading, setIsLoading] = useState(false)
    const [likedPostsCount, setLikedPostsCount] = useState(0);
    const [tournamentPosts, setTournamentPosts] = useState([])
    const [imagesLoaded, setImagesLoaded] = useState([]);
    const [isliking, setIsLiking] = useState(false);
    const likedPostsCountRef = useRef(likedPostsCount);

    useEffect(() => {
        likedPostsCountRef.current = likedPostsCount;
    }, [likedPostsCount]);

    const getTournamentPosts = async () => {
        setIsLoading(true)
        const response = await api.getTournamentPosts().finally(() => {
            setIsLoading(false);
        })
        const notJudgedPosts = response?.data.tournament_posts?.filter(item => item.post_judged_by_current_user == false);
        setTournamentPosts(notJudgedPosts);
        /*const likedCounts = response.data.tournament_posts.filter((item) => item.is_liked_by_current_user == true).length;
        setLikedPostsCount(likedCounts)*/
    }
    const likeDislikePost = async (post_id, isLike = true) => {
        if (likedPostsCountRef.current < 25) {
            setIsLiking(true)
            const response = isLike ? await api.likeTournamentPost({ post_id }) : await api.disLikeTournamentPost({ post_id });
            if (response?.status == 200) {
                removePostFromList(post_id)
                setImagesLoaded([])
                setLikedPostsCount(prevState => {
                    const newCount = parseInt(prevState) + (isLike ? 1 : -1);
                    likedPostsCountRef.current = newCount;
                    return newCount;
                })
                setIsLiking(false)
            }
        } else {
            toast.error('You can only judge 25 posts per day')
        }
    }
    const removePostFromList = (selected_post_id) => {
        setTournamentPosts((prevState) => {
            return prevState.filter((item => item.id !== selected_post_id))
        })
    }
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
    useEffect(() => {
        getTournamentPosts();
        setImagesLoaded([]);
        setLikedPostsCount(new URLSearchParams(location.search).get('count') ?? 0);
    }, []);


    return (
        <>
            <section>
                {isliking && <Loader isLoading={isliking} />}
                <Container>
                    <div className="sectionHolder">
                        <Heading title={"Judge"} judge linkPath={"tornament/judge"} likedCounts={likedPostsCount} />
                        {isLoading ? <SkeletonTournamentPostsLoading /> : tournamentPosts?.length === 0 ? (
                            <p style={{
                                marginTop: '10px', textAlign: 'center'
                            }}> There are no Tournament Posts to Show</p>
                        ) : tournamentPosts?.map((item, ind) => {
                            return (
                                <div
                                    key={`${item.id}_t_posts_${ind}`}
                                    className={classes.postHolder}>
                                    {item.post_type === "image/jpeg" || item.post_type === "image/png" || item.post_type === "image/webp" ? (<div>
                                        <div style={{ display: imagesLoaded[ind] ? 'none' : 'block' }}>
                                            <Skeleton
                                                baseColor="#7c7b7c"
                                                highlightColor="#969696"
                                                height={300} width="100%"
                                                style={{
                                                    marginTop: '10px', borderRadius: '20px'
                                                }} />
                                        </div>
                                        <img
                                            style={{ width: '100%', display: imagesLoaded[ind] ? 'block' : 'none' }}
                                            onLoad={() => handleImageLoad(ind)}
                                            onError={() => handleImageError(ind)}
                                            src={item.post_image} alt="img"
                                        />
                                    </div>) : (
                                        <video loop muted autoPlay width="93%" height="700px" style={{ objectFit: "cover" }} controls >
                                            <source src={item.post_image} type="video/mp4" />
                                            Your browser does not support the video tag.
                                        </video>
                                    )}
                                    <div className={classes.btnGroup}>
                                        <Button style={{ zIndex: '2' }} onClick={() => {
                                            likeDislikePost(item.id)
                                        }} ><AiFillHeart /></Button>

                                        <Button style={{ zIndex: '2' }} onClick={() => {
                                            likeDislikePost(item.id, false)
                                        }} ><FaTimes /></Button>
                                    </div>
                                </div>);
                        })}
                    </div>
                </Container>
            </section>
        </>
    );
};

export default JudgePage;
