import Heading from 'Components/Heading'
import TabDetails from 'Components/Tabs'
import React from 'react'
import { Container } from 'react-bootstrap'


const CustomizeProfile = () => {
  return (
    <section className='py-5'>
    <Container>
   <div className={'sectionHolder'} style={{maxWidth:"650px"}}>
    <Heading title={"Customize Profile"} linkPath={"profile"}/>
   <TabDetails customizeProfile /> 
    </div>   
    </Container>
   </section>
  )
}

export default CustomizeProfile
