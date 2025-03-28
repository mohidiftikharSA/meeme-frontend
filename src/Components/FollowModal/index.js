import Heading from "Components/Heading";
import React, { useEffect } from "react";
import { Modal } from "react-bootstrap";
import classes from "./index.module.scss"
import ContactList from "Components/ContactList";
import user from "../../Images/following.png"
import user2 from "../../Images/following2.png"

const FollowModal = ({followingList, followersList, loadMore, hasMore, ...props}) => {

  
  const followersData = [
    {
        name: "Jaxson George",
        img: user,
        
    },
    {
        name: "Cheyenne Gouse",
        img: user2,
        
    }
  ]


  const followingData = [
    {
        name: "Kadin Carder",
        img: user,
        
    },
    {
        name: "Charlie Lubin",
        img: user,
        
    },
    {
        name: "Omar Gouse",
        img: user,
        
    }
  ]
  
  return (
    <Modal
      className={classes.modal}
      {...props}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter" onClick={props.onHide}
      centered
    >
     {
      props.following?
      <Heading title={'Following List'}/>
      :
      <Heading title={'Followers List'}/>
     }
      <Modal.Body className="p-0">
        {
          props.following &&
          <ContactList 
            link 
            following 
            data={followingList} 
            loadMore={loadMore}
            hasMore={hasMore}
          />
        }
        {
          props.followers &&
          <ContactList 
            link 
            follower 
            data={followersList} 
            loadMore={loadMore}
            hasMore={hasMore}
          />
        }
      </Modal.Body>
    </Modal>
  );
};

export default FollowModal;
