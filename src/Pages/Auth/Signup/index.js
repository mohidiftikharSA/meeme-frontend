import Logo from 'Components/Logo'
import React from 'react'
import classes from '../index.module.scss'
import { Button, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom/dist'
import AuthHeader from "Components/AuthHeader";


const Signup = () => {
 
  return (
    <>
    <Logo start/>
        <div className={`${classes.loginFrom} ${classes.nobefore}`}>
        <AuthHeader title={'Sign Up'} description={'Lets create an account on memee to enjoy memes.'}/>
            <div className="formHolder">
            <Form>
            <Form.Control type="text" placeholder="Name" />
                <Form.Control type="email" placeholder="Email" />
                <Form.Control type="tel" placeholder="Phone" />
                <Form.Control type="password" placeholder="Password" />
                <Form.Control type="password" placeholder=" Confirm Password" />
                <Button className="authButton w-100">Sign in</Button>
            </Form>
            <div className={classes.loginLinks}>
        <p className={ classes.dark}>Aready in memee?<Link className={ classes.light} to="/login">Login</Link></p>
        </div>
            </div>
          
        </div>
    </>
  )
}

export default Signup
