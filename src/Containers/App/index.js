import React, { useEffect } from "react";
import ClientRoutes from "Routes";
import { ActionCableProvider } from "react-actioncable-provider";
import "Style/global.scss";
import { useSelector } from "react-redux";

const App = () => {
  const { accessToken } = useSelector((state) => state.auth);

  return (
    <>
      {/* <ActionCableProvider
        url={`wss://1f9b-139-135-32-227.ngrok-free.app/cable?token=${accessToken}`}
      > */}
      <ClientRoutes />
      {/* </ActionCableProvider> */}
    </>
  );
};

export default App;
