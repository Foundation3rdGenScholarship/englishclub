import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { IoMdClose } from "react-icons/io";

const Announcement = () => {
  const { t } = useTranslation("announcement");
  const storageKey = "announcement_closed_date";
  const [isVisible, setIsVisible] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const lastClosed = localStorage.getItem(storageKey);
    const today = new Date().toDateString();

    // Show announcement if storage is empty or closed date is different from today
    if (!lastClosed || lastClosed !== today) {
      setIsVisible(true);
    }

    // Add scroll event listener
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClose = () => {
    const today = new Date().toDateString();
    localStorage.setItem(storageKey, today);
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div
      className={`bg-primary-950 px-4 py-3 text-white sticky top-0 transition-transform duration-300 ${
        isScrolled ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <div className="max-w-7xl flex items-center m-auto">
        <div className="flex-grow text-center">
          <p className="text-sm font-medium">
            {t("title")}
            <a href="/skills" className="inline-block underline ml-1">
              {t("link")}
            </a>
          </p>
        </div>

        <button
          onClick={handleClose}
          aria-label="Close"
          className="shrink-0 rounded-lg bg-black/10 p-1 transition hover:bg-black/20 xl:mr-4"
        >
          <IoMdClose />
        </button>
      </div>
    </div>
  );
};

export default Announcement;
