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
//           {/* Image (Hidden on 's' and 'sm', visible on 'md' and larger) */}
//           <img
//             className="hidden md:block w-full max-w-[350px] md:max-w-[450px]"
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
import GlassCard from "../../components/card/GlassCard";
import education from "../../../public/img/iconSVG/education.svg";
import { useTranslation } from "react-i18next";
import React from "react";

export default function VissionCard() {
  const { t } = useTranslation("about");

  return (
    <div className="flex justify-center p-4">
      <GlassCard className="w-full max-w-[1100px] p-5 md:h-[380px]">
        <div className="flex flex-col md:flex-row items-center justify-between p-3 gap-6">
          {/* Text Content */}
          <div className="text-center md:text-left flex-1">
            <h2 className="text-xl md:text-2xl font-bold text-accents-color">
              {t("ourvision")}
            </h2>
            <p className="text-base md:text-lg text-[#666666] dark:text-white mt-3">
              {t("vision-description")}
            </p>
          </div>

          {/* Image (Floats right on medium screens and larger) */}
          <img
            className="hidden md:block w-full max-w-[350px] md:max-w-[450px] md:ml-auto"
            src={education}
            loading="lazy"
            alt="Vision"
          />
        </div>
      </GlassCard>
    </div>
  );
}
