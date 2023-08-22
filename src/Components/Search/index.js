import React from 'react'
import { Form, InputGroup } from 'react-bootstrap'
import searchIcon from "../../Images/Search.png"
import searchIcon2 from "../../Images/Searchwhite.png"
import classes from "./index.module.scss"

const Search = ({expolore, text}) => {
  return (
    <InputGroup className={ `${classes.search}  ${expolore? `${classes.fullWidth}` : ""}`}>
    <span>
        <img src={expolore? searchIcon2  : searchIcon} alt='icon'/>
    </span>

   
    <Form.Control
      aria-label="Example text with button addon"
      placeholder={text}

    />
  </InputGroup>
  )
}

export default Search