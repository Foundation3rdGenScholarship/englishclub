import { useState } from "react";
import GlassCard from "../../components/card/GlassCard";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { BiSolidMessageSquareDetail } from "react-icons/bi";
import { useTranslation } from "react-i18next";

const FAQSection = () => {
  const { t } = useTranslation("contact"); // Ensure this matches your namespace
  const faqs = [
    {
      question: t("question1"),
      answer: t("answer1"),
    },
    {
      question: t("question2"),
      answer: t("answer2"),
    },
    {
      question: t("question3"),
      answer: t("answer3"),
    },
    {
      question: t("question4"),
      answer: t("answer4"),
    },
    {
      question: t("question5"),
      answer: t("answer5"),
    },
    {
      question: t("question6"),
      answer: t("answer6"),
    },
  ];

  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="w-full py-14 flex justify-center ">
      <div className="flex flex-col md:flex-row justify-center gap-8 p-8 m-auto">
        {/* FAQ Section */}
        {/* w-full md:w-[600px] */}
        <GlassCard className="w-full md:w-[600px] rounded-[0px_2em_2em_0px]">
          <div className="w-full rounded-xl p-6 ">
            <div className="flex justify-center">
              <h2 className="text-heading-3 font-bold flex items-center text-center gap-2">
                <span className="text-primary-500 ">
                  <BiSolidMessageSquareDetail />
                </span>{" "}
                <span className="text-primary-950 dark:text-secondary-500 ">{t("title-faq")}</span>
              </h2>
            </div>
            <div className="mt-4 dark:text-white text-des-2">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="border border-primary-500 border-l-4 border-b-2 border-0 rounded-lg mb-2 "
                >
                  <button
                    className="w-full text-left p-4 flex justify-between items-center break-words"
                    onClick={() => toggleFAQ(index)}
                  >
                    {faq.question}
                    <span>
                      {openIndex === index ? (
                        <FaChevronUp />
                      ) : (
                        <FaChevronDown />
                      )}
                    </span>
                  </button>
                  {openIndex === index && (
                    <p
                      className="p-4 text-gray-600 dark:text-gray-400 text-des-3 break-words text-left
                    "
                    >
                      {faq.answer}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </GlassCard>

        {/* Contact Form */}
        <GlassCard className="rounded-[2em_0px_0px_2em]">
          <div className="w-full md:w2/3 rounded-xl p-6 dark:text-white">
            <div className="flex justify-center">
              <h2 className="text-heading-3 font-bold flex items-center gap-2">
                <span className="text-primary-500">
                  <BiSolidMessageSquareDetail />
                </span>{" "}
                <span className="text-primary-950 dark:text-secondary-500">{t("title-askUs")}</span>
              </h2>
            </div>
            <form className="mt-4 text-des-2">
              <label className="block text-left font-medium">
                {t("name-input")}
              </label>
              <input
                type="text"
                placeholder={t("name-placeholder")}
                className="w-full text-des-3 p-2 border rounded-lg bg-transparent mt-1 mb-3"
              />

              <label className="block text-left font-medium">
                {t("email")}
              </label>
              <input
                type="email"
                placeholder={t("email-placeholder")}
                className="w-full text-des-3 p-2 border rounded-lg bg-transparent mt-1 mb-3"
              />

              <label className="block text-left font-medium">
                {t("subject")}
              </label>
              <input
                type="text"
                placeholder={t("subject-placeholder")}
                className="w-full text-des-3 p-2 border rounded-lg bg-transparent mt-1 mb-3"
              />

              <label className="block text-left font-medium">
                {t("question-ask")}
              </label>
              <textarea
                placeholder={t("question-ask-placeholder")}
                className="w-full text-des-3 p-2 border rounded-lg bg-transparent mt-1 mb-3"
              ></textarea>

              <button
                type="submit"
                className="bg-secondary-500 text-white px-5 py-2 rounded-lg  focus:ring-4 focus:outline-none focus:ring-secondary-200 font-medium flex ml-auto"
              >
                {t("btn-submit")}
              </button>
            </form>
          </div>
        </GlassCard>
      </div>
    </section>
  );
};

export default FAQSection;
