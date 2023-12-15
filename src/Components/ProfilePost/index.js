import React, {useEffect, useState} from "react";
import {Form} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import ViewPost from "Components/ViewPost";
import classes from "./index.module.scss";
import avatar from "../../Images/avatar.jpg"


const ProfilePost = ({data}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPostId, setSelectedPostId] = useState(null);
    const [followingData, setFollowingData] = useState([]);
    const [isActive, setIsActive] = useState(false);
    const navigate = useNavigate();
    const [postData, setPostData] = useState();
    const [monthOptions, setMonthOptions] = useState([]);

    const openModal = (postId, postData) => {

        setPostData(postData);
        setSelectedPostId(postId);
        setIsModalOpen(true);

    }

    const closeModal = () => {
        setSelectedPostId(null);
        setIsModalOpen(false);
    }
    useEffect(() => {
        setFollowingData(data);
    }, [data]);

    const prepareMonthOptions = () => {
        const monthNames = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
        ];
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth() + 1;
        const monthOptions = Array.from({length: 3}, (_, index) => {
            const monthValue = currentMonth - index;
            const monthLabel = monthNames[monthValue - 1];
            return {value: `${monthValue}`, label: monthLabel};
        });
        setMonthOptions(monthOptions);
    }
    useEffect(() => {
        prepareMonthOptions()
    }, []);
    return (
        <>
            <div className={classes.postHolder}>
                <div className={classes.header}>
                    <h4>{data?.length} Posts</h4>
                    <Form.Select className="form" style={{width: "120px"}}>
                        {monthOptions.map((month) => (
                            <option key={month.value} value={month.value}>
                                {month.label}
                            </option>
                        ))}
                    </Form.Select>
                </div>
                <div className={classes.box}>
                    {data?.slice()?.reverse()?.map((item, ind) => (
                        <div key={ind} className={classes.imgBox} onClick={() => openModal(item.post?.id, item)}>
                            <img src={item?.post_image} alt=""/>
                        </div>
                    ))}
                </div>
            </div>
            {/*<ViewPost profile onHide={closeModal} show={isModalOpen} selectedPostId={selectedPostId} postData={postData} avatar={avatar}  />*/}
        </>
    );
};

export default ProfilePost;
