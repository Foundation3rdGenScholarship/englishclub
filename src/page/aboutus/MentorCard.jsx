import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useTranslation } from "react-i18next";
import { FaGithub } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { FaLinkedin } from "react-icons/fa";
import cherPheng from "../../../public/img/image/LokKruPheng.png";
import cherDavan from "../../../public/img/image/LokKruDavan.png";

export default function TeamCard() {
  const { t } = useTranslation("about");
  
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
    });
  }, []);
  
  const mentorDetails = [
    {
      name: t("cherPheng"),
      title: "Teacher",
      image: cherPheng,
      linkedin: "https://linkedin.com/in/kim-chansokpheng-6b6513267",
      email: "mailto:kimchansokpheng@gmail.com",
      github: "https://github.com/sokpheng001",
      borderColor: "border-accents-color",
      animation: "fade-right"
    },
    {
      name: t("cherDavan"),
      title: "Teacher",
      image: cherDavan,
      linkedin: "https://linkedin.com/in/ing-davann-0617b32a3",
      email: "mailto:ingdavann4444@gmail.com",
      github: "https://github.com/ingdavann",
      borderColor: "border-accents-color",
      animation: "fade-left"
    },
  ];
  
  return (
    <div className="flex flex-wrap justify-center gap-16 px-4 py-16">
      {mentorDetails.map((member, index) => (
        <div
          key={index}
          data-aos={member.animation}
          data-aos-delay={index * 100}
          className="w-72 bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
        >
          <div className={`h-1 ${member.borderColor}`}></div>
          <div className="p-6">
            <div className="flex flex-col items-center">
              <div
                className={`rounded-full border-2 ${member.borderColor} p-1 mb-4`}
              >
                <img
                  className="w-48 h-48 rounded-full object-cover"
                  src={member.image}
                  alt={member.name}
                  loading="lazy"
                />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                {member.name}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                {member.title}
              </p>
            </div>
            
            <div className="flex justify-evenly mt-4 text-gray-700 dark:text-gray-300">
              {/* LinkedIn icon */}
              <a
                className="hover:text-primary-600 dark:hover:text-primary-300 transition-colors"
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <FaLinkedin className="w-6 h-6"/>
              </a>
              
              {/* Email icon */}
              <a
                className="hover:text-primary-600 dark:hover:text-primary-300 transition-colors"
                href={member.email}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Email"
              >
                <IoMdMail className="w-6 h-6"/>
              </a>
              
              {/* GitHub icon */}
              <a
                className="hover:text-primary-600 dark:hover:text-primary-300 transition-colors"
                href={member.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <FaGithub className="w-6 h-6"/>
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}