import { useState } from "react";
import { useGoogleLogin as useGoogleOAuthLogin } from "@react-oauth/google";
import { useTranslation } from "react-i18next";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import {
  useRegisterUserMutation,
  useLoginUserMutation,
  useVerifyEmailMutation,
} from "../../redux/features/user/userSlice";
import { getAccessToken, storeAccessToken } from "../../lib/secureLocalStorage";
import { login } from "../../redux/features/user/authSlice";
const GoogleLoginButton = () => {
  const { t } = useTranslation("register");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [registerUser] = useRegisterUserMutation();
  const [loginUser] = useLoginUserMutation();
  const [verifyEmail] = useVerifyEmailMutation();
  const [loading, setLoading] = useState(false);

  const handleGoogleLoginFailure = (error) => {
    toast.error(t("Google login failed. Please try again."));
  };

  const googleLogin = useGoogleOAuthLogin({
    onSuccess: async (res) => {
      if (res) {
        setLoading(true);
        toast.info(t("Processing your login... Please wait!"));
        const accessToken = res.access_token;

        try {
          // Fetch user data from Google
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
              toast.error(t("Please verify your email first!"));
              setLoading(false);
              return;
            }

            // Attempt to log in the user using the Google OAuth password format
            try {
              const loginResponse = await loginUser({
                email: userData.email,
                password: `${userData.given_name}${
                  import.meta.env.VITE_SECRET_KEY
                }`,
              }).unwrap();

              if (loginResponse?.access_token) {
                // User exists, log them in
                storeAccessToken(loginResponse.access_token); // Store the access token
                dispatch(
                  login({
                    user: loginResponse.user,
                    token: loginResponse.access_token,
                  })
                ); // Dispatch login action
                toast.success(t("Login successful! Redirecting..."));
                navigate("/userprofile"); // Redirect to the user profile page
              }
            } catch (loginError) {
              // If login fails, check if the email is already registered
              if (
                loginError.status === 400 &&
                loginError.data?.detail === "Email already registered"
              ) {
                // Email is already registered, log the user in directly
                toast.info(t("Email already registered. Logging you in..."));
                const loginResponse = await loginUser({
                  email: userData.email,
                  password: `${userData.given_name}${
                    import.meta.env.VITE_SECRET_KEY
                  }`,
                }).unwrap();

                if (loginResponse?.access_token) {
                  storeAccessToken(loginResponse.access_token);
                  dispatch(
                    login({
                      user: loginResponse.user,
                      token: loginResponse.access_token,
                    })
                  );
                  toast.success(t("Login successful! Redirecting..."));
                  navigate("/userprofile");
                }
              } else {
                // If the email is not registered, register the user
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

                // Register the new user
                await registerUser(submitValues).unwrap();
                await verifyEmail(userData.email).unwrap();

                toast.success(
                  t(
                    "Registration successful! Redirecting to OTP verification..."
                  )
                );
                navigate("/verifyotp", {
                  state: {
                    email: userData.email,
                    password: submitValues.password,
                    action: "google-signin",
                  },
                });
              }
            }
          }
        } catch (error) {
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
