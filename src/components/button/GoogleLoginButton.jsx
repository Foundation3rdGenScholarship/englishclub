import { useState } from "react";
import { useGoogleLogin as useGoogleOAuthLogin } from "@react-oauth/google";
import { useTranslation } from "react-i18next";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useRegisterUserMutation,
  useVerifyEmailMutation,
} from "../../redux/features/user/userSlice";

const GoogleLoginButton = () => {
  const { t } = useTranslation("register");
  const navigate = useNavigate();
  const [registerUser] = useRegisterUserMutation();
  const [verifyEmail] = useVerifyEmailMutation();
  const [loading, setLoading] = useState(false);

  const handleGoogleLoginFailure = (error) => {
    console.error("Login Failed: ", error);
    toast.error(t("Google login failed. Please try again."));
  };

  const googleLogin = useGoogleOAuthLogin({
    onSuccess: async (res) => {
      if (res) {
        setLoading(true);
        toast.info(t("Processing your login... Please wait."));
        const accessToken = res.access_token;
        try {
          const userData = await fetch(
            "https://www.googleapis.com/oauth2/v1/userinfo",
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
                Accept: "application/json",
              },
            }
          ).then((data) => data.json());

          if (userData) {
            if (!userData.verified_email) {
              toast.error(t("Please verify your email with Google first."));
              setLoading(false);
              return;
            }

            const submitValues = {
              email: userData.email,
              username: userData.name,
              password: `${userData.given_name}${
                import.meta.env.VITE_SECRET_KEY
              }`,
              confirm_password: `${userData.given_name}${
                import.meta.env.VITE_SECRET_KEY
              }`,
              profile: userData.picture,
            };

            try {
              await registerUser(submitValues).unwrap();
              await verifyEmail(userData.email).unwrap();
              toast.success(
                t("Registration successful! Redirecting to OTP verification...")
              );
              navigate("/verifyotp", {
                state: {
                  email: userData.email,
                  password: submitValues.password,
                  action: "google-signin",
                },
              });
            } catch (error) {
              console.error("Error signing up with Google: ", error);
              toast.error(t("Sign up failed. Please try again."));
            }
          }
        } catch (error) {
          console.error("Error fetching user data: ", error);
          toast.error(t("Failed to fetch Google user data."));
        } finally {
          setLoading(false);
        }
      }
    },
    onError: handleGoogleLoginFailure,
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
        onClick={() => googleLogin()}
        disabled={loading}
        className={`w-full flex items-center justify-center space-x-3 rounded-lg border border-gray-300 dark:border-gray-600 p-3 text-heading-6 font-semibold text-gray-700 dark:text-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition duration-300 ${
          loading ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        <FcGoogle className="text-2xl" />
        <span className="text-gray-700 dark:text-white">
          {loading ? t("Processing...") : t("sign in with google")}
        </span>
      </button>
    </>
  );
};

export default GoogleLoginButton;
