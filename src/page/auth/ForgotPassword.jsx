import { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FaUser, FaTimes} from "react-icons/fa";
import { fetchUserLogin } from "../../redux/features/user/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { NavLink } from "react-router-dom"; // Assuming you're using React Router for navigation
import "react-toastify/dist/ReactToastify.css";
import forgotpasswordimg from "../../../public/svg/forgotpassword.svg";
import logolightmode from "../../../public/img/logo/logo-light-mode.png";
import logodarkmode from "../../../public/img/logo/logo-dark-mode.png";
import blob from "../../../public/svg/Blob.svg";
import ellipse from "../../../public/svg/Ellipse.svg";
import { useTranslation } from "react-i18next";
const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation("login");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);
  const initialValues = {
    email: ""
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    setLoading(true); // Add this
    dispatch(fetchUserLogin(values))
      .unwrap()
      .then(() => {
        toast.success("Waiting for your 6 digits code");
        setTimeout(() => {
          setLoading(false);
          setSubmitting(false);
          navigate("/");
        }, 1500);
      })
      .catch((error) => {
        console.log("Login error:", error);
        setTimeout(() => {
          setLoading(false);
          setSubmitting(false);
          if (error.message === "User is not verified 😏") {
            toast.error("Please verify your email before logging in.");
          } else {
            toast.error("Incorrect email or password.");
          }
        }, 500);
      });
  };


  const handleGoBack = () => {
    navigate("/");
  };
  return (
    <div className="flex flex-wrap h-screen items-center justify-center bg-white dark:bg-bg-dark-mode">
      {/* Container */}
      <div className="relative flex w-full max-w-8xl overflow-hidden rounded-2xl backdrop-blur-lg  transition-all min-w-[200px]">
        {/* Left - Image (Hidden on Small Screens) */}
        <div className="max-w-7xl w-full flex mx-auto flex-wrap">
          <div className="flex w-full md:w-[40%] md:flex p-4 order-2 md:order-2 lg:order-1 mx-auto">
            <img
              src={forgotpasswordimg}
              alt="Login Illustration"
              className="w-full"
            />
          </div>

          {/* Right - Form */}
          <div className="w-full lg:w-1/2 h-screen flex flex-col justify-center items-center p-4 md:p-8 order-1 md:order-1">
            <div className="w-full max-w-lg bg-white/20 backdrop-blur-md p-6 md:p-8 py-10 rounded-lg shadow-lg dark:bg-gray-800/60">
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
                {t("login")}
              </h2>
              <p className="my-4 text-gray-600 dark:text-gray-400">
                {t(
                  "enter your email for the verification process, we will send 6 digits code to your email."
                )}
              </p>

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
                        htmlFor="email"
                        className="block mb-2 text-des-4 font-medium text-gray-900 dark:text-white"
                      >
                        {t("email")}
                        <span className="text-red-500"> *</span>
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

                    {/* Login Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting || loading}
                      className="w-full rounded-lg bg-primary-500 p-3 font-semibold text-white hover:bg-primary-600 transition duration-300 text-heading-6"
                    >
                      {loading ? t("sending...") : t("send")}
                    </button>
                    {/* Register Link */}
                    <div className="text-center mt-6">
                      <span className="text-gray-600 dark:text-gray-400">
                        {t("don't have an account?")}{" "}
                      </span>
                      <NavLink
                        to="/register" // Replace with your register route
                        className="text-primary-500 hover:text-primary-600 dark:text-primary-400 dark:hover:text-primary-300 underline"
                      >
                        {t("register")}
                      </NavLink>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>

          {/* Blob Image (Hidden on Small Screens) */}
          <div className="absolute w-full md:flex items-center justify-center -z-30 right-[-38%] top-[10%]">
            <img src={blob} alt="blob" />
          </div>
          <div className="absolute w-full md:flex items-center justify-center -z-30 top-[15%] right-[22%] lg:right-[-7%] lg:top-[27%] md:-right-[-30%] md:top-[18%]">
            <img src={ellipse} alt="blob" />
          </div>
          <div className="absolute w-[100px] md:flex items-center justify-center -z-30 top-[54%] right-[-10%] lg:right-[11%] lg:top-[86%] md:-right-[-15%] md:top-[58%]">
            <img src={ellipse} alt="blob" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
