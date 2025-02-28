import React from "react";
import GlassCard from "../../components/card/GlassCard";
import { useTranslation } from "react-i18next";
import FAQ from "./FaqSection";
import ContactSection from "./ContactSection";
import AskSection from "./AskButton";

export function Contact() {
  const { t } = useTranslation("contact");

  //  Background Image -> circleFrame
  const backgroundStyle = {
    backgroundImage: `url('/img/contactpage-img/Frame-circle.svg')`,
    backgroundPosition: "center",
    backgroundSize: "full",
  };

  return (
    <main className="max-w-screen-xl m-auto">
      {/* section 1 , Card */}
      <section className=" relative overflow-hidden w-full">
        <div
          style={backgroundStyle}
          className="absolute inset-0 mt-10  bg-cover bg-center bg-no-repeat"
        ></div>
        {/* ... */}
        <div className=" relative max-w-7xl overflow-hidden  min-w-[200px] h-full w-full text-center py-14">
          <h2 className="text-primary-500 text-heading-1 font-bold dark:text-primary-500">
            <span>{t("title")}</span>{" "}
            <span className="text-[#FBA526] font-en">FluentFlow</span>
          </h2>
          {/* container max-w-7xl overflow-hidden  min-w-[200px] */}
          <div className="max-w-7xl mx-auto overflow-hidden min-w-[200px] px-4">
            <div className="flex flex-wrap justify-evenly gap-6 pt-14">
              <div className="w-80">
                <GlassCard className="h-full flex flex-col items-center text-center p-4">
                  <img
                    alt="FAQS Icon"
                    className="mx-auto mb-4"
                    height="150"
                    src="img/contactpage-img/faq.png"
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
              </div>
              <div className="w-80">
                <GlassCard className="h-full flex flex-col items-center text-center p-4">
                  <img
                    alt="FAQ Icon"
                    className="mx-auto mb-4"
                    height="150"
                    src="img/contactpage-img/support.png"
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
              </div>
              <div className="w-80">
                <GlassCard className="h-full flex flex-col items-center text-center p-4">
                  <img
                    alt="Business Growing Icon"
                    className="mx-auto mb-4"
                    height="150"
                    src="img/contactpage-img/fly.png"
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
          </div>
        </div>
      </section>

      {/* section 2, FAQ */}
      <section className="">
        <div className="  text-center">
          <h2 className="text-primary-500 text-heading-1 font-bold">
            <span>{t("title-second")}</span>
          </h2>
          {/* import from faq */}
          <div className="py">
            {" "}
            <FAQ />
          </div>
        </div>
      </section>
      {/* section 3, Ask-button*/}
      <section className="mt-10">
        <div className="  text-center">
          {/* <h2 className="text-primary-500 text-heading-1 font-bold">
            <span>{t("title-second")}</span>
          </h2> */}
          {/* import from faq */}
          <div className="">
            {" "}
            <AskSection />
          </div>
        </div>
      </section>
      {/* section contact message */}
      <section>
        <div className="">
          <h2 className="text-primary-500 text-heading-1 font-bold text-center py-14">
            <span>{t("title-third")}</span>
          </h2>
          <div className="">
            {" "}
            <ContactSection />
          </div>
        </div>
      </section>
      {/* section Ai supporter */}
      <section>
        <div className="max-w-7xl w-full overflow-hidden p-14  min-w-[200px] flex flex-col md:flex-row justify-center items-center gap-8 m-auto">
          {/* Left Content */}
          <div className="w-full md:w-[45%] flex flex-col items-center md:items-start text-center md:text-left">
            <h2 className="text-black dark:text-white text-heading-3 font-bold mb-4 text-center">
              {t("ai-caption")}{" "}
              <span className="text-secondary-500">{t("ai-caption2")} </span>
              {t("ai-caption3")}
            </h2>
            <p className="text-gray-500 text-center text-des-2">
              {t("ai-description")}
            </p>
          </div>

          {/* Right Image */}
          <div className="w-full flex justify-center md:w-1/2">
            <img
              src="img/contactpage-img/Chatbot-pana.svg"
              alt="AI Support"
              // className="max-w-xs md:max-w-sm"
            />
          </div>
        </div>
      </section>
      {/* </div> */}
    </main>
  );
}

export default Contact;
