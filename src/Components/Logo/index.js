import React from "react";
import classes from "./index.module.scss";
import {Link} from "react-router-dom";
import logo from "../../Images/logo.png";

const Logo = (props) => {
    return(
        <>
            <div className={props.login? `${classes.logo} ${classes.login}` : `${classes.logo} ${props.start? `${classes.logoStart}` : ""}` }>
                <Link to={props.link}>
                    <img src={logo} alt={"Memee"} />
                </Link>
            </div>
        
        </>
    )
}

export default Logo;