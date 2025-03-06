import React from "react";
import Hero from "./Hero";
import shap from "../../../public/svg/1.svg";
import ellipseHalf from "../../../public/svg/2.svg";
import Container from "./Container";
import Categories from "./Categories";
import CategoriesCard from "./CategoriesCard";

const HomeMain = () => {
  const Container = ({ children, className = "" }) => {
    return (
      <div
        // className={`max-w-7xl mx-auto ${className}`}
        className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`}
      >
        {children}
      </div>
    );
  };
  return (
    <div>
      <div className="relative">
        <img
          src={shap}
          alt=""
          className="absolute mt-[-100px] w-[600px] right-0 z-[-1]"
        />
      </div>
      <div className="relative">
        <img
          src={ellipseHalf}
          alt=""
          className="absolute mt-[170px] w-[200px] left-0 z-[-1]"
        />
      </div>
      <Container>
        <Hero />
        <br />
        <Categories />
      </Container>

    </div>
  );
};

export default HomeMain;
