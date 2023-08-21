import React from 'react'
import classes from "./index.module.scss"
const MemesDetails = ({newMemesData}) => {
  return (
   <div className={classes.flexBox}>
    {
         newMemesData.map((item,ind)=>{
            return(
                <div className={classes.imgBox}>
                    <img src={item.memeImg} alt="img"/>
                    <div className={classes.profileDetail}>
                        <img src={item.userProfile} alt='icon'/>
                        <span>{item.name}</span>
                    </div>
                </div>
            )
        })
    }
   </div>
  )
}

export default MemesDetails