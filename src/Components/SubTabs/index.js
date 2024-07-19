import React, { useEffect, useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import img1 from "../../Images/rare1.png";
import img2 from "../../Images/rare2.png";
import img3 from "../../Images/rare3.png";
import img4 from "../../Images/rare4.png";
import img5 from "../../Images/rare5.png";
import img6 from "../../Images/rare6.png";
import img7 from "../../Images/rare7.png";
import img8 from "../../Images/rare8.png";
import img9 from "../../Images/rare9.png";
import Theme1 from "../../Images/Theme1.png";
import Theme2 from "../../Images/Theme2.png";
import Theme3 from "../../Images/Theme3.png";
import ThemeRare from "Components/ThemeRare";
import UltraRare from "Components/UltraRare";
import ThemesAPIs from "../../APIs/amazonCard";
import Loader from "Components/Loader";

const data = [
  {
    title: "Sunflower Theme",
    img: img1,
    coin: "100",
  },
  {
    title: "Nature Theme",
    img: img2,
    coin: "100",
  },
  {
    title: "Military Theme",
    img: img3,
    coin: "100",
  },
  {
    title: "Camping Theme",
    img: img4,
    coin: "100",
  },
  {
    title: "Psychedelic Theme",
    img: img5,
    coin: "100",
  },
  {
    title: "Banana Theme",
    img: img6,
    coin: "100",
  },
  {
    title: "Mango Theme",
    img: img7,
    coin: "100",
  },
  {
    title: "Fire Theme",
    img: img8,
    coin: "100",
  },
  {
    title: "Water Theme",
    img: img9,
    coin: "100",
  },
];

const data2 = [
  {
    img: Theme1,
    coin: "100",
  },
  {
    img: Theme2,
    coin: "100",
  },
  {
    img: Theme3,
    coin: "100",
  },
];

const SubTabs = ({ icon, themes }) => {
  const [themesAPI, setThemesAPI] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [purchasedItems, setPurchasedItems] = useState([]);

  useEffect(() => {
    getThemes();
    getPurchasedItems();
  }, []);

  const getThemes = async () => {
    setIsLoading(true);
    const res = await ThemesAPIs.getThemes();
    if (res) {
      setThemesAPI(res.data?.themes);
      setIsLoading(false);
    }
    setIsLoading(false);
  };

  const getPurchasedItems = async () => {
    setIsLoading(true);
    const res = await ThemesAPIs.getPuchasedItems();
    if (res) {
      console.log("Response of the Purchased  == ", res.data);
      setPurchasedItems(res.data?.store);
    }
  };

  return (
    <>
      {isLoading && <Loader isLoading={isLoading} />}
      {icon && (
        <Tabs
          defaultActiveKey={"ultra"}
          id="uncontrolled-tab-example"
          className="mb-5"
        >
          <Tab eventKey="common" title="Common"></Tab>
          <Tab eventKey="rare" title="Rare"></Tab>
          <Tab eventKey="ultra" title="Ultra Rare">
            <UltraRare data={data} />
          </Tab>
        </Tabs>
      )}
      {themes && (
        <Tabs
          defaultActiveKey={"common"}
          id="uncontrolled-tab-example"
          className="mb-5"
        >
          <Tab eventKey="common" title="Common">
            <ThemeRare
              purchasedList={purchasedItems}
              data2={themesAPI.filter((theme) => theme.rarity === "common")
                .sort((a, b) => a.coin - b.coin)
              }
            />
          </Tab>
          <Tab eventKey="rare" title="Rare">
            <ThemeRare
              purchasedList={purchasedItems}
              data2={themesAPI.filter((theme) => theme.rarity === "rare")
                .sort((a, b) => a.coin - b.coin)
              }
            />
          </Tab>
          <Tab eventKey="ultra" title="Ultra Rare">
            <ThemeRare
              purchasedList={purchasedItems}
              data2={themesAPI.filter((theme) => theme.rarity === "ultra_rare")
                .sort((a, b) => a.coin - b.coin)
              }
            />
          </Tab>
        </Tabs>
      )}
    </>
  );
};

export default SubTabs;
