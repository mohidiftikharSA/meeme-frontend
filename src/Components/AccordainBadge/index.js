import React, {useState} from "react";
import {Badge} from "react-bootstrap";
import classes from "./index.module.scss"

const AccordianBadge = ({data, expolore, onTagSelect}) => {
    const [activeStates, setActiveStates] = useState(Array(data.length).fill(false));
    const [selectedTagsArr, setSelectedTagsArr] = useState([]);

    const toggleClass = (index, tag) => {
        const newActiveStates = [...activeStates];
        newActiveStates[index] = !newActiveStates[index];
        setActiveStates(newActiveStates);

        setSelectedTagsArr((prevState) => {
            let response=[];
            if (prevState.includes(tag)) {
                response= prevState.filter(item => item !== tag);
            } else {
                response= [...prevState, tag];
            }
            onTagSelect(response)
            return response;
        })
    };

    return (

        <div
            className={`d-flex align-items-center gap-2 flex-lg-wrap flex-nowrap ${classes.badgeBox} ${expolore && classes.explosreBox}`}>
            {data.map((item, index) => (
                <h5 key={index}>
                    <Badge
                        bg="secondary"
                        className={`${activeStates[index] ? "active p-3" : "p-3"} ${expolore ? `explore-badge` : ""}`}
                        onClick={() => toggleClass(index, (item || item.title).toLowerCase())}>
                        {item || item.title}
                    </Badge>
                </h5>
            ))}
        </div>
    );
};

export default AccordianBadge;
