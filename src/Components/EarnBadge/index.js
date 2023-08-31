import React from 'react'
import classes from "./index.module.scss"
import badge from "../../Images/badge1.png"
import badge2 from "../../Images/badge3.png"
import badge3 from "../../Images/badge4.png"
import badge4 from "../../Images/badge5.png"
import badge5 from "../../Images/badge6.png"
import badge6 from "../../Images/badge7.png"
const EarnBadge = () => {
  return (
    <div className={classes.badgeHolder}>
      <div className={classes.header}>
        <h5 className='mb-0'>Earned Badges</h5>
        <p className={classes.btn}>Organize Badges</p>
      </div>

      <ul className={classes.listBadge}>
        <li>
            <div className={classes.iconBox}>
            <img src={badge} alt='img'></img>
            </div>
            <p>1st Place</p>
        </li>
        <li>
        <div className={classes.iconBox}>
            <img src={badge2} alt='img'></img>
            </div>
            <p>2nd Place</p>
        </li>
        <li>
        <div className={classes.iconBox}>
            <img src={badge3} alt='img'></img>
            </div>
            <p>3rd Place</p>
        </li>
        <li>
        <div className={classes.iconBox}>
            <img src={badge4} alt='img'></img>
            </div>
            <p>100 Hrs Spent</p>
        </li>
        <li>
        <div className={classes.iconBox}>
            <img src={badge5} alt='img'></img>
            </div>
            <p>Most Wins</p>
        </li>
        <li>
        <div className={classes.iconBox}>
            <img src={badge6} alt='img'></img>
            </div>
            <p>Top shot</p>
        </li>
        
      </ul>


    </div>
  )
}

export default EarnBadge
