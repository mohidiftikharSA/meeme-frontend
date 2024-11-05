import React, { useState } from "react";
import { Form, InputGroup } from "react-bootstrap";
import searchIcon from "../../Images/Search.png";
import searchIcon2 from "../../Images/Searchwhite.png";
import classes from "./index.module.scss";

const Search = ({
  expolore,
  text,
  contactList,
  badgeList,
  onSearchChange,
  onSearchSubmit,
}) => {
  const [searchValue, setSearchValue] = useState("");

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchValue(value);
    onSearchChange(value);
  };
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      onSearchSubmit(searchValue);
    }
  };

  return (
    <div className={classes.searchForm}>
      <InputGroup
        className={`${classes.search} ${
          expolore ? `${classes.fullWidth}` : ""
        } ${contactList ? `${classes.contactList}` : ""} ${
          badgeList && `${classes.search} ${classes.badgeList}`
        }`}
      >
        <span>
          <img src={expolore ? searchIcon2 : searchIcon} alt="icon" />
        </span>
        <Form.Control
          aria-label="Example text with button addon"
          placeholder={text}
          value={searchValue}
          onChange={handleSearchChange}
          onKeyDown={handleKeyDown}
        />
      </InputGroup>
      <ul className={classes.searchDropdown}>
        <li>
          <h6>Title</h6>
          <div>Email</div>
        </li>
      </ul>
    </div>
  );
};

export default Search;
