import React from "react";
import { useTranslation } from "react-i18next";
import { FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa";

export default function MemberCard() {
  const { t } = useTranslation("about");
  const teamMembers = [
    { name: t("oudom"), image: "/img/teamwork-img/oudom.JPG" },
    { name: t("rotana"), image: "/img/teamwork-img/rotana.JPG" },
    { name: t("leaphea"), image: "/img/teamwork-img/leaphea.JPG" },
    { name: t("vuthy"), image: "/img/teamwork-img/vuthy.JPG" },
    { name: t("eric"), image: "/img/teamwork-img/eric.JPG" },
    { name: t("bora"), image: "/img/teamwork-img/bora.JPG" },
  ];

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-6 md:px-20 dark:text-white">
        {teamMembers.map((member, index) => (
          <div key={index} className="flex flex-col items-center mt-5">
            {/* Name Tag */}
            <div className=" text-white font-bold text-xl px-6 py-2 rounded-tl-[25px] rounded-br-[25px] bg-accents-color mb-[15px]">
              {member.name}
            </div>

            {/* Image */}
            <img
              src={member.image}
              alt={member.name}
              loading="lazy"
              className="w-64 h-64 rounded-tl-[50px] rounded-br-[50px] object-cover  shadow-lg"
            />

            {/* Social Icons */}
            <div className="flex  mt-5 text-3xl text-black dark:text-white">
              <a href="http://">
                <FaLinkedin className="cursor-pointer mr-4  hover:text-blue-700" />
              </a>
              <FaEnvelope className="cursor-pointer  mx-2 hover:text-blue-700" />
              <FaGithub className="cursor-pointer ml-4  hover:text-blue-700" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
