import Logo from 'Components/Logo'
import React from 'react'
import classes from '../index.module.scss'
import { Button } from 'react-bootstrap'
import mail from "../../../Images/mail.png"
import google from "../../../Images/google.png"
import facebook from "../../../Images/facebook.png"
import { Link } from 'react-router-dom/dist'

const Login = () => {
  return (
        <>
        <Logo login/>
        <div className={classes.Login}>
        <div className='formHolder'>
        <Button variant="outline-light"><img src={mail} alt='icon'/>Continue with Email</Button>
        <Button variant="outline-light"><img src={google} alt='icon'/>Continue with google</Button>
        <Button variant="outline-light"><img src={facebook} alt='icon'/>Continue with Facebook</Button>
        <Button variant="outline-light">Continue with Twitter</Button>
        </div>
        <div className={classes.loginLinks}>
        <p className={ classes.dark}>New to memee?<Link className={ classes.light} to="/">Sign up</Link></p>
        <p>By continuing you agree Memee’s <Link to="/">ms of Services & Privacy Policy. </Link></p>
        </div>
        </div>
        </>
        
  )
}

export default Login;
