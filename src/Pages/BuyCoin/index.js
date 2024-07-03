import CoinCard from "Components/CoinCard";
import Heading from "Components/Heading";
import Transaction from "Components/Transaction";
import React, { useEffect, useState } from "react";
import CoinsAPI from "../../APIs/coins";

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
  const [coinsHistory, setCoinsHistory] = useState([]);

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

  useEffect(()=>{
    getHistory();
  })

   /**
   * Get Transaction History
   */
   const getHistory = async () => {
    try {
      const res = await CoinsAPI.transactions();

      const formattedHistory = res?.data?.total_history?.map((item) => {
        const date = new Date(item.created_at);
        const options = { year: "numeric", month: "short", day: "2-digit" };
        const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
          date
        );
        return { ...item, created_at: formattedDate };
      });
      setCoinsHistory(formattedHistory, "transaction res");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <section>
      <div className="sectionHolder" style={{ maxWidth: "800px" }}>
        <Heading title={"Buy Coins"} linkPath={"home"} />
        <CoinCard data={coinData} />
        <Transaction noCard data={coinsHistory} />
      </div>
    </section>

  );
};

export default BuyCoin;
