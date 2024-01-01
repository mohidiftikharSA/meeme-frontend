import React, { useState } from "react";
import { Badge } from "react-bootstrap";
import classes from "./index.module.scss";

const AccordianBadge = ({ data, expolore, onTagSelect }) => {
  const [activeState, setActiveState] = useState(null);

  const toggleClass = (tag) => {
    if (activeState === tag) {
      setActiveState(null);
      onTagSelect([]);
    } else {
      setActiveState(tag);
      onTagSelect([tag]);
    }
  };

  return (
    <div
      className={`d-flex align-items-center gap-2 flex-lg-wrap flex-nowrap ${
        classes.badgeBox
      } ${expolore ? classes.explosreBox : ""}`}
    >
      {data.map((item, index) => (
        <h5 key={index}>
          <Badge
            bg="secondary"
            className={`${
              activeState === (item || item.title).toLowerCase()
                ? "active p-3"
                : "p-3"
            } ${expolore ? `explore-badge` : ""}`}
            onClick={() =>
              toggleClass((item || item.title).toLowerCase())
            }
          >
            {item || item.title}
          </Badge>
        </h5>
      ))}
    </div>
  );
};

export default AccordianBadge;
