import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import logo from "Images/scondaryLogo.png";
import { TailSpin } from "react-loader-spinner";

import classes from "./style.module.scss";

const propTypes = {
  isLoading: PropTypes.bool.isRequired,
};

const Loader = ({ isLoading }) => (
  <div
    className={classNames({
      [classes.loaderComponent]: true,
      [classes.showLoader]: isLoading || false,
    })}
  >
    <TailSpin
  height="80"
  width="80"
  color="#ffcd2f"
  ariaLabel="tail-spin-loading"
  radius="1"
  wrapperStyle={{}}
  wrapperClass=""
  visible={true}
/>
  </div>
);

Loader.propTypes = propTypes;

export default Loader;
