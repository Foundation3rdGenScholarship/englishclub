import { useState } from "react";
import GlassCard from "../../components/card/GlassCard";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { BiSolidMessageSquareDetail } from "react-icons/bi";
import { useTranslation } from "react-i18next";
import Faq from "../../../public/svg/faq.svg";

const FAQSection = () => {
  const { t } = useTranslation("contact");
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
    <div className="flex flex-col md:flex-row justify-center items-center gap-8 py-14 m-auto">
      {/* Left Image Section - Stays Fixed */}
      <div className="w-full flex justify-center md:w-1/2 flex-shrink-0">
        <img src={Faq} alt="Contact Us" />
      </div>

      {/* FAQ Section */}
      <div className="w-full max-w-xl rounded-xl ">
        {/* FAQ List */}
        <div className=" text-black dark:text-white">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-primary-500 border-l-4 border-b-2 border-0 rounded-lg mb-2"
            >
              <button
                className="w-full text-left p-4 flex justify-between items-center break-words text-lg sm:text-xl md:text-2xl"
                onClick={() => toggleFAQ(index)}
              >
                {faq.question}
                <span>
                  {openIndex === index ? <FaChevronUp /> : <FaChevronDown />}
                </span>
              </button>
              {openIndex === index && (
                <p className="p-4 text-gray-600 dark:text-gray-400 break-words text-left text-base sm:text-lg md:text-xl">
                  {faq.answer}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQSection;
