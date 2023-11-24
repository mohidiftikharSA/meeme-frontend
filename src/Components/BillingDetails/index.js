import Heading from 'Components/Heading'
import React from 'react'
import { Button, Card } from 'react-bootstrap'
import classes from "./index.module.scss"
import wallet from "../../Images/Wallet.png"
import calender from "../../Images/Calendar.png"
import password from "../../Images/Password.png"
const BilingDetails = () => {
  return (
   <Card className="profileCard">
    <Heading title={'Billing'}/>
    <div className={classes.billingHolder}>
        <h6>Card Number</h6>
        <div className={classes.box}>
            <img src={wallet} alt='img' width={25}/>
            <input
            placeholder="1234 1234 1234 0123"
            name=""
            type="number"
            className={classes.formControl}
          />
        </div>
        <h6>Expiry Date</h6>
        <div className={classes.box}>
            <img src={calender} alt='img' width={25}/>
            <input
            placeholder="1234 1234 1234 0123"
            name=""
            type="number"
            className={classes.formControl}
          />
        </div>
        <h6>CVV Code</h6>
        <div className={`${classes.box} mb-4`}>
            <img src={password} alt='img' width={25}/>
            <input
            placeholder="1234 1234 1234 0123"
            name=""
            type="number"
            className={classes.formControl}
          />
        </div>

        <Button type="submit" className="w-100 authButton" >Save</Button>
    </div>
   </Card>
  )
}

export default BilingDetails
