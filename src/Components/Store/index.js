import GiftCard from 'Components/GIftCard'
import StoreItems from 'Components/StoreItems'
import TabDetails from 'Components/Tabs'
import React, { useEffect, useState } from 'react'
import AmazonCardAPIs from '../../APIs/amazonCard'
import { toast } from 'react-toastify'

const Store = () => {

  const [cards , setCards ] = useState([]);
  const [cardRemovalId  , setCardRemovalId  ] = useState();

  useEffect(()=>{
    getAmazonCard();
  },[])
 
  const getAmazonCard = async()=>{
   const cards = await AmazonCardAPIs.getAlAmazonCard();
   if(cards){
     console.log("Amazon Cards ===", cards?.data);
     setCards(cards?.data)
   }
  }

  /**
   * Remove Purshaded card from the list
   */
  useEffect(()=>{
    if(cardRemovalId){
      console.log("Card Removal Id from the parent t=== ",cardRemovalId );
    }
  },[cardRemovalId])


  return (
    <>
    <GiftCard data={cards} setCardRemovalId={setCardRemovalId}/>
    <StoreItems/>
    <TabDetails storeitems/>
    </>
  )
}

export default Store