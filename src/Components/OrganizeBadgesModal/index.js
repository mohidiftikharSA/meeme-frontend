import React from 'react'
import { Modal } from 'react-bootstrap'
import classes from './index.module.scss'
import menu from '../../Images/menu-01.png'
import icon1 from '../../Images/badge1.png'
import icon2 from '../../Images/2nd.png'
import icon3 from '../../Images/badge3.png'
import icon4 from '../../Images/badge4.png'
import icon5 from '../../Images/badge6.png'
import icon6 from '../../Images/badge7.png'
const data = [
    {
        
        title: "1st Place",
        img: menu,
        user: icon1,
    },
    {
        
        title: "2nd Place",
        img: menu,
        user: icon2,
    },
    {
        
        title: "3rd Place",
        img: menu,
        user: icon3,
    },
    {
        
        title: "100 hours spent",
        img: menu,
        user: icon4,
    },
    {
        
        title: "Most Wins",
        img: menu,
        user: icon5,
    },
    {
        
        title: "Top Shot",
        img: menu,
        user: icon6,
    },
    
  ]
const OrganizeBadges = (props) => {
    return (
            <Modal className='orginizeBadges'
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
            <Modal.Header>
            <Modal.Title>
                <i className="fa fa-angle-left" aria-hidden="true"></i>
                <h4 className='title'>Organize Badges</h4>
            </Modal.Title>
        </Modal.Header>
        <Modal.Body className='organize'>
        <ul>
            {
                data.map((item,ind)=>{
                    return(
                        <li>
                        <img src={item.img} alt='menu'/>
                        <div className={classes.iconBox}>
                        <img src={item.user} alt='icon'/></div>
                            <p className={classes.subtitle}>{item.title}</p>
                        </li>
                    )
                })
            }
        </ul>
        </Modal.Body>
                </Modal>
    )
}
export default OrganizeBadges