import React from "react";
import GlassCard from "../../components/card/GlassCard";
import { useTranslation } from "react-i18next";
import FAQ from "./FaqSection";
import ContactSection from "./ContactSection";
// import circle from "/img/contactpage-img/Frame-circle.svg";

export function Contact() {
  const { t } = useTranslation("contact");
  /*
  const backgroundStyle = {
    backgroundImage: `url(${circle})`,
    backgroundPosition: 'center', 
    height: '100vh', 
  };
  */

  //  Background Image -> circleFrame
  const backgroundStyle = {
    backgroundImage: `url('/img/contactpage-img/Frame-circle.svg')`,
    backgroundPosition: "center",
    backgroundSize: "fit",
    //minHeight: "100vh", // here use minHeight instead of height, so the background image can cover the whole page, or it will make the card display in the wrong position
    // display: "flex",
    // flexDirection: "column",
    // justifyContent: "center",
    // alignItems: "center",
  };

  return (
    <>
      {/* section 1 , Card */}
      {/* <div  style={backgroundStyle}>  */}
      
      <section className="relative overflow-hidden h-screen">
        <div style={backgroundStyle} className="absolute inset-0  bg-cover bg-center bg-no-repeat"></div>

        <div className="relative h-full w-full text-center py-12 flex flex-col justify-center">
          <h2 className="text-primary-500 text-heading-1 font-bold dark:text-primary-500">
            <span>{t("title")}</span>{" "}
            <span className="text-[#FBA526] font-en">FluentFlow</span>
          </h2>

          <div className="flex flex-wrap justify-center mt-8 space-x-0 md:space-x-8 gap-5">
            {/* FAQ Card */}
            <GlassCard className="w-80 h-auto flex flex-col items-center text-center p-4 bg-white bg-opacity-80 rounded-lg shadow-lg">
              <img
                alt="FAQS Icon"
                className="mx-auto mb-4"
                height="150"
                src="./public/img/contactpage-img/faq.png"
                width="150"
              />
              <div className="flex-1 flex flex-col justify-center">
                <h3 className="text-heading-3 text-primary-500 font-semibold">
                  {t("des")}
                </h3>
                <p className="mt-2 text-gray-600 dark:text-white text-des-2">
                  {t("sub-des-faq")}
                </p>
              </div>
              <button className="text-[20px] text-white m-3 bg-secondary-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-secondary-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                {t("btn-des")}
              </button>
            </GlassCard>

            {/* Support Card */}
            <GlassCard className="w-80 h-auto flex flex-col items-center text-center p-4 bg-white bg-opacity-80 rounded-lg shadow-lg">
              <img
                alt="Support Icon"
                className="mx-auto mb-4"
                height="150"
                src="./public/img/contactpage-img/support.png"
                width="150"
              />
              <div className="flex-1 flex flex-col justify-center">
                <h3 className="text-heading-3 text-primary-500 font-semibold">
                  {t("con")}
                </h3>
                <p className="mt-2 text-gray-600 dark:text-white text-des-2">
                  {t("sub-des-con")}
                </p>
              </div>
              <button className="text-[20px] text-white m-3 bg-secondary-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-secondary-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                {t("btn-con")}
              </button>
            </GlassCard>

            {/* Business Card */}
            <GlassCard className="w-80 h-auto flex flex-col items-center text-center p-4 bg-white bg-opacity-80 rounded-lg shadow-lg">
              <img
                alt="Business Icon"
                className="mx-auto mb-4"
                height="150"
                src="./public/img/contactpage-img/fly.png"
                width="150"
              />
              <div className="flex-1 flex flex-col justify-center">
                <h3 className="text-heading-3 text-primary-500 font-semibold font-en">
                  FluentFlow
                </h3>
                <p className="mt-2 text-gray-600 dark:text-white text-des-2">
                  {t("sub-des-name")}
                </p>
              </div>
              <button className="text-[20px] text-white m-3 bg-secondary-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-secondary-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                {t("btn-name")}
              </button>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* section 2, FAQ */}
      <section className="mt-12">
        <div className="container mx-auto text-center">
          <h2 className="text-primary-500 text-heading-1 font-bold">
            <span>{t("title-second")}</span>
          </h2>
          {/* import from faq */}
          <div className="">
            {" "}
            <FAQ />
          </div>
        </div>
      </section>
      {/* section contact message */}
      <section>
        <div className="container mx-auto text-center">
          <h2 className="text-primary-500 text-heading-1 font-bold">
            <span>{t("title-third")}</span>
          </h2>
          <div className="">
            {" "}
            <ContactSection />
          </div>
        </div>
      </section>
      {/* section Ai supporter */}
      <section className="w-full py-14 flex justify-center">
        <div className="container max-w-6xl flex flex-col md:flex-row items-center justify-between px-8 md:px-16">
          {/* Left Content */}
          <div className="w-full md:w-[45%] flex flex-col items-center md:items-start text-center md:text-left">
            <h2 className="dark:text-white text-heading-3 font-bold mb-4 text-center">
              {t("ai-caption")}{" "}
              <span className="text-secondary-500">{t("ai-caption2")} </span>
              {t("ai-caption3")}
            </h2>
            <p className="text-gray-500 text-center text-des-2">
              {t("ai-description")}
            </p>
          </div>

          {/* Right Image */}
          <div className="w-full md:w-[45%] flex justify-center">
            <img
              src="/img/contactpage-img/Chatbot-pana.svg"
              alt="AI Support"
              className="max-w-xs md:max-w-sm"
            />
          </div>
        </div>
      </section>
      {/* </div> */}
    </>
  );
}

export default Contact;
