import GlassCard from "../../components/card/GlassCard";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { BiSolidMessageSquareDetail } from "react-icons/bi";
import { useTranslation } from "react-i18next";

const AskSection = () => {
  const { t } = useTranslation("contact"); // Ensure this matches your namespace

  return (
    <div className="max-w-7xl w-full overflow-hidden pt-14 px-6 sm:px-14 min-w-[200px] flex flex-col md:flex-row justify-center items-center gap-8 m-auto">
      {/* FAQ Section */}

      <GlassCard className="rounded-[0px_2em_0px_2em] py-14">
        <div className="w-full md:w-[500px] rounded-xl p-6 text-black dark:text-white">
          <div className="flex justify-center">
            <h2 className="text-heading-3 font-bold flex items-center gap-2">
              <span className="text-primary-500">
                <BiSolidMessageSquareDetail />
              </span>{" "}
              <span className="text-primary-950 dark:text-secondary-500">
                {t("title-askUs")}
              </span>
            </h2>
          </div>
          <form className="mt-4 text-des-2">
            <label className="block text-left font-medium">
              {t("name-input")}
            </label>
            <input
              type="text"
              placeholder={t("name-placeholder")}
              className="w-full text-des-3 p-2 border rounded-lg bg-gray-200 dark:bg-transparent mt-1 mb-3"
            />

            <label className="block text-left font-medium">{t("email")}</label>
            <input
              type="email"
              placeholder={t("email-placeholder")}
              className="w-full text-des-3 p-2 border rounded-lg bg-gray-200 dark:bg-transparent mt-1 mb-3"
            />

            <label className="block text-left font-medium">
              {t("subject")}
            </label>
            <input
              type="text"
              placeholder={t("subject-placeholder")}
              className="w-full text-des-3 p-2 border rounded-lg bg-gray-200 dark:bg-transparent mt-1 mb-3"
            />

            <label className="block text-left font-medium">
              {t("question-ask")}
            </label>
            <textarea
              placeholder={t("question-ask-placeholder")}
              className="w-full text-des-3 p-2 border rounded-lg bg-gray-200 dark:bg-transparent mt-1 mb-3"
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

      {/* Right image */}

      <div className=" w-full flex justify-center md:w-1/2">
        <img
          src="img/contactpage-img/curious-man.svg"
          alt="Contact Us"
        />
      </div>
    </div>
  );
};

export default AskSection;
