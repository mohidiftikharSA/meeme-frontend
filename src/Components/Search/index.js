import React, { useState } from 'react';
import { Form, InputGroup } from 'react-bootstrap';
import searchIcon from "../../Images/Search.png";
import searchIcon2 from "../../Images/Searchwhite.png";
import classes from "./index.module.scss";

const Search = ({ expolore, text, contactList, badgeList, onSearchChange }) => {
  const [searchValue, setSearchValue] = useState("");

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchValue(value);
    onSearchChange(value);
  };

  return (
    <InputGroup className={`${classes.search} ${expolore ? `${classes.fullWidth}` : ""} ${contactList ? `${classes.contactList}` : ""} ${badgeList && `${classes.search} ${classes.badgeList}`}`}>
      <span>
        <img src={expolore ? searchIcon2 : searchIcon} alt='icon'/>
      </span>
      <Form.Control
        aria-label="Example text with button addon"
        placeholder={text}
        value={searchValue}
        onChange={handleSearchChange} 
      />
    </InputGroup>
  );
};

export default Search;
