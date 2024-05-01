import React from "react";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ElementControl from "Components/ElementControl";
import routes from "./routes";
import { useSelector } from "react-redux";

const ClientRoutes = () => {
  var { accessToken } = useSelector((state) => state.auth);
  // if (!accessToken) {
  //   accessToken = localStorage.getItem("accessToken")
  // }

  const getElementControl = (path, authenticated, component, layout) => {
    if (!authenticated) {
      if (accessToken) {
        if (path === '/' ||
          path === '/login' ||
          path === '/forgetpassword' ||
          path === '/forgetPassword' ||
          path === '/restsetPassword' ||
          path === '/signup' ||
          path === '/emailVerification' ||
          path === '/emailVerification'
        ) {
          return <Navigate to="/home" />
        }
      }
      return <ElementControl Component={component} Layout={layout} />;
    }
    if (authenticated) {
      if (accessToken) {
        return <ElementControl Component={component} Layout={layout} />;
      } else {
        return <Navigate to="/" />;
      }
    }
  };
  return (
    <BrowserRouter>
      <Routes>
        {routes.map((route, index) => {
          const { path, subRoutes, component, layout, authenticated } = route;
          if (subRoutes && subRoutes.length > 0) {
            return (
              <Route key={`route_${index}`}>
                {subRoutes.map((subRoute, subIndex) => {
                  return (
                    <Route
                      key={`subroute_${subIndex}`}
                      exact
                      path={`${route.path}${subRoute.path}`}
                      element={getElementControl(path, authenticated, subRoute.component, layout)}
                    />
                  );
                })}
              </Route>
            );
          }
          return (
            <Route
              key={`route_${index}`}
              exact
              path={path}
              element={getElementControl(path, authenticated, component, layout)}
            />
          );
        })}
      </Routes>
    </BrowserRouter>
  );
};

export default ClientRoutes;