import React, { useState } from "react";
import { Accordion, Badge } from "react-bootstrap";

const data = [
  {
    title: "Funny",
  },
  {
    title: "CanadaPolitics",
  },
  {
    title: "TrumpSeason",
  },
  {
    title: "XaviarQuotes",
  },
  {
    title: "SmilyCats",
  },
];

const AccordianBadge = () => {
  const [activeStates, setActiveStates] = useState(Array(data.length).fill(false));

  const toggleClass = (index) => {
    const newActiveStates = [...activeStates];
    newActiveStates[index] = !newActiveStates[index];
    setActiveStates(newActiveStates);
  };

  return (
    <Accordion.Body>
      <div className="d-flex align-items-center gap-2 flex-wrap">
        {data.map((item, index) => (
          <h5 key={index}>
            <Badge
              bg="secondary"
              className={`${activeStates[index] ? "active p-3" : "p-3"}`}
              onClick={() => toggleClass(index)}>
              #{item.title}
            </Badge>
          </h5>
        ))}
      </div>
    </Accordion.Body>
  );
};

export default AccordianBadge;
