import React from 'react'
import classes from "./index.module.scss"
import banner from "../../Images/judgeBg.png"
import History from 'Components/History'
const Judge = () => {
  return (
    <div className={classes.judgeHolder}>
        <div className='imgBox my-4'>
            <img src={banner} alt='img'/>
        </div>
        <History/>
    </div>
  )
}

export default Judge
