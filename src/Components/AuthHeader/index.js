import React from "react";

const AuthHeader = ({ title, description }) => {
  return (
    <div>
      <h1>{title}</h1>
      <h4>{description}</h4>
    </div>
  );
};

export default AuthHeader;
