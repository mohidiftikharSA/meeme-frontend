import React, { useEffect, useState } from "react";
import Heading from "Components/Heading";
import icon from "../../Images/memee.png";
import classes from "./index.module.scss";
import { useWizard } from "react-use-wizard";
import MessageAPIs from '../../APIs/messages';
import Loader from "Components/Loader";

const supportData = [
  {
    title: "Abuse",
    text: "903F9G9GTH",
    date: "April 25, 2022 | 9:00am",
    order: "Pending",
  },
  {
    title: "Plagiarism",
    text: "9UF39HJ3HJ",
    date: "April 25, 2022 | 9:00am",
    order: "Pending",
  },
];
const Support = () => {
  const { previousStep, nextStep } = useWizard();
  const [isLoading, setIsLoading] = useState(false);
  const [allChatsData , setAllChatsData ] = useState([]);

  useEffect(() => {
    getAllChats();
  }, [])

  const getAllChats = async () => {
    setIsLoading(true);
    const allChats = await MessageAPIs.getAllSupport();
    if (allChats) {
      setIsLoading(false);
      console.log("Chats hase come - , ", allChats.data.messages);
      const arr = [...allChats.data.messages];
      const customeArr = [];

      arr.forEach(element => {
        console.log("Elements - ", element);
        const data = {
          title: element?.subject,
          text: element?.body,
          date: "April 25, 2022 | 9:00am",
          order: element?.status,
        }
        customeArr.push(data);
      });
      setAllChatsData(customeArr);

    }
  }

  return (
    <>
      <Loader isLoading={isLoading} />
      <div className={classes.supportSection}>
        <Heading title={"Support"} linkPath={"home"} />
        <ul className={classes.support}>
          {allChatsData.map((item, ind) => {
            return (
              <li>
                <div className={classes.head}>
                  <img src={icon} alt="coin"></img>
                  <div className={classes.box}>
                    <p className={classes.title}>{item.title}</p>
                    <p className={classes.text}>{item.text}</p>
                    <p className={classes.date}>{item.date}</p>
                  </div>
                </div>
                <span>{item.order}</span>
              </li>
            );
          })}
          <div className="text-center">
            <button
              type="button"
              class="w-100 p-2 mt-4 authButton btn btn-primary"
              onClick={() => nextStep()}
            >
              Send New Ticket
            </button>
          </div>
        </ul>
      </div>
    </>
  );
};

export default Support;
