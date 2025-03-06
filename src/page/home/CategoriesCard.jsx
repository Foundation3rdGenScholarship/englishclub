import React from "react";
import { useTranslation } from "react-i18next";
import GlassCard from "../../components/card/GlassCard";
export default function CategoriesCard() {
    const { t } = useTranslation("homepage");
  return (
    <div>
      <div className="mt-6">
        <div className="bg-primary-100 w-full h-auto">
          <div className="flex justify-center flex-wrap flex-row gap-4">
            <div>
              <GlassCard>
                <div>
                  <p>{t("listen")}</p>
                  <p></p>
                </div>
              </GlassCard>
            </div>
            <div>
              <GlassCard>
                <div>
                  <p>{t("quiz")}</p>
                  <p></p>
                </div>
              </GlassCard>
            </div>
            <div>
              <GlassCard>
                <div>
                  <p>{t("")}</p>
                  <p></p>
                </div>
              </GlassCard>
            </div>
            <div>
              <GlassCard>
                <div>
                  <p>{t("listen")}</p>
                  <p></p>
                </div>
              </GlassCard>
            </div>
            <div>
              <GlassCard>
                <div>
                  <p>{t("listen")}</p>
                  <p></p>
                </div>
              </GlassCard>
            </div>
            <div>
              <GlassCard>
                <div>
                  <p>{t("listen")}</p>
                  <p></p>
                </div>
              </GlassCard>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
