import { useState, useEffect } from "react";
import { RiUserVoiceFill } from "react-icons/ri";
import { IoSwapHorizontal } from "react-icons/io5";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import axios from "axios";

const languages = [
  { code: "en", name: "English" },
  { code: "km", name: "Khmer" },
];

const LangTranslate = () => {
  const [sourceLang, setSourceLang] = useState("en");
  const [targetLang, setTargetLang] = useState("km");
  const [inputText, setInputText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [isSpeaking, setIsSpeaking] = useState(false);
  const { t } = useTranslation("soundtts");

  // Swap languages
  const swapLanguages = () => {
    setSourceLang(targetLang);
    setTargetLang(sourceLang);
  };

  // Auto-translate
  useEffect(() => {
    const translateText = async () => {
      if (!inputText.trim()) {
        setTranslatedText("");
        return;
      }

      // Add a period to the end of the text for translation purposes if it doesn't end with punctuation
      const textForTranslation = addPeriodIfNeeded(inputText);

      const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sourceLang}&tl=${targetLang}&dt=t&q=${encodeURIComponent(
        textForTranslation
      )}`;

      try {
        const response = await fetch(url);
        const data = await response.json();
        setTranslatedText(data[0].map((item) => item[0]).join(" "));
      } catch (error) {
        toast.error(t("Failed to translate. Please try again!"));
      }
    };

    translateText();
  }, [inputText, sourceLang, targetLang, t]);

  // Function to add a period if the text doesn't end with punctuation
  const addPeriodIfNeeded = (text) => {
    const trimmedText = text.trim();
    if (!trimmedText) return "";

    // Check if the text already ends with a punctuation mark
    const lastChar = trimmedText.slice(-1);
    const punctuationMarks = [
      "",
    ];

    if (punctuationMarks.includes(lastChar)) {
      return trimmedText;
    } else {
      return trimmedText + ".";
    }
  };

  // Speak text using browser's speech synthesis
  const speakText = async () => {
    if (!translatedText.trim()) {
      alert("No text to read. Please translate first.");
      return;
    }
    setIsSpeaking(true);
    const speech = new SpeechSynthesisUtterance(translatedText);
    speech.lang = targetLang;

    speech.onend = () => {
      setIsSpeaking(false);
    };

    window.speechSynthesis.speak(speech);
  };

  return (
    <div className="p-4 sm:ml-64 mt-[88px]">
      <div className="bg-transparent flex items-center justify-center p-4 sm:p-6">
        <div className="rounded-xl w-full max-w-4xl p-6 md:p-8">
          <h1 className="text-3xl md:text-4xl font-bold text-center text-primary-500 mb-6 md:mb-8 dark:text-white">
            {t("Language")}{" "}
            <span className="text-3xl md:text-4xl font-bold text-center text-secondary-500">
              {t("Translator")}
            </span>
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-lg font-semibold text-gray-700 dark:text-white">
                  ពី:
                </label>
                <select
                  className="p-2 border border-secondary-500 rounded-lg dark:bg-bg-dark-mode dark:text-white focus:outline-none focus:ring-1 focus:ring-secondary-200 focus:border-secondary-500"
                  value={sourceLang}
                  onChange={(e) => setSourceLang(e.target.value)}
                >
                  {languages.map((lang) => (
                    <option key={lang.code} value={lang.code}>
                      {t(lang.name)}
                    </option>
                  ))}
                </select>
              </div>
              <textarea
                className="w-full p-4 border border-secondary-500 rounded-lg dark:bg-bg-dark-mode dark:text-white focus:outline-none focus:ring-1 focus:ring-secondary-200 focus:border-secondary-500 h-56 resize-none"
                placeholder={t("Enter text to translate...")}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
              ></textarea>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-lg font-semibold text-gray-700 dark:text-white">
                  ទៅ:
                </label>
                <select
                  className="p-2 border border-secondary-500 rounded-lg dark:bg-bg-dark-mode dark:text-white focus:outline-none focus:ring-1 focus:ring-secondary-200 focus:border-secondary-500"
                  value={targetLang}
                  onChange={(e) => setTargetLang(e.target.value)}
                >
                  {languages.map((lang) => (
                    <option key={lang.code} value={lang.code}>
                      {t(lang.name)}
                    </option>
                  ))}
                </select>
              </div>
              <textarea
                className="w-full p-4 border border-secondary-500 rounded-lg dark:bg-bg-dark-mode dark:text-white focus:outline-none focus:ring-1 focus:ring-secondary-200 focus:border-secondary-500 h-56 resize-none"
                value={translatedText}
                readOnly
              ></textarea>
            </div>
          </div>

          <div className="flex justify-center gap-6 mt-6 md:mt-8">
            <button
              onClick={swapLanguages}
              className="p-3 md:p-4 bg-primary-500 text-white rounded-full hover:bg-primary-600 transition-transform transform hover:scale-110"
              aria-label="Swap languages"
            >
              <IoSwapHorizontal className="text-xl" />
            </button>
            <button
              onClick={speakText}
              disabled={isSpeaking}
              className="p-3 md:p-4 bg-secondary-500 text-white rounded-full hover:bg-secondary-600 transition-transform transform hover:scale-110 disabled:bg-green-300"
              aria-label="Listen to translation"
            >
              <RiUserVoiceFill className="text-xl" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LangTranslate;
