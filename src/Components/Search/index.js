import React from 'react'
import { Form, InputGroup } from 'react-bootstrap'
import searchIcon from "../../Images/Search.png"
import classes from "./index.module.scss"

const Search = () => {
  return (
    <InputGroup className={`${classes.search}`}>
    <span>
        <img src={searchIcon} alt='icon'/>
    </span>
    <Form.Control
      aria-label="Example text with button addon"
      placeholder='Search'

    />
  </InputGroup>
  )
}

export default Search