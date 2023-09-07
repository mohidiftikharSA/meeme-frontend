import CoinCard from "Components/CoinCard";
import Heading from "Components/Heading";
import Transaction from "Components/Transaction";
import React from "react";

const transactionData = [
  {
    coins: "50,000",
    date: "Oct 20, 2022",
  },
  {
    coins: "10,000",
    date: "Sept 12, 2022",
  },
  {
    coins: "8,000",
    date: "Sept 12, 2022",
  },
  {
    coins: "7,000",
    date: "Sept 12, 2022",
  },
];
const BuyCoin = () => {
  const coinData = [
    {
      coin: "10,000",
      price: "10",
    },
    {
      coin: "50,000",
      price: "50",
    },
    {
      coin: "500,000",
      price: "10",
    },
    {
      coin: "100,000",
      price: "10",
    },
  ];
  return (
    <section>
      <div className="sectionHolder" style={{ maxWidth: "800px" }}>
        <Heading title={"Buy Coins"} />
        <CoinCard data={coinData} />
        <Transaction noCard data={transactionData} />
      </div>
    </section>

  );
};

export default BuyCoin;
