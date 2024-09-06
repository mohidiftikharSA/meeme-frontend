import Logo from "Components/Logo";
import React, { useEffect, useState } from "react";
import { ButtonGroup, Container } from "react-bootstrap";
import classes from "./index.module.scss";
import Search from "Components/Search";
import SearchResults from "Components/Search/SearchResult";
import Navigation from "Components/Nav";
import { Link, useNavigate } from "react-router-dom";
import coin from "../../Images/coin.png";
import avatar from "../../Images/avatar.png";
import { useDispatch, useSelector } from "react-redux";
import api from "APIs/dashboard/home";
import SpinnerLoader from "../Loader/SpinnerLoader";
import { coinConvert } from "Helper/Converters";

const Header = () => {
  const [scrolling, setScrolling] = useState(false);
  const { profile, user } = useSelector((state) => state.auth);
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();

  const navigateToStore = (id) => {
    navigate(`/BuyCoin`);
  };
  let timeoutId;
  const handleScroll = () => {
    if (window.scrollY > 80) {
      setScrolling(true);
    } else {
      setScrolling(false);
    }
  };

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
        setSearchResults(response?.data?.similar_users);
      } else {
        //  setTimeout(() => {
        setSearchResults([]);
        //       }, 1000)
      }
    }, 1000);
  };
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
            <Search text={"Search"} onSearchChange={onSearch} />
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
                  {/* <span className={classes.text}>{myCoins.allCoins}</span> */}
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
      {searchResults?.length === 0 && isLoading ? (
        <>
          <div className={classes.overlay}>
            <div className={`${classes.floatingLoader}`}>
              <SpinnerLoader className="mt-5"></SpinnerLoader>
            </div>
          </div>
        </>
      ) : searchResults?.length === 0 && searchValue.length > 0 ? (
        <>
          <div className={classes.overlay}>
            <div className={`${classes.floatingLoader}`}>
              <h5 className="text-white text-center mt-3">No Result Found</h5>
            </div>
          </div>
        </>
      ) : (
        searchResults?.length > 0 &&
        searchValue?.length > 0 &&   
        (
          <>
            <div className={classes.overlay}>
              <div className={classes.floatingResults}>
                <SearchResults
                  clearResult={() => {
                    setSearchResults([]);
                    setSearchValue('');
                  }}
                  style={{ marginTop: "20px" }}
                  results={searchResults}
                />
              </div>
            </div>
          </>
        )
      )}
    </header>
  );
};

export default Header;
