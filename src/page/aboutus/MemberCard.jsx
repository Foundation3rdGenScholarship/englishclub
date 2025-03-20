import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useTranslation } from "react-i18next";
import { FaGithub } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { FaLinkedin } from "react-icons/fa";

export default function MentorCard() {
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
      name: t("oudom"),
      image: "/img/teamwork-img/oudom.JPG",
      title: "Team Leader",
      linkedin: "https://www.linkedin.com/in/oudom-phoem-8a12b62a3",
      email:
        "https://mail.google.com/mail/u/0/#search/oudomphoem%40gmail.com?compose=new",
      github: "https://github.com/oudomm",
      borderColor: "border-accents-color",
      animation: "fade-right",
    },
    {
      name: t("rotana"),
      image: "/img/teamwork-img/rotana.JPG",
      title: "Front-End",
      linkedin: "https://www.linkedin.com/in/ratana-touch-930119302/",
      email:
        "https://mail.google.com/mail/u/0/#search/toch.ratana.rml%40gmail.com?compose=new",
      github: "https://github.com/tochratana",
      borderColor: "border-accents-color",
      animation: "fade-left",
    },
    {
      name: t("leaphea"),
      image: "/img/teamwork-img/leaphea.JPG",
      title: "Front-End",
      linkedin: "https://www.linkedin.com/in/ansoleaphea-lim-a27999328/",
      email:
        "https://mail.google.com/mail/u/0/#search/ansoleaphea%40gmail.com?compose=new",
      github: "https://github.com/Leaphea-Lim",
      borderColor: "border-accents-color",
      animation: "fade-right",
    },
    {
      name: t("vuthy"),
      image: "/img/teamwork-img/vuthy.JPG",
      title: "Front-End",
      linkedin: "https://www.linkedin.com/in/vuthy-tourn-14ab38354/",
      email:
        "https://mail.google.com/mail/u/0/#search/vuthytuon168%40gmail.com?compose=new",
      github: "https://github.com/Vuthy-Tourn",
      borderColor: "border-accents-color",
      animation: "fade-left",
    },
    {
      name: t("eric"),
      image: "/img/teamwork-img/eric.JPG",
      title: "Front-End",
      linkedin: "https://www.linkedin.com/in/eric-va-b38456303/",
      email:
        "https://mail.google.com/mail/u/0/#search/ericva01%40gmail.com?compose=new",
      github: "https://github.com/ericva01",
      borderColor: "border-accents-color",
      animation: "fade-right",
    },
    {
      name: t("bora"),
      image: "/img/teamwork-img/bora.JPG",
      title: "Front-End",
      linkedin: "https://www.linkedin.com/in/tong-bora-a0760a333/",
      email:
        "https://mail.google.com/mail/u/0/#search/tongbora.official%40gmail.com?compose=new",
      github: "https://github.com/tongbora",
      borderColor: "border-accents-color",
      animation: "fade-left",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 max-w-screen-xl gap-10 ">
      {mentorDetails.map((member, index) => (
        <div
          key={index}
          data-aos={member.animation}
          data-aos-delay={index * 100}
          className="w-72 rounded-lg shadow-md overflow-hidden m-auto"
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
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 font-[Poppins]">
                {member.title}
              </p>
            </div>

            <div className="flex justify-evenly mt-4  text-gray-700 dark:text-gray-300">
              {/* LinkedIn icon */}
              <a
                className="hover:text-primary-600 dark:hover:text-primary-300 transition-colors"
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <FaLinkedin className="w-6 h-6" />
              </a>

              {/* Email icon */}
              <a
                className="hover:text-primary-600 dark:hover:text-primary-300 transition-colors"
                href={member.email}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Email"
              >
                <IoMdMail className="w-6 h-6" />
              </a>

              {/* GitHub icon */}
              <a
                className="hover:text-primary-600 dark:hover:text-primary-300 transition-colors"
                href={member.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <FaGithub className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
