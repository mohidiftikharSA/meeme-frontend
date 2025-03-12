import React, { useEffect, useState } from "react";
import Heading from "Components/Heading";
import icon from "../../Images/memee.png";
import classes from "./index.module.scss";
import { useWizard } from "react-use-wizard";
import MessageAPIs from '../../APIs/messages';
import Loader from "Components/Loader";
import { useLocation } from "react-router-dom";

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

function formatDate(inputDate) {
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const dateObj = new Date(inputDate);
  const month = months[dateObj.getMonth()];
  const day = dateObj.getDate();
  const year = dateObj.getFullYear();
  const hours = dateObj.getHours() % 12 || 12;
  const minutes = dateObj.getMinutes().toString().padStart(2, '0');
  const period = dateObj.getHours() >= 12 ? 'pm' : 'am';

  const formattedDate = `${month} ${day}, ${year} | ${hours}:${minutes}${period}`;

  return formattedDate;
}


const Support = ({ supportTicket }) => {
  const { goToStep, nextStep } = useWizard();
  const [isLoading, setIsLoading] = useState(false);
  const [allChatsData, setAllChatsData] = useState([]);
  const location = useLocation();
  const ticket = new URLSearchParams(location.search).get("ticket");
  const conversation_id = new URLSearchParams(location.search).get("conversation_id");

  useEffect(() => {
    console.log("ticket in useEffect  --- ", ticket)
    if (ticket) {
      supportTicket({ message_ticket: ticket, conversation_id: conversation_id });
      goToStep(2);
    }
  }, [ticket])

  useEffect(() => {
    getAllChats();
  }, [])

  const getAllChats = async () => {
    setIsLoading(true);
    const allChats = await MessageAPIs.getAllSupport();
    if (allChats) {
      setIsLoading(false);
      const arr = [...allChats.data.messages];
      const customeArr = [];

      arr.forEach(element => {
        const data = {
          title: element?.subject,
          text: `${element?.body?.slice(0, 100)}...`,
          date: formatDate(element?.created_at),
          order: element?.status,
          image: element?.message_images[0]?.message_image,
          content_type: element?.message_images[0]?.content_type,
          message_ticket: element?.message_ticket,
          conversation_id: element?.conversation_id
        }
        customeArr.push(data);
      });
      setAllChatsData(customeArr);

    }
    setIsLoading(false);
  }

  const openTicketChat = (item) => {
    supportTicket(item);
    goToStep(2);
  }

  return (
    <>
      <Loader isLoading={isLoading} />
      <div className={classes.supportSection}>
        <Heading title={"Support"} noLink />
        <ul className={classes.support}>
          {allChatsData[0] ? allChatsData.map((item, ind) => {
            return (
              <>
                {console.log("item supoort detail--- ", item)}
                <li key={ind} onClick={() => { openTicketChat(item) }}>
                  <div className={classes.head}>
                    <img src={item?.content_type === 'video' ? icon : item?.image || icon} alt={icon}></img>
                    <div className={classes.box}>
                      <p className={classes.title}>{item.title}</p>
                      <p className={classes.text}>{item.text}</p>
                      <p className={classes.date}>{item.date}</p>
                    </div>
                  </div>
                  <span>{item.order}</span>
                </li>
              </>
            );
          }) : <p>No Support Tickets Available</p>}
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
