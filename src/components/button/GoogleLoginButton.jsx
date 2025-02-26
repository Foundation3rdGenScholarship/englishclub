import { GoogleLogin, useGoogleLogin } from "@react-oauth/google";
import { useTranslation } from "react-i18next";
import { FcGoogle } from "react-icons/fc";
const GoogleLoginButton = ({ onSuccess }) => {
  const { t } = useTranslation("register");

  const login = useGoogleLogin({
    onSuccess,
    onError: (error) => console.error(error),
  });

  return (
    <>
      <div className="relative items-center my-4">
        <div className="flex justify-center items-center my-4">
          <div className="flex-grow border-t border-gray-300 dark:border-gray-600"></div>
          <span className="px-3 text-gray-500 dark:text-gray-400">
            {t("or")}
          </span>
          <div className="flex-grow border-t border-gray-300 dark:border-gray-600"></div>
        </div>
      </div>

      <button
        type="button"
        onClick={login}
        className="w-full flex items-center justify-center space-x-3 rounded-lg border border-gray-300 dark:border-gray-600 p-3 text-heading-6 font-semibold text-gray-700 dark:text-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition duration-300"
      >
        <FcGoogle className="text-2xl" />
        <span className="text-gray-700 dark:text-white">
          {t("sign in with google")}
        </span>
      </button>
    </>
  );
};

export default GoogleLoginButton;
