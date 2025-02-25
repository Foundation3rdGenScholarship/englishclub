import { useTranslation } from "react-i18next";

export function skillForSidebar() {
  const { t } = useTranslation("dashboard");

  const menu = [
    {
      title: t("reading"),
      path: "",
    },
    {
      title: t("listening"),
      path: "",
    },
    {
      title: t("writing"),
      path: "",
    },
    {
      title: t("speaking"),
      paht: "",
    },
  ];

  return menu; // 🔥 Return the array so it can be used in other files
}

export default skillForSidebar;
