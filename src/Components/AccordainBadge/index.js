import React, { useState } from "react";
import { Badge } from "react-bootstrap";



const AccordianBadge = ({data,expolore}) => {
  const [activeStates, setActiveStates] = useState(Array(data.length).fill(false));

  const toggleClass = (index) => {
    const newActiveStates = [...activeStates];
    newActiveStates[index] = !newActiveStates[index];
    setActiveStates(newActiveStates);
  };

  return (
  
      <div className="d-flex align-items-center gap-2 flex-wrap">
        {data.map((item, index) => (
          <h5 key={index}>
            <Badge
              bg="secondary"
              className={`${activeStates[index] ? "active p-3" : "p-3"} ${expolore? `explore-badge` : ""}`}
              onClick={() => toggleClass(index)}>
              #{item.title}
            </Badge>
          </h5>
        ))}
      </div>
  );
};

export default AccordianBadge;
