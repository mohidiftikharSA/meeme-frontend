import CoinCard from "Components/CoinCard";
import Heading from "Components/Heading";
import React from "react";

const BuyCoin = () => {
  const coinData = [
    {
      coin:"10,000",
      price:"10",
    },
    {
      coin:"50,000",
      price:"50",
    },
    {
      coin:"500,000",
      price:"10",
    },
    {
      coin:"100,000",
      price:"10",
    }
  ];
  return (
    <section>
      <div className="sectionHolder" style={{maxWidth:"800px"}}>
        <Heading title={"Buy Coins"} />
        <CoinCard  data={coinData}/>
      </div>
    </section>
  );
};

export default BuyCoin;
