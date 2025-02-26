import { useTranslation } from "react-i18next";

export function skillForSidebar() {
  const { t } = useTranslation("dashboard");

  const menu = [
    {
      title: t("reading"),
      path: "/reading",
      active: () => "reading",
      text: "reading",
    },
    {
      title: t("listening"),
      path: "#",
      active: () => "listening",
      text: "listening",
    },
    {
      title: t("writing"),
      path: "#",
      active: () => "writing",
      text: "writing",
    },
    {
      title: t("speaking"),
      paht: "#",
      active: () => "speaking",
      text: "speaking",
    },
  ];

  return menu; // 🔥 Return the array so it can be used in other files
}

export default skillForSidebar;
