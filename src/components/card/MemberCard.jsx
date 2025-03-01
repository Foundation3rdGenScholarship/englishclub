import React from "react";
import { useTranslation } from "react-i18next";
import ericImg from "../../../public/img/teamwork-img/eric.JPG";
import oudomImg from "../../../public/img/teamwork-img/oudom.jpg";
import leapheaImg from "../../../public/img/teamwork-img/leaphea.jpg";
import vuthyImg from "../../../public/img/teamwork-img/vuthy.jpg";
import boraImg from "../../../public/img/teamwork-img/bora.jpg";
import rotanaImg from "../../../public/img/teamwork-img/rotana.jpg";
import { FaLinkedinIn } from "react-icons/fa";
export default function MemberCard() {
  const { t } = useTranslation("about");
  return (
    // Memeber Card
    <div>
        <p>
            {t("oudom")}
        </p>
    </div>
    );
}
