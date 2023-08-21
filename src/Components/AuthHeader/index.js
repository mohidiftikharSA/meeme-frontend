import React from "react";

const AuthHeader = ({ title, description, phone,margin }) => {
  return (
    <div>
      <h1>{title}</h1>
      <h4 className={margin? "mb-0" : ''}>{description}</h4>
      {phone ? <h4>{phone}</h4> : ""}
    </div>
  );
};

export default AuthHeader;
