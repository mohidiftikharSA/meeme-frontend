import Heading from 'Components/Heading'
import React from 'react'
import { Card } from 'react-bootstrap'
import classes from "./index.module.scss"
const FAQ = () => {
  return (
    <Card className="profileCard">
    <Heading title={"FAQ"} linkPath={"home"} />
    <div className={classes.modalContant}>
              <h5 className="faqTitle">How can we help you</h5>
              <p className="faqSubTitle">How do I buy coins?</p>
              <p>
                Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et.
                Sunt qui esse pariatur duis deserunt mollit dolore cillum minim
                tempor enim. Elit aute irure tempor cupidatat incididunt sint
                deserunt ut voluptate aute id deserunt nisi. Aliqua id fugiat
                nostrud irure ex duis ea quis id quis ad et. Sunt qui esse
                pariatur duis deserunt mollit dolore cillum minim tempor enim.
                Elit aute irure tempor cupidatat incididunt sint deserunt ut
                voluptate aute id deserunt nisi.
              </p>
              <p className="faqSubTitle">
                {" "}
                What methods of payment does memee accept?
              </p>
              <p>
                Memee accepts variety of payment methods which includes PayPal,
                Bitcoin, Bank trasnfers, Credit/Debit Cards, Google Pay, Apple
              </p>
              <p className="faqSubTitle">
                {" "}
                How do I place a cancellation request?
              </p>
              <p>
                Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et.
                Sunt qui esse pariatur duis deserunt mollit dolore cillum minim
                tempor enim. Elit aute irure tempor cupidatat incididunt sint
                deserunt ut voluptate aute id deserunt nisi. Aliqua id fugiat
                nostrud irure ex duis ea quis id quis ad et. Sunt qui esse
                pariatur duis deserunt mollit dolore cillum minim tempor enim.
                Elit aute irure tempor cupidatat incididunt sint deserunt ut
                voluptate aute id deserunt nisi.
              </p>
              <p className="faqSubTitle">How do I edit or remove a method? </p>
              <p>
                Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et.
                Sunt qui esse pariatur duis deserunt mollit dolore cillum minim
                tempor enim.
              </p>
            </div>
  </Card>
  )
}

export default FAQ