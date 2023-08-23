import GiftCard from 'Components/GIftCard'
import StoreItems from 'Components/StoreItems'
import React from 'react'

const data =[

    {
        price:"$150",
        coin:"99,999"
    },
    {
        price:"$100",
        coin:'99,999'
    },
    {
        price:"$50",
        coin:'99,999'
    },
]

const Store = () => {
  return (
    <>
    <GiftCard data={data}/>
    <StoreItems/>
    
    </>
  )
}

export default Store