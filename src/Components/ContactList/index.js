import React from 'react'
import classes from "./index.module.scss"
import Search from 'Components/Search'
import { useNavigate } from 'react-router-dom'



const ContactList = ({data,contact,link}) => {
    const navigate = useNavigate();
    const page = () => {
      navigate(`/otherPrfolile`);
    };

    return (
          <>
            <ul className={`${contact?`mb-4 ${classes.prizeList}` : `${classes.prizeList} ${classes.modalList}` }`}>
                {
                    data.map((item, ind) => {
                        return (
                            <li onClick={page}>
                                <div className={classes.profile}>
                                    <img src={item.img} alt='icon' />
                                    {item.status && <span className={`status ${classes.status}`}></span>}
                                </div> 
                                <p className='mb-0'>{item.name}</p>
                            </li>
                        )
                    })
                }
            </ul>
            {
                contact?<Search text={"Search"} contactList />:""
            }
          </>
        
    )
}

export default ContactList