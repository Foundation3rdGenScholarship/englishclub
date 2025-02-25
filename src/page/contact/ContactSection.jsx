import React from "react";
import GlassCard from "../../components/card/GlassCard";
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
    <section className="w-full py-14 flex justify-center ">
      <div className="container max-w-6xl flex flex-col md:flex-row items-center justify-center px-8 md:px-16 gap-8">
        {/* Left Image */}
        <div className="w-full md:w-1/2 flex justify-center">
          <img
            src="./public/img/contactpage-img/contact-us.svg"
            alt="Contact Us"
            className="max-w-sm"
          />
        </div>

        {/* Right Contact Info */}
        <div className="w-full md:w-1/2 flex justify-center">
          <GlassCard className="rounded-[2em_0px_2em_0px] w-full max-w-lg px-8 py-20 flex flex-col items-center text-center">
            <h2 className="dark:text-white text-heading-3 font-bold mb-4 text-center ">
            {t("head-office")}
            </h2>

            <div className="space-y-4 text-des-3">
              <div className="flex items-center space-x-3">
                <FaPhoneAlt className="text-primary-500 text-des-1 " />
                <span className="dark:text-white">+855 93 990 910</span>
              </div>
              <div className="flex items-center space-x-3">
                <FaEnvelope className="text-primary-500 text-des-1" />
                <span className="dark:text-white">fluentflow@gmail.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <FaMapMarkerAlt className="text-primary-500 text-des-1" />
                <span className="dark:text-white">
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
    </section>
  );
};

export default ContactSection;
