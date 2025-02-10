import React, {useState} from "react";
import classes from "./index.module.scss";
import dummyUser from "../../Images/user-dummy.png";
import defaultImage from "../../Images/default.png";
import Skeleton from "react-loading-skeleton";

const MemeItem = ({item, openModal}) => {
    // console.log("item.username == ", item.username);
    // console.log("Meme Item == ", item);
    const [imageLoaded, setImageLoaded] = useState(false);

    function isImage(item) {
        return item.post_type && item.post_type.startsWith("image/");
    }

    const handleImageLoad = () => {
        setImageLoaded(true);
    }
    return (
        <div className={classes.imgBox} onClick={() => openModal(item.post.id)}>
            {isImage(item) ? (
                <div>
                    <div style={{display: imageLoaded ? 'none' : 'block'}}>
                        <Skeleton
                            height={250} width="100%"
                            style={{
                                marginTop: '10px', borderRadius: '20px'
                            }}/>
                    </div>
                    <img
                        style={{display: imageLoaded ? 'block' : 'none'}}
                        src={item.compress_image}
                        alt={item.compress_image}
                        onLoad={handleImageLoad}
                        onError={(e) => {
                            e.target.src = defaultImage;
                        }}
                    />
                </div>
            ) : (
                <video autoPlay muted controls loop>
                    <source src={item.post_image || item.compress_image} type={'video/mp4'}/>
                    Your browser does not support the video tag.
                </video>
            )}
            <div className={classes.profileDetail}>
                <img src={item.user_image || dummyUser} alt="icon"/>
                <span>{item?.username}</span>
            </div>
        </div>
    );
};

export default MemeItem;
