import GiftCard from 'Components/GIftCard'
import StoreItems from 'Components/StoreItems'
import TabDetails from 'Components/Tabs'
import React, { useEffect, useState } from 'react'
import AmazonCardAPIs from '../../APIs/amazonCard'
import { toast } from 'react-toastify'

const Store = () => {

  const [cards , setCards ] = useState([]);
  
  useEffect(()=>{
    getAmazonCard();
  },[])
 
  const getAmazonCard = async()=>{
   const cards = await AmazonCardAPIs.getAlAmazonCard();
   if(cards){
     setCards(cards?.data)
   }
  }


  return (
    <>
    <GiftCard data={cards}/>
    <StoreItems/>
    <TabDetails storeitems/>
    </>
  )
}

export default Store