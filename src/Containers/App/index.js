import React, { useEffect } from "react";
import { gapi } from "gapi-script";

import ClientRoutes from "Routes";
import "Style/global.scss";

const App = () => {
  const initializeGapi = () => {
    gapi.client.init({
      clientId: "633610376912-pm1g8qjlufvrdfci1tj2jitupdg426n1.apps.googleusercontent.com",
      scope: "",
    });
  };
  
  useEffect(() =>{
    // load and init google api scripts
    gapi.load("client:auth2", initializeGapi);
  })

  return (
    <>
      <ClientRoutes />
    </>
  );
};

export default App;
