import { useSelector } from "react-redux";
import logolightmode from "../../../public/img/logo/logo-light-mode.png";
import logodarkmode from "../../../public/img/logo/logo-dark-mode.png";
import istadLogoLight from "../../../public/img/logo/istad-logo-light.webp";
import istadLogoDark from "../../../public/img/logo/istad-logo-dark.png";

export default function Footer() {
  const theme = useSelector((state) => state.theme.theme);

  return (
    <footer className="bg-[#f1f5f9] dark:bg-white/5 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-8 justify-items-center">
          {/* Logo */}
          <div className="col-span-2">
            <img
              src={theme === "dark" ? logodarkmode : logolightmode}
              alt="Logo"
              className="w-48 mb-6"
            />
            <p>
              <span className="text-primary-500 font-bold">FluentFlow</span> is
              the best platform to improve your English skills for free!
            </p>
          </div>
          {/* Contents */}
          <div>
            <h5 className="text-heading-5 font-bold mb-6">Contents</h5>
            <ul className="space-y-2 text-text-des-light-mode ">
              <li>
                <a href="">Home</a>
              </li>
              <li>
                <a href="">Courses</a>
              </li>
              <li>
                <a href="">About</a>
              </li>
              <li>
                <a href="">Contact</a>
              </li>
            </ul>
          </div>
          {/* Skills */}
          <div>
            <h5 className="text-xl font-bold mb-6">Skills</h5>
            <ul className="space-y-2 text-text-des-light-mode ">
              <li>
                <a href="">Listening</a>
              </li>
              <li>
                <a href="">Reading</a>
              </li>
              <li>
                <a href="">Writing</a>
              </li>
              <li>
                <a href="">Speaking</a>
              </li>
            </ul>
          </div>
          {/* Grammar */}
          <div>
            <h5 className="text-xl font-bold mb-6">Grammar</h5>
            <ul className="space-y-2 text-text-des-light-mode ">
              <li>
                <a href="">A1 - A2</a>
              </li>
              <li>
                <a href="">B1 - B2</a>
              </li>
              <li>
                <a href="">C1</a>
              </li>
            </ul>
          </div>
          {/* Vocabulary */}
          <div>
            <h5 className="text-xl font-bold mb-6">Vocabulary</h5>
            <ul className="space-y-2 text-text-des-light-mode ">
              <li>
                <a href="">A1 - A2</a>
              </li>
              <li>
                <a href="">B1 - B2</a>
              </li>
              <li>
                <a href="">C1</a>
              </li>
            </ul>
          </div>
          {/* Organize */}
          <div className="col-span-2">
            {/* ISTAD */}
            <div className="mb-16">
              <h5 className="text-xl font-bold mb-6">Organize By</h5>
              <img
                className="w-40"
                src={theme === "dark" ? istadLogoDark : istadLogoLight}
                alt="ISTAD Logo"
              />
            </div>
            {/* NEWS LETTER */}
            <div>
              <h5 className="text-xl font-bold mb-6">News letter</h5>
              <input
                className="bg-[#f1f5f9] placeholder-text-des-light-mode placeholder:text-left text-sm pl-0 border-t-0 border-x-0 border-text-des-light-mode w-60"
                placeholder="Enter your email address"
                type="text"
              />
            </div>
          </div>
        </div>
        <hr className="bg-primary-100 my-8 border-0 h-px" />
        <div className="text-center">
          <p>
            &copy; 2025 Copyright <a href="#">FluentFlow</a> by{" "}
            <a href="https://www.cstad.edu.kh/">ISTAD</a> .All rights reserved.™
          </p>
        </div>
      </div>
    </footer>
  );
}
