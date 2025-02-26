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
import AboutUsMain from "./page/aboutus/AboutUsMain.jsx";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ProgressBar />
    <BrowserRouter>
      <Routes>
        <Route element={<RootLayout />}>
          <Route path="/" element={<HomeMain />} />
          <Route path="/courses" element={<CoursesMain />} />
          <Route path="/about" element={<AboutUsMain/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
