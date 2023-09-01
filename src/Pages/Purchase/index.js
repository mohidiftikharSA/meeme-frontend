import BuyCoin from 'Components/BuyCoin'
import React from 'react'

const PurchasePage = () => {
  return (
    <section className='purchaseBg'>
        <div className='sectionHolder' style={{maxWidth: "450px"}}>
            <BuyCoin purchase/>
        </div>
    </section>
  )
}

export default PurchasePage
