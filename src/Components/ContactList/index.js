import React, { useEffect, useRef, useCallback } from 'react'
import classes from "./index.module.scss"
import Search from 'Components/Search'
import { useNavigate } from 'react-router-dom'
import avatar from '../../Images/avatar.png'

const ContactList = ({ data, contact, link, follower, following, loadMore, hasMore }) => {
    const navigate = useNavigate();
    const observer = useRef();
    const lastElementRef = useRef();
    
    const page = (id) => {
        navigate(`/otherProfile/${id}`);
    };

    // Setup intersection observer for infinite scroll
    const lastItemRef = useCallback(node => {
        if (observer.current) observer.current.disconnect();
        
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                loadMore();
            }
        });
        
        if (node) observer.current.observe(node);
    }, [hasMore, loadMore]);

    return (
        <>
            <ul className={`${contact ? `mb-4 ${classes.prizeList}` : `${classes.prizeList} ${classes.modalList}`}`}>
                {
                    data?.map((item, ind) => {
                        // Add ref to last item for intersection observer
                        const isLastItem = ind === data.length - 1;
                        return (
                            <li 
                                ref={isLastItem ? lastItemRef : null}
                                onClick={() => { page(item?.following_user_detail?.id || item?.follower_user_detail?.id) }} 
                                key={ind}
                            >
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
                {hasMore && <li className={`${classes.loadingItem}`}>Loading...</li>}
            </ul>
            {
                contact ? <Search text={"Search"} contactList /> : ""
            }
        </>
    )
}

export default ContactList