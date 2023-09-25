import React from "react";

const AuthHeader = ({ title, description, value,margin }) => {
  return (
    <div>
      <h1>{title}</h1>
      <h4 className={margin? "mb-0" : ''}>{description}</h4>
      {value ? <h4>{value}</h4> : ""}
    </div>
  );
};

export default AuthHeader;
