import React from "react";
import GlassCard from "../../components/card/GlassCard";
import { useTranslation } from "react-i18next";
import vector1 from "../../../public/img/vextor/Vector19.svg";
import vector2 from "../../../public/img/vextor/Vector20.svg";
import cherPheng from "../../../public/img/image/cherPheng.png";
import cherDavan from "../../../public/img/image/cherDavan.png";
const AboutUsMain = () => {
  const { t } = useTranslation("about");
  return (
    <>
      <section className="">
        <div>
          <img
            src={vector2}
            alt=""
            className="absolute mt-[54px] w-[445px] h-[762px]  right-0 "
          />
        </div>
        <div>
          <img
            src={vector1}
            alt=""
            className="absolute mt-[147px] w-[755px] h-[581px] left-0 "
          />
        </div>
        <div className="justify-items-center">
          <GlassCard className="relative top-[194px] w-[1205px] h-[429px]">
            <div className="text-center ">
              <div className="text-[32px] mt-11 font-bold">{t("title")}</div>
              <div className="text-[24px] p-4 text-gray-600">
                {t("description")}
              </div>
            </div>
          </GlassCard>
        </div>
      </section>
      <section className="mt-[500px]">
        <div>
          <p className="text-center text-blue-700  font-bold text-heading-4">
            {t("mentor")}
          </p>
        </div>
        <div className="flex justify-center mt-12">
          <div className="rounded-tl-[40px] rounded-br-[40px] bg-accents-color ">
            <p className="pt-2 pb-2 py-16 px-16 text-center font-bold text-heading-5 text-white">
              {t("cherPheng")}
            </p>
          </div>
        </div>
        <div className="flex justify-center">
          <img className="w-72" src={cherPheng} alt="" />
        </div>
      </section>
    </>
  );
};
export default AboutUsMain;
