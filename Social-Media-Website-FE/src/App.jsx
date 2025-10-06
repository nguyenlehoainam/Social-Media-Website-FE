import React, { Children } from "react";
import LoginPage from "./pages/loginPage/loginPage";
import "./App.scss";
import { useRoutes } from "react-router-dom";
import ForgotPasswordPage from "./pages/ForgotPasswordPage/ForgotPasswordPage";

const App = () => {
  const elements = useRoutes([
    {
      path: "/",
      element: <LoginPage />,
    },
    {
      path: "/forgot-password",
      element: <ForgotPasswordPage />,
    },
  ]);
  return <>{elements}</>;
};

export default App;
