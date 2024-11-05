import React, { useState, useRef, useEffect } from "react";
import { Form, InputGroup } from "react-bootstrap";
import searchIcon from "../../Images/Search.png";
import searchIcon2 from "../../Images/Searchwhite.png";
import classes from "./index.module.scss";
import api from "APIs/dashboard/home";
import SpinnerLoader from "../Loader/SpinnerLoader";
import SearchResults from "Components/Search/SearchResult";

const Search = ({
  expolore,
  text,
  contactList,
  badgeList,
  onSearchChange,
  onSearchSubmit,
}) => {
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const searchRef = useRef(null);

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchValue(value);
    onSearchChange(value);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      console.log("key down in search component -", searchValue);
      onSearch(searchValue);
      setSearchValue(searchValue);
      if (searchValue === "") {
        setSearchResults([]);
        setShowSearchResults(false);
      }
    }
  };

  let timeoutId;
  const onSearch = async (value) => {
    console.log("onSearch =", value);

    setSearchValue(value);
    clearTimeout(timeoutId);
    timeoutId = setTimeout(async () => {
      if (value !== "" && value != null) {
        setSearchResults([]);
        setIsLoading(true);
        console.log("inside set time out -- ");
        const response = await api.searchUser(value).finally((res) => {
          setIsLoading(false);
          console.log("response of search =", res);
        });
        setSearchResults(response?.data?.similar_users || []);
        setShowSearchResults(true);
      } else {
        setSearchResults([]);
        setShowSearchResults(false);
      }
    }, 1000);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearchResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={searchRef} className={classes.searchForm}>
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
      <div className={classes.searchDropdown}>
        {showSearchResults &&
          (isLoading ? (
            <SpinnerLoader className="mt-5" />
          ) : searchResults?.length > 0 ? (
            <SearchResults
              clearResult={() => {
                setSearchResults([]);
                setSearchValue("");
                setShowSearchResults(false);
              }}
              results={searchResults}
            />
          ) : (
            <h5 className="text-white text-center my-3">No Result Found</h5>
          ))}
      </div>
    </div>
  );
};

export default Search;
