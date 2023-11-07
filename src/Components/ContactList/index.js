import React from 'react'
import classes from "./index.module.scss"
import Search from 'Components/Search'
import { useNavigate } from 'react-router-dom'
import avatar from '../../Images/avatar.jpg'



const ContactList = ({ data, contact, link, follower, following }) => {
    const navigate = useNavigate();
    const page = (id) => {
        navigate(`/otherProfile/${id}`);
    };

    return (
        <>
            <ul className={`${contact ? `mb-4 ${classes.prizeList}` : `${classes.prizeList} ${classes.modalList}`}`}>
                {
                    data.map((item, ind) => {
                        console.log("Data Mar of LOst  = ", item);
                        return (
                            <li onClick={() => { page(item?.following_user_detail?.id || item?.follower_user_detail?.id) }} key={ind}>
                                <div className={classes.profile}>
                                    {following ? <img src={item?.following_user_detail?.profile_image || avatar} alt='icon' />
                                        :
                                        <img src={item?.follower_user_detail?.profile_image || avatar} alt='icon' />
                                    }
                                    {item.status === true && <span className={`status ${classes.status}`}></span>}
                                </div>
                                {following ? <p className='mb-0'>{item?.following_user_detail?.username}</p>
                                    :
                                    <p className='mb-0'>{item?.follower_user_detail?.username}</p>
                                }
                            </li>
                        )
                    })
                }
            </ul>
            {
                contact ? <Search text={"Search"} contactList /> : ""
            }
        </>

    )
}

export default ContactList