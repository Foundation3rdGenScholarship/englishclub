import { useState, useEffect, useCallback } from "react";
import {
  IoVolumeHigh,
  IoSwapHorizontal,
  IoClose,
  IoCopyOutline,
  IoCheckmarkOutline,
  IoLanguage,
  IoTimeOutline,
  IoChevronDown,
  IoTrashOutline,
  IoStarOutline,
  IoStar,
} from "react-icons/io5";
import { SiGoogletranslate } from "react-icons/si";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

// Expanded language options for better user experience
const languages = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "km", name: "Khmer", flag: "🇰🇭" },
];

const MAX_CHAR_COUNT = 5000;
const MAX_HISTORY_ITEMS = 15;

const LangTranslate = () => {
  const [sourceLang, setSourceLang] = useState("en");
  const [targetLang, setTargetLang] = useState("km");
  const [inputText, setInputText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isTranslating, setIsTranslating] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [characterCount, setCharacterCount] = useState(0);
  const [isSourceDropdownOpen, setIsSourceDropdownOpen] = useState(false);
  const [isTargetDropdownOpen, setIsTargetDropdownOpen] = useState(false);
  const [translationHistory, setTranslationHistory] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);
  const { t } = useTranslation("soundtts");

  // Auto-detect language functionality
  const [isAutoDetect, setIsAutoDetect] = useState(false);
  const [detectedLanguage, setDetectedLanguage] = useState("");

  // Memoized language search functionality
  const [searchTerm, setSearchTerm] = useState("");
  const filteredLanguages = languages.filter((lang) =>
    lang.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isSourceDropdownOpen || isTargetDropdownOpen) {
        const dropdowns = document.querySelectorAll(".language-dropdown");
        let clickedInside = false;

        dropdowns.forEach((dropdown) => {
          if (dropdown.contains(event.target)) {
            clickedInside = true;
          }
        });

        if (!clickedInside) {
          setIsSourceDropdownOpen(false);
          setIsTargetDropdownOpen(false);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isSourceDropdownOpen, isTargetDropdownOpen]);

  // Swap languages (memoized with useCallback)
  const swapLanguages = useCallback(() => {
    if (isAutoDetect) {
      setIsAutoDetect(false);
      setSourceLang(targetLang);
    } else {
      setSourceLang(targetLang);
      setTargetLang(sourceLang);
    }
    setInputText(translatedText);
    setTranslatedText(inputText);
  }, [isAutoDetect, sourceLang, targetLang, inputText, translatedText]);

  // Clear input text
  const clearInput = useCallback(() => {
    setInputText("");
    setTranslatedText("");
    setCharacterCount(0);
    setDetectedLanguage("");
  }, []);

  // Copy translation to clipboard
  const copyToClipboard = useCallback(() => {
    if (!translatedText.trim()) return;

    navigator.clipboard.writeText(translatedText);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
    toast.success(t("Copied to clipboard!"), {
      position: "bottom-center",
      autoClose: 1500,
      hideProgressBar: true,
    });
  }, [translatedText, t]);

  // Load translation history and favorites from localStorage
  useEffect(() => {
    try {
      const savedHistory = localStorage.getItem("translationHistory");
      if (savedHistory) {
        setTranslationHistory(JSON.parse(savedHistory));
      }

      const savedFavorites = localStorage.getItem("translationFavorites");
      if (savedFavorites) {
        setFavorites(JSON.parse(savedFavorites));
      }
    } catch (error) {
      console.error("Error loading from localStorage:", error);
      // Reset if corrupted
      localStorage.removeItem("translationHistory");
      localStorage.removeItem("translationFavorites");
    }
  }, []);

  // Update character count
  useEffect(() => {
    setCharacterCount(inputText.length);

    // Clear translation when input is empty
    if (!inputText.trim()) {
      setTranslatedText("");
      setDetectedLanguage("");
    }
  }, [inputText]);

  // Debounced translate function with useCallback for performance
  const translateText = useCallback(async () => {
    if (!inputText.trim()) {
      setIsTranslating(false);
      setTranslatedText("");
      return;
    }

    if (inputText.length > MAX_CHAR_COUNT) {
      toast.warning(t("Text exceeds maximum character limit"));
      return;
    }

    // Add a period to the end of the text for translation purposes if it doesn't end with punctuation
    const textForTranslation = addPeriodIfNeeded(inputText);

    // For auto-detect we use 'auto' as source language
    const actualSourceLang = isAutoDetect ? "auto" : sourceLang;

    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${actualSourceLang}&tl=${targetLang}&dt=t&dt=ld&q=${encodeURIComponent(
      textForTranslation
    )}`;

    try {
      setIsTranslating(true);
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }

      const data = await response.json();

      // Extract translated text
      const result = data[0].map((item) => item[0]).join(" ");

      // Try to extract detected language if auto-detect is on
      if (isAutoDetect && data[2]) {
        const detectedCode = data[2];
        const detected = languages.find((lang) => lang.code === detectedCode);
        setDetectedLanguage(detected ? detected.name : detectedCode);
      }

      setTranslatedText(result);

      // Save to history if successful and not empty
      if (result.trim()) {
        saveToHistory(inputText, result, actualSourceLang, targetLang);
      }
    } catch (error) {
      console.error("Translation error:", error);
      toast.error(t("Failed to translate. Please try again!"));
    } finally {
      setIsTranslating(false);
    }
  }, [inputText, sourceLang, targetLang, isAutoDetect, t]);

  // Function to add a period if the text doesn't end with punctuation
  const addPeriodIfNeeded = (text) => {
    const trimmedText = text.trim();
    if (!trimmedText) return "";

    // Check if the text already ends with a punctuation mark
    const lastChar = trimmedText.slice(-1);
    const punctuationMarks = [
      ".",
      "!",
      "?",
      "។",
      ",",
      ";",
      ":",
      "-",
      ")",
      "]",
      "}",
      '"',
      "'",
    ];

    if (punctuationMarks.includes(lastChar)) {
      return trimmedText;
    } else {
      return trimmedText + ".";
    }
  };

  // Save to history (extracted as separate function)
  const saveToHistory = (
    sourceText,
    translatedText,
    sourceLangCode,
    targetLangCode
  ) => {
    // Check if this exact translation already exists in history
    const existingEntryIndex = translationHistory.findIndex(
      (item) =>
        item.sourceText.toLowerCase() === sourceText.toLowerCase() &&
        item.sourceLang === sourceLangCode &&
        item.targetLang === targetLangCode
    );

    if (existingEntryIndex !== -1) {
      // Update existing entry timestamp to move it to top
      const updatedHistory = [...translationHistory];
      const existingEntry = updatedHistory.splice(existingEntryIndex, 1)[0];
      existingEntry.timestamp = new Date().toISOString();
      updatedHistory.unshift(existingEntry);
      setTranslationHistory(updatedHistory);
      localStorage.setItem(
        "translationHistory",
        JSON.stringify(updatedHistory)
      );
    } else {
      // Add new entry
      const newHistoryItem = {
        id: Date.now(),
        sourceText,
        translatedText,
        sourceLang: sourceLangCode,
        targetLang: targetLangCode,
        timestamp: new Date().toISOString(),
      };

      const updatedHistory = [newHistoryItem, ...translationHistory].slice(
        0,
        MAX_HISTORY_ITEMS
      );
      setTranslationHistory(updatedHistory);
      localStorage.setItem(
        "translationHistory",
        JSON.stringify(updatedHistory)
      );
    }
  };

  // Auto-translate with debouncing
  useEffect(() => {
    const translateTimer = setTimeout(() => {
      if (inputText.trim()) {
        translateText();
      } else {
        setIsTranslating(false);
      }
    }, 800); // Increased debounce time for better UX

    return () => clearTimeout(translateTimer);
  }, [inputText, translateText]);

  // Speak text using browser's speech synthesis
  const speakText = useCallback(() => {
    if (!translatedText.trim()) {
      toast.error(t("No text to read. Please translate first!"));
      return;
    }

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    setIsSpeaking(true);
    const speech = new SpeechSynthesisUtterance(inputText);
    speech.lang = targetLang;
    speech.rate = 0.9; // Slightly slower for better clarity

    speech.onend = () => {
      setIsSpeaking(false);
    };

    speech.onerror = () => {
      setIsSpeaking(false);
      toast.error(
        t("Speech synthesis failed. Try again or use a different browser.")
      );
    };

    window.speechSynthesis.speak(speech);
  }, [translatedText, targetLang, t]);

  // Use history item
  const useHistoryItem = useCallback(
    (item) => {
      if (isAutoDetect) setIsAutoDetect(false);
      setSourceLang(item.sourceLang);
      setTargetLang(item.targetLang);
      setInputText(item.sourceText);
      setTranslatedText(item.translatedText);
      setCharacterCount(item.sourceText.length);
      setIsHistoryOpen(false);
    },
    [isAutoDetect]
  );

  // Delete history item
  const deleteHistoryItem = useCallback(
    (id, e) => {
      e.stopPropagation();
      const updatedHistory = translationHistory.filter(
        (item) => item.id !== id
      );
      setTranslationHistory(updatedHistory);
      localStorage.setItem(
        "translationHistory",
        JSON.stringify(updatedHistory)
      );

      // Also remove from favorites if present
      const updatedFavorites = favorites.filter((itemId) => itemId !== id);
      if (updatedFavorites.length !== favorites.length) {
        setFavorites(updatedFavorites);
        localStorage.setItem(
          "translationFavorites",
          JSON.stringify(updatedFavorites)
        );
      }
    },
    [translationHistory, favorites]
  );

  // Toggle favorite status
  const toggleFavorite = useCallback(
    (id, e) => {
      e.stopPropagation();

      if (favorites.includes(id)) {
        const updatedFavorites = favorites.filter((favId) => favId !== id);
        setFavorites(updatedFavorites);
        localStorage.setItem(
          "translationFavorites",
          JSON.stringify(updatedFavorites)
        );
      } else {
        const updatedFavorites = [...favorites, id];
        setFavorites(updatedFavorites);
        localStorage.setItem(
          "translationFavorites",
          JSON.stringify(updatedFavorites)
        );
      }
    },
    [favorites]
  );

  // Format relative time with optimization for recent items
  const formatRelativeTime = useCallback((timestamp) => {
    const now = new Date();
    const past = new Date(timestamp);
    const diffInSeconds = Math.floor((now - past) / 1000);

    if (diffInSeconds < 60) return `${diffInSeconds}s ago`;
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400)
      return `${Math.floor(diffInSeconds / 3600)}h ago`;
    if (diffInSeconds < 604800)
      return `${Math.floor(diffInSeconds / 86400)}d ago`;

    // For older items, show the actual date
    return past.toLocaleDateString();
  }, []);

  // Get language by code with null safety
  const getLanguage = useCallback((code) => {
    return (
      languages.find((lang) => lang.code === code) || {
        code: "unknown",
        name: "Unknown",
        flag: "🌐",
      }
    );
  }, []);

  // Filter history by favorites if needed
  const filteredHistory = showFavorites
    ? translationHistory.filter((item) => favorites.includes(item.id))
    : translationHistory;

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Alt+S to swap languages
      if (e.altKey && e.key === "s") {
        swapLanguages();
        e.preventDefault();
      }

      // Alt+C to copy translated text
      if (e.altKey && e.key === "c") {
        copyToClipboard();
        e.preventDefault();
      }

      // Alt+X to clear input
      if (e.altKey && e.key === "x") {
        clearInput();
        e.preventDefault();
      }

      // Alt+H to toggle history
      if (e.altKey && e.key === "h") {
        setIsHistoryOpen(!isHistoryOpen);
        e.preventDefault();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [swapLanguages, copyToClipboard, clearInput, isHistoryOpen]);

  return (
    <div className="p-4 sm:ml-64 mt-[60px] max-w-screen-3xl mx-auto flex flex-col items-center justify-center">
      <div className="p-6">
        <h1 className="text-4xl font-bold relative z-10 flex items-center justify-center gap-2">
          {/* <SiGoogletranslate className="text-3xl text-primary-500" /> */}
          <span className="text-primary-500">{t("Language")}</span>
          <span className="text-secondary-500">{t("Translator")}</span>
        </h1>
      </div>

      <div className="w-full max-w-4xl bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700">
        {/* Top bar with language selectors and swap button */}
        <div className="flex justify-between items-center px-6 py-4 bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-gray-700 dark:to-gray-700 border-b border-gray-200 dark:border-gray-600">
          {/* Source language dropdown */}
          <div className="relative language-dropdown">
            <button
              className="flex items-center px-4 py-2 bg-white dark:bg-gray-700 rounded-lg shadow-sm hover:shadow-md transition-all"
              onClick={() => {
                setIsSourceDropdownOpen(!isSourceDropdownOpen);
                setIsTargetDropdownOpen(false);
              }}
              aria-expanded={isSourceDropdownOpen}
              aria-controls="source-language-dropdown"
            >
              {isAutoDetect ? (
                <span className="font-medium text-gray-700 dark:text-white flex items-center">
                  <span className="text-xl mr-2">🌐</span>
                  {t("Auto Detect")}
                  {detectedLanguage && ` (${detectedLanguage})`}
                </span>
              ) : (
                <>
                  <span className="text-xl mr-2">
                    {getLanguage(sourceLang).flag}
                  </span>
                  <span className="font-medium text-gray-700 dark:text-white">
                    {t(getLanguage(sourceLang).name)}
                  </span>
                </>
              )}
              <IoChevronDown
                className={`ml-2 transition-transform text-gray-600 dark:text-white ${
                  isSourceDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {isSourceDropdownOpen && (
              <div
                id="source-language-dropdown"
                className="absolute top-full left-0 mt-1 bg-white dark:bg-gray-700 rounded-lg shadow-lg border border-gray-100 dark:border-gray-600 z-10 w-64"
              >
                {/* Auto-detect option */}
                <button
                  className={`flex items-center w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-600 ${
                    isAutoDetect ? "bg-primary-50 dark:bg-primary-900/30" : ""
                  }`}
                  onClick={() => {
                    setIsAutoDetect(true);
                    setIsSourceDropdownOpen(false);
                    setSearchTerm("");
                  }}
                >
                  <span className="text-xl mr-2">🌐</span>
                  <span className="font-medium text-gray-700 dark:text-white">
                    {t("Auto Detect")}
                  </span>
                </button>

                {/* Languages list */}
                <div className="max-h-60 overflow-y-auto">
                  {filteredLanguages.map((lang) => (
                    <button
                      key={lang.code}
                      className={`flex items-center w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-600 ${
                        !isAutoDetect && sourceLang === lang.code
                          ? "bg-primary-50 dark:bg-primary-500 text-gray-700"
                          : ""
                      }`}
                      onClick={() => {
                        setSourceLang(lang.code);
                        setIsAutoDetect(false);
                        setIsSourceDropdownOpen(false);
                        setSearchTerm("");
                      }}
                    >
                      <span className="text-xl mr-2">{lang.flag}</span>
                      <span className="font-medium text-gray-700 dark:text-white">
                        {t(lang.name)}
                      </span>
                    </button>
                  ))}

                  {filteredLanguages.length === 0 && (
                    <div className="px-4 py-2 text-gray-500 dark:text-gray-400 text-center">
                      {t("No languages found")}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Swap button */}
          <button
            onClick={swapLanguages}
            className="p-3 bg-white dark:bg-gray-700 text-primary-600 dark:text-primary-400 rounded-full shadow-md hover:shadow-lg transition-all relative group"
            aria-label="Swap languages"
            title={t("Swap languages (Alt+S)")}
          >
            <IoSwapHorizontal className="text-lg" />
            <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-700 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              Alt+S
            </span>
          </button>

          {/* Target language dropdown */}
          <div className="relative language-dropdown">
            <button
              className="flex items-center px-4 py-2 bg-white dark:bg-gray-700 rounded-lg shadow-sm hover:shadow-md transition-all"
              onClick={() => {
                setIsTargetDropdownOpen(!isTargetDropdownOpen);
                setIsSourceDropdownOpen(false);
              }}
              aria-expanded={isTargetDropdownOpen}
              aria-controls="target-language-dropdown"
            >
              <span className="text-xl mr-2">
                {getLanguage(targetLang).flag}
              </span>
              <span className="font-medium text-gray-700 dark:text-white">
                {t(getLanguage(targetLang).name)}
              </span>
              <IoChevronDown
                className={`ml-2 transition-transform text-gray-600 dark:text-white ${
                  isTargetDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {isTargetDropdownOpen && (
              <div
                id="target-language-dropdown"
                className="absolute top-full right-0 mt-1 bg-white dark:bg-gray-700 rounded-lg shadow-lg border border-gray-100 dark:border-gray-600 z-10 w-64"
              >
                <div className="max-h-60 overflow-y-auto">
                  {filteredLanguages.map((lang) => (
                    <button
                      key={lang.code}
                      className={`flex items-center w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-600 ${
                        targetLang === lang.code
                          ? "bg-secondary-50 dark:bg-primary-500"
                          : ""
                      }`}
                      onClick={() => {
                        setTargetLang(lang.code);
                        setIsTargetDropdownOpen(false);
                        setSearchTerm("");
                      }}
                    >
                      <span className="text-xl mr-2">{lang.flag}</span>
                      <span className="font-medium text-gray-700 dark:text-white">
                        {t(lang.name)}
                      </span>
                    </button>
                  ))}

                  {filteredLanguages.length === 0 && (
                    <div className="px-4 py-2 text-gray-500 dark:text-gray-400 text-center">
                      {t("No languages found")}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Source Language Input */}
            <div className="flex-1 space-y-3">
              <div className="relative">
                <textarea
                  className="w-full p-4 h-48 bg-gray-50 dark:bg-gray-700/80 rounded-lg border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-primary-400 dark:focus:ring-primary-600 focus:border-transparent resize-none text-gray-800 dark:text-gray-100"
                  placeholder={t("Enter text to translate...")}
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  maxLength={MAX_CHAR_COUNT}
                  aria-label={t("Source text")}
                />

                <div className="absolute bottom-3 right-3 flex items-center gap-2">
                  {inputText && (
                    <div className="flex gap-2">
                      <button
                        onClick={clearInput}
                        className="p-1.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 bg-white/90 dark:bg-gray-600/90 rounded-full hover:bg-white dark:hover:bg-gray-600 transition-all group relative"
                        aria-label={t("Clear text")}
                        title={t("Clear text (Alt+X)")}
                      >
                        <IoClose className="text-lg" />
                        <span className="absolute -bottom-8 right-0 bg-gray-700 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                          Alt+X
                        </span>
                      </button>
                      <button
                        onClick={speakText}
                        disabled={isSpeaking}
                        className={`p-1.5 text-primary-600 dark:text-primary-400 bg-white/90 dark:bg-gray-600/90 rounded-full hover:bg-white dark:hover:bg-gray-600 transition-all ${
                          isSpeaking ? "animate-pulse" : ""
                        }`}
                        aria-label={t("Listen to translation")}
                        title={t("Listen to translation")}
                      >
                        <IoVolumeHigh className="text-lg" />
                      </button>
                    </div>
                  )}

                  <div
                    className={`text-xs ${
                      characterCount > MAX_CHAR_COUNT * 0.9
                        ? "text-red-500"
                        : "text-gray-500 dark:text-gray-400"
                    } bg-white/90 dark:bg-gray-600/90 py-1 px-2 rounded-full`}
                  >
                    {characterCount} / {MAX_CHAR_COUNT}
                  </div>
                </div>
              </div>
            </div>

            {/* Target Language Output */}
            <div className="flex-1 space-y-3">
              <div className="relative">
                <textarea
                  className="w-full p-4 h-48 bg-gray-50 dark:bg-gray-700/80 rounded-lg border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-primary-400 dark:focus:ring-primary-600 focus:border-transparent resize-none text-gray-800 dark:text-gray-100"
                  value={translatedText}
                  readOnly
                  aria-label={t("Translated text")}
                />

                {isTranslating && (
                  <div
                    className="absolute inset-0 flex items-center justify-center bg-gray-50/90 dark:bg-gray-700/90 rounded-lg backdrop-blur-sm"
                    aria-live="polite"
                  >
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 border-3 border-primary-500 border-t-transparent rounded-full animate-spin mb-2"></div>
                      <div className="text-sm text-primary-600 dark:text-primary-300 font-medium">
                        {t("Translating...")}
                      </div>
                    </div>
                  </div>
                )}

                {translatedText && !isTranslating && (
                  <div className="absolute bottom-3 right-3 flex items-center gap-2">
                    <button
                      onClick={copyToClipboard}
                      className="p-1.5 text-primary-600 dark:text-primary-400 bg-white/90 dark:bg-gray-600/90 rounded-full hover:bg-white dark:hover:bg-gray-600 transition-all group relative"
                      aria-label={t("Copy translation")}
                      title={t("Copy translation (Alt+C)")}
                    >
                      {isCopied ? (
                        <IoCheckmarkOutline className="text-lg" />
                      ) : (
                        <IoCopyOutline className="text-lg" />
                      )}
                      <span className="absolute -bottom-8 right-0 bg-gray-700 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                        Alt+C
                      </span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Footer with history button */}
        <div className="px-6 py-3 bg-gray-50 dark:bg-gray-700/50 border-t border-gray-200 dark:border-gray-600 flex items-center justify-between">
          <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            {t("Powered by Google Translate API")}
          </div>

          <button
            onClick={() => setIsHistoryOpen(!isHistoryOpen)}
            className="flex items-center gap-1 px-3 py-1.5 bg-white dark:bg-gray-600 rounded-lg shadow-sm hover:shadow-md transition-all text-sm text-gray-700 dark:text-gray-200"
          >
            <IoTimeOutline className="text-primary-500" />
            {t("history")}
          </button>
        </div>
      </div>

      {/* Translation History Panel */}
      {isHistoryOpen && (
        <div className="w-full max-w-4xl mt-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden">
          <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600 flex justify-between items-center">
            <h3 className="font-medium text-gray-700 dark:text-white flex items-center gap-2">
              <IoTimeOutline className="text-primary-500" />
              {t("Recent Translations")}
            </h3>
            <button
              onClick={() => setIsHistoryOpen(false)}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white"
            >
              <IoClose />
            </button>
          </div>

          <div className="max-h-64 overflow-y-auto">
            {translationHistory.length === 0 ? (
              <div className="p-6 text-center text-gray-500 dark:text-gray-400">
                {t("No translation history yet")}
              </div>
            ) : (
              translationHistory.map((item) => (
                <div
                  key={item.id}
                  className="p-3 border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer transition-colors"
                  onClick={() => useHistoryItem(item)}
                >
                  <div className="flex justify-between items-start mb-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm">
                        {getLanguage(item.sourceLang).flag}
                      </span>
                      <span className="text-sm font-medium text-gray-800 dark:text-gray-200 truncate max-w-xs">
                        {item.sourceText}
                      </span>
                    </div>
                    <span className="text-xs text-gray-400">
                      {formatRelativeTime(item.timestamp)}
                    </span>
                  </div>
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-2">
                      <span className="text-sm">
                        {getLanguage(item.targetLang).flag}
                      </span>
                      <span className="text-sm text-gray-600 dark:text-gray-300 truncate max-w-xs">
                        {item.translatedText}
                      </span>
                    </div>
                    <button
                      onClick={(e) => deleteHistoryItem(item.id, e)}
                      className="text-gray-400 hover:text-red-500 dark:hover:text-red-400 text-sm"
                      aria-label="Delete history item"
                    >
                      <IoClose />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default LangTranslate;
