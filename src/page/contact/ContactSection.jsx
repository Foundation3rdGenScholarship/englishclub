import React from "react";
import GlassCard from "../../components/card/GlassCard";
import contactImage from "../../../public/svg/contact.svg";
import { useTranslation } from "react-i18next";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFacebook,
  FaTelegramPlane,
} from "react-icons/fa";

const ContactSection = () => {
  const { t } = useTranslation("contact");
  return (
    <div id="contact">
      <div className="flex flex-col md:flex-row justify-center items-center gap-8 m-auto">
        {/* Left Image */}
        <div className="w-full flex justify-center md:w-1/2">
          <img
            src={contactImage}
            alt="Contact Us"
            // className="max-w-xl"
          />
        </div>

        {/* Right Contact Info */}
        <div className="w-full md:w-1/2 flex justify-center">
          <GlassCard className="rounded-[2em_0px_2em_0px] w-full max-w-lg px-8 py-20 flex flex-col items-center text-center">
            <h2 className="text-black dark:text-white text-heading-3 font-bold mb-4 text-center ">
              {t("head-office")}
            </h2>

            <div className="space-y-4 text-des-3">
              <div className="flex items-center space-x-3">
                <FaPhoneAlt className="text-primary-500 text-des-1 " />
                <span className="text-black dark:text-white">
                  +855 93 990 910
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <FaEnvelope className="text-primary-500 text-des-1" />
                <span className="text-black dark:text-white">
                  fluentflow@gmail.com
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <FaMapMarkerAlt className="text-primary-500 text-des-1" />
                <span className=" text-black dark:text-white">
                  {t("location-icon")}
                </span>
              </div>
            </div>

            {/* Social Media Icons */}
            <div className="flex justify-center space-x-4 mt-4">
              <a href="#" className="text-primary-500 text-4xl">
                <FaFacebook />
              </a>
              <a href="#" className="text-primary-500 text-4xl">
                <FaTelegramPlane />
              </a>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;
