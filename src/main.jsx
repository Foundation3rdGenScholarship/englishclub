import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import "./index.css";
import App from "./App.jsx";
import HomeMain from "./page/home/HomeMain.jsx";
import RootLayout from "./components/layout/RootLayout.jsx";
import ProgressBar from "./components/progress/ProgressBar.jsx";
import "./i18n.js";
import CoursesMain from "./page/courses/CoursesMain.jsx";
import Login from "./page/auth/Login.jsx";
import { store } from "./app/store.js";
import { Provider } from "react-redux";
import Register from "./page/auth/Register.jsx";
import ForgotPassword from "./page/auth/ForgotPassword.jsx";
import Dashboard from "./page/dashboard/Dashboard.jsx";
import Contact from "./page/contact/ContactMain.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <ProgressBar />
      <BrowserRouter>
        <Routes>
          <Route element={<RootLayout />}>
            <Route path="/" element={<HomeMain />} />
            <Route path="/courses" element={<CoursesMain />} />
            <Route path="/contact" element={<Contact />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route element={<Dashboard />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
