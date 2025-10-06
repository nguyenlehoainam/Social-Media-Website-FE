import React, { Children } from "react";

import "./App.scss";
import { useRoutes } from "react-router-dom";
import ForgotPasswordPage from "./pages/ForgotPasswordPage/ForgotPasswordPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import LoginPage from "./pages/LoginPage/LoginPage";

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
    {
      path: "/register",
      element: <RegisterPage />,
    },
  ]);
  return <>{elements}</>;
};

export default App;
