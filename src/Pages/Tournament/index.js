import TabDetails from 'Components/Tabs'
import React from 'react'
import { Container } from 'react-bootstrap'
import classes from "./index.module.scss"

const Tournament = () => {
  return (
   <section className='py-3'>
    <Container>
    <h5 className={classes.heading}>Tournaments</h5>
   <div className={classes.tournamentHolder}>
   <TabDetails first={'tournament'} tournament /> 
    </div>   
    </Container>
   </section>
  )
}

export default Tournament