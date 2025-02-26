import { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { FaUser, FaLock} from "react-icons/fa";
import {
  fetchCreateUser,
} from "../../redux/features/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import signupimg from "../../../public/svg/signup.svg";
import { NavLink } from "react-router"; 
import logolightmode from "../../../public/img/logo/logo-light-mode.png";
import logodarkmode from "../../../public/img/logo/logo-dark-mode.png";
import { useTranslation } from "react-i18next";
import GoogleLoginButton from "../../components/button/GoogleLoginButton";
import { GoogleOAuthProvider } from "@react-oauth/google";
import AuthLayout from "../../components/layout/AuthLayout";
import InputField from "../../components/inputField/InputField";
import SubmitButton from "../../components/button/SubmitButton";
export default function Register() {
  const location = useLocation();
  console.log("location: ", location);
  const email = location?.state?.email;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation("register");
  const strongPasswordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])[A-Za-z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{8,}$/;

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);
  const initialValues = {
    username: "",
    email: "",
    password: "",
    confirm_password: "",
  };

  const validationSchema = Yup.object({
    username: Yup.string().required(t("username is required")),
    email: Yup.string()
      .email(t("invalid email format"))
      .required(t("email is required")),
    password: Yup.string()
      .matches(
        strongPasswordRegex,
        t("password must contain one uppercase letter, one lowercase letter, one special character, a number, and be at least 8 characters long.")
      )
      .required(t("password is required")),
    confirm_password: Yup.string()
      .oneOf(
        [Yup.ref("password"), null],
        t("confirm Password need to be the same as Password!")
      )
      .required(t("Confirm Password is required")),
  });

  const handleSubmit = (values, { resetFrom, setSubmitting }) => {
    setLoading(true);
    setSubmitting(true);
    dispatch(fetchCreateUser(values))
      .unwrap()
      .then(() => {
        toast.success("Sign up Successfully!");
        setTimeout(() => {
          setSubmitting(false);
          navigate("/login", { state: { email } });
        }, 1500);
      })
      .catch((error) => {
        toast.error("Incorrect email or password.");
        setSubmitting(false);
      });
    resetFrom();
  };
  const handleGoogleLogin = () => {
    toast.info("Google Login Clicked");
  };

  const handleGoBack = () => {
    navigate("/");
  };
  const handleGoogleLoginSuccess = (response) => {
    // You can send the response.tokenId to your backend to validate the login
    console.log("Login Success: ", response);
    // After successful login, you can redirect to the dashboard or wherever needed
  };

  const handleGoogleLoginFailure = (error) => {
    console.log("Login Failed: ", error);
    // Handle the failure case, maybe show a toast error
  };
  return (
    <GoogleOAuthProvider clientId="886296695095-1j0sdqc2r8juug5f0f99gdoclir733vm.apps.googleusercontent.com">
      <AuthLayout
        theme={theme}
        logoLightMode={logolightmode}
        logoDarkMode={logodarkmode}
        onGoBack={handleGoBack}
        imageSrc={signupimg} // Pass the custom image
        blobPosition="right-[-38%] top-0 md:top-[3%] md:right-[-30%] lg:right-[-45%] lg:top-[1%]" // Custom blob position for different devices
        ellipse1Position="top-[15%] right-[22%] lg:right-[-7%] lg:top-[27%] md:-right-[-30%] md:top-[18%]" // Custom ellipse position for different devices
        ellipse2Position="top-[54%] right-[-10%] lg:right-[2%] lg:top-[90%] md:-right-[-15%] md:top-[58%] xl:right-[9%]" // Custom ellipse position for different devices
      >
        <h2 className="mb-6 mt-6 text-center text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
          {t("register")}
        </h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-6">
              {/* Username Input */}
              <InputField
                label={t("username")}
                name="username"
                type="username"
                placeholder={t("enter your username")}
                icon={FaUser}
              />
              {/* Email Input */}
              <InputField
                label={t("email")}
                name="email"
                type="email"
                placeholder={t("enter your email")}
                icon={FaUser}
              />

              {/* Password Input */}
              <InputField
                label={t("password")}
                name="password"
                type="password"
                placeholder={t("enter your password")}
                icon={FaLock}
              />
              {/* Confirm Password Input */}
              <InputField
                label={t("confirm password")}
                name="confirm password"
                type="password"
                placeholder={t("enter your confirm password")}
                icon={FaLock}
              />

              {/* Forgot Password Link */}
              <div className="text-right">
                <div class="flex items-center mb-4 text-gray-600 dark:text-gray-400">
                  <input
                    id="privacyPolicy"
                    class="mr-2 cursor-pointer"
                    type="checkbox"
                    value="false"
                    name="privacyPolicy"
                  />
                  <label for="privacyPolicy" class="text-[14px]">
                    {t("I agree to the")}
                    <span class="text-primary-500 hover:text-primary-600 dark:text-primary-400 dark:hover:text-primary-300 underline">
                      {t("privacy policy")}
                    </span>
                  </label>
                </div>
              </div>

              {/* Sign up Button */}
              <SubmitButton
                isSubmitting={isSubmitting}
                loading={loading}
                label={t("sign up")}
                loadingLabel={t("sign up...")}
                disabled={false}
              />
              <GoogleLoginButton
                onSuccess={handleGoogleLoginSuccess}
                onFailure={handleGoogleLoginFailure}
              />
              {/* Register Link */}
              <div className="text-center mt-6">
                <span className="text-gray-600 dark:text-gray-400">
                  {t("already have an account?")}{" "}
                </span>
                <NavLink
                  to="/login" // Replace with your register route
                  className="text-primary-500 hover:text-primary-600 dark:text-primary-400 dark:hover:text-primary-300 underline"
                >
                  {t("login")}
                </NavLink>
              </div>
            </Form>
          )}
        </Formik>
      </AuthLayout>
    </GoogleOAuthProvider>
  );
}
