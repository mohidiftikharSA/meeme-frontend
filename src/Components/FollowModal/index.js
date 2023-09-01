import Heading from "Components/Heading";
import React from "react";
import { Modal } from "react-bootstrap";
import classes from "./index.module.scss"
import ContactList from "Components/ContactList";
import user from "../../Images/following.png"
import user2 from "../../Images/following2.png"

const FollowModal = (props) => {
  const followersData = [
    {
        name: "Jaxson George",
        img: user,
        
    },
    {
        name: "Cheyenne Gouse",
        img: user2,
        
    },
    {
        name: "Nolan Botosh",
        img: user,
     
    },
    {
        name: "Ahmad Levin",
        img: user2,
        
    },
    {
        name: "Angel Vetrovs",
        img: user2,
       
    },
    {
        name: "Giana Curtis",
        img: user,
        
    },
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
        
    },
    {
        name: "Martin Baptista",
        img: user,
        
    },
    {
        name: "Brandon Dokidis",
        img: user,
        
    },
  
  ]
  const followingData = [
    
    {
        name: "Cheyenne Gouse",
        img: user2,
        
    },
    {
      name: "Jaxson George",
      img: user,
      
  },
    {
        name: "Nolan Botosh",
        img: user,
     
    },
    {
        name: "Ahmad Levin",
        img: user2,
        
    },
    {
        name: "Angel Vetrovs",
        img: user2,
       
    },
    {
        name: "Giana Curtis",
        img: user,
        
    },
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
        
    },
    {
        name: "Martin Baptista",
        img: user,
        
    },
    {
        name: "Brandon Dokidis",
        img: user,
        
    },
  
  ]
  return (
    <Modal
      className={classes.modal}
      {...props}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
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
          props.following&&
          <ContactList link  data={followingData}/>
        }
        {
          props.followers&&
          <ContactList link  data={followersData}/>
        }
      </Modal.Body>
    </Modal>
  );
};

export default FollowModal;
