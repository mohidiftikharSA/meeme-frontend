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
     setCards(cards?.data)
   }
  }

  /**
   * Remove Purshased card from the list
   */
  useEffect(()=>{
    if(cardRemovalId){
      const removeCard = cards.filter((item)=> item?.id !== cardRemovalId);
      setCards(removeCard)
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