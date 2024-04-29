import React, { useEffect } from "react";
import { gapi } from "gapi-script";

import ClientRoutes from "Routes";
import "Style/global.scss";

const App = () => {
  const initializeGapi = () => {
    gapi.client.init({
      clientId: "633610376912-pm1g8qjlufvrdfci1tj2jitupdg426n1.apps.googleusercontent.com",
      scope: "email profile",
      cookiepolicy: 'single_host_origin',
      plugin_name: 'App Name that you used in google developer console API'
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
