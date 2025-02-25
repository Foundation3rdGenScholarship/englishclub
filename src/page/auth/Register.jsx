import { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FaUser, FaLock, FaTimes, FaEye, FaEyeSlash } from "react-icons/fa";
import {
  fetchCreateUser,
  selectUser,
} from "../../redux/features/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import signupimg from "../../../public/svg/signup.svg";
import { NavLink } from "react-router";
import logolightmode from "../../../public/img/logo/logo-light-mode.png";
import logodarkmode from "../../../public/img/logo/logo-dark-mode.png";
import blob from "../../../public/svg/Blob.svg";
import ellipse from "../../../public/svg/Ellipse.svg";
import { useTranslation } from "react-i18next";
export default function Register() {
  const location = useLocation();
  console.log("location: ", location);
  const email = location?.state?.email;
  // console.log("useResponse", userResponse);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [cShowPassword, setCShowPassword] = useState(false);
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
        t(
          "password must contain one uppercase letter, one lowercase letter, one special character, a number, and be at least 8 characters long."
        )
      )
      .required(t("password is required")),
    confirm_password: Yup.string()
      .oneOf(
        [Yup.ref("password"), null],
        t("confirm Password need to be the same as Password!")
      )
      .required(t("Confirm Password is required")),
  });
  //  const togglePasswordVisibility = () => {
  //    setShowPassword(!showPassword);
  //  };
  //  const toggleCShowPasswordVisibility = () => {
  //    setCShowPassword(!cShowPassword);
  //  };

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
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <>
      <div className="flex flex-wrap h-screen items-center justify-center bg-white dark:bg-bg-dark-mode">
        {/* Container */}
        <div className="relative flex w-full max-w-8xl overflow-hidden rounded-2xl backdrop-blur-lg  transition-all min-w-[200px]">
          {/* Left - Image (Hidden on Small Screens) */}
          <div className="max-w-7xl w-full flex mx-auto flex-wrap">
            <div className="hidden w-full md:w-[40%] lg:flex p-4 order-2 md:order-2 lg:order-1 mx-auto">
              <img
                src={signupimg}
                alt="Login Illustration"
                className="w-full"
              />
            </div>

            {/* Right - Form */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-4 md:p-8 order-1 md:order-1">
              <div className="w-full max-w-lg bg-white/20 backdrop-blur-md p-6 md:p-8 rounded-lg shadow-lg dark:bg-gray-800/60">
                <div className="flex justify-between">
                  <a href="/">
                    <img
                      src={theme === "light" ? logolightmode : logodarkmode}
                      alt="Logo"
                      className="w-32 md:w-40"
                    />
                  </a>
                  <button
                    onClick={handleGoBack}
                    className="p-2 rounded-full transition duration-300"
                  >
                    <FaTimes className="text-xl text-gray-700 dark:text-gray-300" />
                  </button>
                </div>
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
                      {/* Email Field */}
                      <div className="relative">
                        <label
                          htmlFor="username"
                          className="block mb-2 text-des-4 font-medium text-gray-900 dark:text-white"
                        >
                          {t("username")}
                          <span className="text-red-500"> *</span>
                        </label>
                        <div className="relative">
                          <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-500" />
                          <Field
                            type="text"
                            id="username"
                            name="username"
                            className="w-full bg-white/30 dark:bg-gray-700 px-4 py-3 pl-10 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                            placeholder={t("enter your username")}
                          />
                        </div>
                        <ErrorMessage
                          component="div"
                          name="username"
                          className="text-red-400 text-sm mt-1"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="email"
                          className="block mb-2 text-des-4 font-medium text-gray-900 dark:text-white"
                        >
                          Email<span className="text-red-500"> *</span>
                        </label>
                        <div className="relative">
                          <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-500" />
                          <Field
                            type="email"
                            id="email"
                            name="email"
                            className="w-full bg-white/30 dark:bg-gray-700 px-4 py-3 pl-10 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                            placeholder={t("enter your email")}
                          />
                        </div>
                        <ErrorMessage
                          component="div"
                          name="email"
                          className="text-red-400 text-sm mt-1"
                        />
                      </div>

                      {/* Password Field */}
                      <div className="relative">
                        <label
                          htmlFor="password"
                          className="block mb-2 text-des-4 font-medium text-gray-900 dark:text-white"
                        >
                          {t("password")}
                          <span className="text-red-500"> *</span>
                        </label>
                        <div className="relative">
                          <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400" />
                          <Field
                            type={showPassword ? "text" : "password"}
                            id="password"
                            name="password"
                            className="w-full bg-white/30 dark:bg-gray-700 px-4 py-3 pl-10 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                            placeholder={t("enter your password")}
                          />
                          <button
                            type="button"
                            onClick={toggleShowPassword}
                            className="absolute inset-y-0 right-1 pr-3 flex items-center text-xl leading-5 text-gray-500 dark:text-gray-40 "
                          >
                            {showPassword ? <FaEye /> : <FaEyeSlash />}
                          </button>
                        </div>
                        <ErrorMessage
                          name="password"
                          component="div"
                          className="text-red-400 text-sm mt-1"
                        />
                      </div>

                      {/* Confirm Password Field */}
                      <div className="relative">
                        <label
                          htmlFor="password"
                          className="block mb-2 text-des-4 font-medium text-gray-900 dark:text-white"
                        >
                          {t("confirm password")}
                          <span className="text-red-500"> *</span>
                        </label>
                        <div className="relative">
                          <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400" />
                          <Field
                            type={showPassword ? "text" : "password"}
                            id="confirmPassword"
                            name="confirmPassword"
                            className="w-full bg-white/30 dark:bg-gray-700 px-4 py-3 pl-10 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                            placeholder={t("enter your confirm password")}
                          />
                          <button
                            type="button"
                            onClick={toggleShowPassword}
                            className="absolute inset-y-0 right-1 pr-3 flex items-center text-xl leading-5 text-gray-500 dark:text-gray-40 "
                          >
                            {showPassword ? <FaEye /> : <FaEyeSlash />}
                          </button>
                        </div>
                        <ErrorMessage
                          name="confirmPassword"
                          component="div"
                          className="text-red-400 text-sm mt-1"
                        />
                      </div>

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

                      {/* Login Button */}
                      <button
                        type="submit"
                        disabled={isSubmitting || loading}
                        className="w-full rounded-lg bg-primary-500 p-3 font-semibold text-white hover:bg-primary-600 transition duration-300 text-heading-6"
                      >
                        {loading ? t("signing up...") : t("sign up")}
                      </button>

                      {/* Google Login Button */}
                      <div className="relative flex items-center my-4">
                        <div className="flex-grow border-t border-gray-300 dark:border-gray-600"></div>
                        <span className="px-3 text-gray-500 dark:text-gray-400">
                          {t("or")}
                        </span>
                        <div className="flex-grow border-t border-gray-300 dark:border-gray-600"></div>
                      </div>

                      <button
                        type="button"
                        onClick={handleGoogleLogin}
                        className="w-full flex items-center justify-center space-x-3 rounded-lg border border-gray-300 dark:border-gray-600 p-3 text-heading-6 font-semibold text-gray-700 dark:text-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition duration-300"
                      >
                        <FcGoogle className="text-2xl" />
                        <span className="text-gray-700 dark:text-white">
                          {t("sign in with google")}
                        </span>
                      </button>

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
              </div>
            </div>

            {/* Blob Image (Hidden on Small Screens) */}
            <div className="absolute w-full md:flex items-center justify-center -z-30 right-[-38%] top-0 md:top-[3%] md:right-[-30%] lg:right-[-45%] lg:top-[1%]">
              <img src={blob} alt="blob" />
            </div>
            <div className="absolute w-full md:flex items-center justify-center -z-30 top-[15%] right-[22%] lg:right-[-7%] lg:top-[27%] md:-right-[-30%] md:top-[18%]">
              <img src={ellipse} alt="blob" />
            </div>
            <div className="absolute w-[100px] md:flex items-center justify-center -z-30 top-[54%] right-[-10%] lg:right-[2%] lg:top-[90%] md:-right-[-15%] md:top-[58%] xl:right-[9%]">
              <img src={ellipse} alt="blob" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
