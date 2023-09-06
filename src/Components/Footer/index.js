import Logo from 'Components/Logo'
import React from 'react'
import classes from "./index.module.scss"
import { Container } from 'react-bootstrap'
import FooterNav from 'Components/FooterNav'

const Footer = () => {
  return (
<footer className={classes.footer}>
<Container>
<div className="d-flex align-items-md-center align-items-start flex-sm-row flex-column  ">
  <Logo />
  <div className={classes.rightSide}>
    <FooterNav/>
  </div>
</div>
</Container>
</footer>
  )
}

export default Footer


