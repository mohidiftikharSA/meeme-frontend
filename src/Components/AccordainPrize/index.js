import React from 'react'
import { Accordion } from 'react-bootstrap'
import amazon from "../../Images/amazon.png"
import coin from "../../Images/coin.png"
import classes from "./index.module.scss"

const data = [
    {
        no: "1st",
        icon : amazon,
        title:"£100 Amazon Gift Card"
    },
    {
        no: "2nd",
        icon : amazon,
        title:"£50 Amazon Gift Card"
    },
    {
        no: "3rd",
        icon : amazon,
        title:"£25 Amazon Gift Card",
    },
    {
        no: "4th",
        icon : coin,
        title:"11,000 Coins",
    },
    {
        no: "5th",
        icon : coin,
        title:"10,000 Coins",
    },
    {
        no: "6th",
        icon : coin,
        title:"9,000 Coins",
    },
    {
        no: "7th",
        icon : coin,
        title:"8,000 Coins",
    },
    {
        no: "8th",
        icon : coin,
        title:"7,000 Coins",
    },
    {
        no: "9th",
        icon : coin,
        title:"6,000 Coins",
    },
    {
        no: "10th",
        icon : coin,
        title:"5,000 Coins",
    },
]

const AccordianPrize = () => {
    
  return (
    <Accordion.Body>
        <ul className={classes.prizeList}>
            {
                data.map((item,ind)=>{
                    return(
                        <li key={ind}> 
                            <span>{item.no}</span>
                            <img src={item.icon} alt='icon'/>
                            <p>{item.title}</p>
                        </li>
                    )
                })
            }
        </ul>
    </Accordion.Body>
  )
}

export default AccordianPrize