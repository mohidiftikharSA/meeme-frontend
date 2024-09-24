import Logo from "Components/Logo";
import React, { useEffect, useState, useRef } from "react";
import { ButtonGroup, Container } from "react-bootstrap";
import classes from "./index.module.scss";
import Search from "Components/Search";
import SearchResults from "Components/Search/SearchResult";
import Navigation from "Components/Nav";
import { Link, useNavigate } from "react-router-dom";
import coin from "../../Images/coin.png";
import avatar from "../../Images/avatar.png";
import { useSelector } from "react-redux";
import api from "APIs/dashboard/home";
import SpinnerLoader from "../Loader/SpinnerLoader";
import { coinConvert } from "Helper/Converters";

const Header = () => {
  const [scrolling, setScrolling] = useState(false);
  const { profile } = useSelector((state) => state.auth);
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [showSearchResults, setShowSearchResults] = useState(false);  // New state to control visibility
  const navigate = useNavigate();
  const floatingResultsRef = useRef();  // Reference to floating results

  const navigateToStore = () => {
    navigate(`/BuyCoin`);
  };

  const handleScroll = () => {
    setScrolling(window.scrollY > 80);
  };

  let timeoutId;
  const onSearch = async (value) => {
    setSearchValue(value);
    clearTimeout(timeoutId);
    timeoutId = setTimeout(async () => {
      if (value !== "" && value != null) {
        setSearchResults([]);
        setIsLoading(true);
        const response = await api.searchUser(value).finally(() => {
          setIsLoading(false);
        });
        setSearchResults(response?.data?.similar_users || []);
        setShowSearchResults(true);  // Show search results
      } else {
        setSearchResults([]);
        setShowSearchResults(false);  // Hide search results if empty
      }
    }, 1000);
  };

  const onChangeSearch = (value) => {
    setSearchValue(value);
    if (value === "") {
      setSearchResults([]);  // Clear results when input is cleared
      setShowSearchResults(false);  // Hide search box when cleared
    }
  };

  // Click outside to hide search results
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (floatingResultsRef.current && !floatingResultsRef.current.contains(event.target)) {
        setSearchResults([]);  // Clear results when clicking outside
        setSearchValue('');    // Clear search value
        setShowSearchResults(false);  // Hide search box when clicking outside
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const myCoins = useSelector((state) => state.coins);

  return (
    <header
      className={`${
        scrolling ? `${classes.headerFixed} ${classes.header}` : classes.header
      }`}
    >
      <Container fluid>
        <div className="d-flex align-items-center justify-content-between">
          <Logo link={"/home"} />
          <div className={classes.rightSide}>
            <Search text={"Search"} onSearchChange={onChangeSearch} onSearchSubmit={onSearch} />
            <Navigation header />
            <ButtonGroup className="align-items-center" id="profile-btn">
              <div className={`btn ${classes.iconBtn}`}>
                <span className={classes.icon} onClick={navigateToStore}>
                  <i className="fas fa-plus"></i>
                </span>
                <Link to={"/Purchase"}>
                  <span className={classes.text}>
                    {coinConvert(myCoins.allCoins)}
                  </span>
                  <img src={coin} alt="icon" />
                </Link>
              </div>

              <Link to={"/profile"} className={`btn ${classes.profileBtn}`}>
                <img src={profile?.user_image || avatar} alt="icon" />
              </Link>
            </ButtonGroup>
          </div>
        </div>
      </Container>
      {showSearchResults && (
        <div className={classes.overlay}>
          <div className={classes.floatingResults} ref={floatingResultsRef}>
            {isLoading ? (
              <SpinnerLoader className="mt-5" />
            ) : searchResults?.length > 0 ? (
              <SearchResults
                clearResult={() => {
                  setSearchResults([]);
                  setSearchValue('');
                  setShowSearchResults(false);  // Hide after clearing results
                }}
                results={searchResults}
              />
            ) : searchValue.length > 0 ? (
              <h5 className="text-white text-center mt-3">No Result Found</h5>
            ) : null}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
