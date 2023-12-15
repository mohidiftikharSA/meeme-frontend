import Heading from "Components/Heading";
import React, {useEffect, useState} from "react";
import {Button, Container} from "react-bootstrap";
import judge1 from "../../Images/judge1.png";
import judge2 from "../../Images/judge2.png";
import classes from "./index.module.scss";
import {AiFillHeart} from 'react-icons/ai';
import {FaTimes} from 'react-icons/fa';
import api from 'APIs/tournaments'
import SkeletonTournamentPostsLoading from "../../Components/Loader/SkeletonTournamentPostsLoading";
import Skeleton from "react-loading-skeleton";


const JudgePage = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [likedPostsCount, setLikedPostsCount] = useState(0);
    const [tournamentPosts, setTournamentPosts] = useState([])
    const [imagesLoaded, setImagesLoaded] = useState([]);

    const getTournamentPosts = async () => {
        setIsLoading(true)
        const response = await api.getTournamentPosts().finally(() => {
            setIsLoading(false);
        })
        const notJudgedPosts = response.data.tournament_posts?.filter(item => item.post_judged_by_current_user == false);
        setTournamentPosts(notJudgedPosts);
        const likedCounts = response.data.tournament_posts.filter((item) => item.is_liked_by_current_user == true).length;
        setLikedPostsCount(likedCounts)
    }
    const likeDislikePost = async (post_id, isLike = true) => {
        console.log("Post ID ", post_id)
        const response = isLike ? await api.likeTournamentPost({post_id}) : await api.disLikeTournamentPost({post_id});
        if (response.status == 200) {
            removePostFromList(post_id)
            setImagesLoaded([])
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
    }, []);
    return (<section>
        <Container>
            <div className="sectionHolder">
                <Heading title={"Judge"} judge linkPath={"tornament"} likedCounts={likedPostsCount}/>
                {isLoading ?
                    <SkeletonTournamentPostsLoading></SkeletonTournamentPostsLoading> : tournamentPosts.map((item, ind) => {
                        return (<div
                            key={`${item.id}_t_posts_${ind}`}
                            className={classes.postHolder}>
                            <div style={{display: imagesLoaded[ind] ? 'none' : 'block'}}>
                                <Skeleton
                                    height={300} width="100%"
                                    style={{
                                        marginTop: '10px', borderRadius: '20px'
                                    }}/>
                            </div>
                            <div className="imgBox">
                                <img
                                    src={item.post_image}
                                    alt="icon"
                                    style={{borderRadius: "30px", display: imagesLoaded[ind] ? 'block' : 'none'}}
                                    onLoad={() => handleImageLoad(ind)}
                                    onError={() => handleImageError(ind)}
                                />
                            </div>
                            <div className={classes.btnGroup}>
                                <Button onClick={() => {
                                    likeDislikePost(item.id)
                                }}><AiFillHeart/></Button>

                                <Button onClick={() => {
                                    likeDislikePost(item.id, false)
                                }}><FaTimes/></Button>
                            </div>
                        </div>);
                    })}

            </div>
        </Container>
    </section>);
};

export default JudgePage;
