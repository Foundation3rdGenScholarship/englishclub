// import GlassCard from "./GlassCard";
// import education from "../../../public/img/iconSVG/education.svg";
// import { useTranslation } from "react-i18next";
// import React from 'react';

// export default function VissionCard() {
//   const { t } = useTranslation("about");

//   return (
//     <div className="flex justify-center p-4">
//       <GlassCard className="w-full max-w-[1100px] p-5 md:h-[380px]">
//         <div className="flex flex-col md:flex-row items-center justify-center p-3 gap-6">
//           {/* Image */}
//           <img
//             className="w-full max-w-[350px] md:max-w-[450px]"
//             src={education}
//             alt="Vision"
//           />

//           {/* Text Content */}
//           <div className="text-center md:text-left">
//             <h2 className="text-xl md:text-2xl font-bold text-accents-color">
//               {t("ourvision")}
//             </h2>
//             <p className="text-base md:text-lg text-[#666666] dark:text-white mt-3">
//               {t("vision-description")}
//             </p>
//           </div>
//         </div>
//       </GlassCard>
//     </div>
//   );
// }

import React from "react";
import GlassCard from "./GlassCard";
import vissionIcon from "../../../public/img/iconSVG/education.svg";
import { useTranslation } from "react-i18next";

export default function MissionCard() {
  const { t } = useTranslation("about");

  return (
    <div className="flex justify-center p-4">
      <GlassCard className="w-full max-w-[1100px] p-5 md:h-[380px]">
        <div className="flex flex-col md:flex-row items-center justify-center p-3 gap-6">
          {/* Image */}
          <img
            className="w-full max-w-[350px] md:max-w-[450px] float-right"
            src={vissionIcon}
            alt="Mission"
          />

          {/* Text Content */}
          <div className="text-center md:text-left">
            <h2 className="text-xl md:text-2xl font-bold text-accents-color">
              {t("ourvision")}
            </h2>
            <p className="text-base md:text-lg text-[#666666] dark:text-white mt-3">
              {t("vision-description")}
            </p>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}
