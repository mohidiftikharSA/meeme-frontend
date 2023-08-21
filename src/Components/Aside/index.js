import AccordianData from 'Components/Accordian'
import Navigation from 'Components/Nav'
import React from 'react'

export const Aside = () => {
  return (
    <>
    <aside className='px-4' id={'aisde'}>
    <Navigation/>
    <AccordianData/>
    </aside>
    </>
  )
}
