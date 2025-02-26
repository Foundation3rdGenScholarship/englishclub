import { useTranslation } from "react-i18next";

export function grammarForSidebar() {
  const { t } = useTranslation("dashboard");

  const grammar = [
    {
      title: t("a1a2grammar"),
      path: "",
      active: () => "a1a2grammar",
      text: "a1a2grammar",
    },
    {
      title: t("b1b2grammar"),
      path: "",
      active: () => "b1b2grammar",
      text: "b1b2grammar",
    },
    {
      title: t("c1grammar"),
      path: "",
      active: () => "c1grammar",
      text: "c1grammar",
    },
    {
      title: t("moreDoc"),
      path: "",
      active: () => "moreDoc",
      text: "moreDoc",
    },
  ];

  return grammar; // 🔥 Return the array so it can be used in other files
}

export default grammarForSidebar;
