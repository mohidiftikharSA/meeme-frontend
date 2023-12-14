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

const judgeData = [{
    img: judge1,
}, {
    img: judge2,
},];

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
        setTournamentPosts(response.data.tournament_posts);
        const likedCounts = tournamentPosts.filter((item) => item.is_liked_by_current_user).length;
        console.log("Counts ", likedCounts)
        setLikedPostsCount(likedCounts)
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
    }, []);
    return (<section>
        <Container>
            <div className="sectionHolder">
                <Heading title={"Judge"} judge linkPath={"tornament"}/>
                {
                    isLoading ? <SkeletonTournamentPostsLoading></SkeletonTournamentPostsLoading> :
                        tournamentPosts.map((item, ind) => {
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
                                    <Button><AiFillHeart/></Button>
                                    <Button><FaTimes/></Button>
                                </div>
                            </div>);
                        })
                }

            </div>
        </Container>
    </section>);
};

export default JudgePage;
