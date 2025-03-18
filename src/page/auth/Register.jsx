import { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik"; // Import ErrorMessage
import * as yup from "yup";
import { FaUser, FaLock, FaEnvelope } from "react-icons/fa";
import { useNavigate } from "react-router";
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
import { useRegisterUserMutation } from "../../redux/features/user/userSlice";
import Modal from "../../components/modal/Modal"; // Import the Modal component

export default function Register() {
  const navigate = useNavigate();
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const { t } = useTranslation("register");
  const [registerUser, { isLoading }] = useRegisterUserMutation();
  const clientId = import.meta.env.VITE_GOOGLE_OAUTH_CLIENT_ID;
  const strongPasswordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])[A-Za-z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{8,}$/;

  // State for modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [privacyPolicyAccepted, setPrivacyPolicyAccepted] = useState(false);

  const initialValues = {
    username: "",
    email: "",
    password: "",
    confirm_password: "",
    privacyPolicy: false,
  };

  const validationSchema = yup.object({
    username: yup.string().required(t("username is required")),
    email: yup
      .string()
      .email(t("invalid email format"))
      .required(t("email is required")),
    password: yup
      .string()
      .matches(
        strongPasswordRegex,
        t(
          "password must contain one uppercase letter, one lowercase letter, one special character, a number, and be at least 8 characters long."
        )
      )
      .required(t("password is required")),
    confirm_password: yup
      .string()
      .oneOf(
        [yup.ref("password"), null],
        t("confirm Password need to be the same as Password!")
      )
      .required(t("Confirm Password is required")),
    privacyPolicy: yup
      .boolean()
      .oneOf([true], t("You must accept the privacy policy"))
      .required(t("You must accept the privacy policy")),
  });

  const handleSubmit = async (values, { setSubmitting, setTouched }) => {
    try {
      // Mark the privacyPolicy field as touched
      setTouched({
        privacyPolicy: true,
      });

      // Check if privacyPolicy is accepted
      if (!values.privacyPolicy) {
        setIsModalOpen(true); // Show modal if checkbox is not checked
        setSubmitting(false); // Prevent form submission
        return; // Exit the function early
      }

      // Remove the `privacyPolicy` field from the payload before API call
      const { privacyPolicy, ...payload } = values;

      // Register the user
      await registerUser(payload).unwrap();
      toast.success(t("Sign up Successfully!"));
      navigate("/login");
    } catch (error) {
      toast.error(t("Sign up failed. Please try again."));
      if (error.data && error.data.detail) {
        toast.error(error.data.detail);
      } else {
        toast.error(t("Sign up failed. Please try again."));
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoBack = () => {
    navigate("/");
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <AuthLayout
        theme={theme}
        logoLightMode={logolightmode}
        logoDarkMode={logodarkmode}
        onGoBack={handleGoBack}
        imageSrc={signupimg}
        blobPosition="right-[-38%] top-0 md:top-[3%] md:right-[-30%] lg:right-[-45%] lg:top-[1%]"
        ellipse1Position="top-[25%] right-[88%] lg:right-[42%] lg:top-[27%] md:-right-[-77%] md:top-[25%]"
        ellipse2Position="top-[90%] right-[-10%] lg:right-[2%] lg:top-[90%] md:-right-[-13%] md:top-[88%] xl:right-[9%]"
      >
        <h2 className="mb-6 mt-6 text-center text-2xl md:text-3xl font-bold text-primary-500 dark:text-white">
          {t("register")}
        </h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-[18.5px] max-h-screen">
              {/* Username and Email in One Line */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Username Input */}
                <InputField
                  label={t("username")}
                  name="username"
                  type="text"
                  placeholder={t("enter your username")}
                  icon={FaUser}
                />

                {/* Email Input */}
                <InputField
                  label={t("email")}
                  name="email"
                  type="email"
                  placeholder={t("enter your email")}
                  icon={FaEnvelope}
                />
              </div>

              {/* Password Inputs */}
              <div className="space-y-4">
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
                  name="confirm_password"
                  type="password"
                  placeholder={t("enter your confirm password")}
                  icon={FaLock}
                />
              </div>

              {/* Privacy Policy Checkbox */}
              <div>
                <div className="flex items-center mb-2 text-gray-600 dark:text-gray-400 cursor-pointer">
                  <Field
                    id="privacyPolicy"
                    className="mr-2 cursor-pointer"
                    type="checkbox"
                    name="privacyPolicy"
                  />
                  <label
                    htmlFor="privacyPolicy"
                    className="text-[14px]"
                    onClick={() => setIsModalOpen(true)}
                  >
                    {t("I agree to the")}{" "}
                    <span className="text-primary-500 hover:text-primary-600 dark:text-primary-400 dark:hover:text-primary-300 underline">
                      {t("privacy policy")}
                    </span>
                  </label>
                </div>
                {/* Display validation error for privacyPolicy */}
                <ErrorMessage
                  name="privacyPolicy"
                  component="div"
                  className="text-red-400 text-sm"
                />
              </div>

              {/* Sign up Button */}
              <SubmitButton
                isSubmitting={isSubmitting || isLoading}
                label={t("sign up")}
                loadingLabel={t("sign up...")}
                disabled={isSubmitting || isLoading}
              />

              {/* Google Login Button */}
              <GoogleLoginButton />

              {/* Login Link */}
              <div className="text-center mt-6">
                <span className="text-gray-600 dark:text-gray-400">
                  {t("already have an account?")}{" "}
                </span>
                <NavLink
                  to="/login"
                  className="text-primary-500 hover:text-primary-600 dark:text-primary-400 dark:hover:text-primary-300 underline"
                >
                  {t("login")}
                </NavLink>
              </div>
            </Form>
          )}
        </Formik>
      </AuthLayout>
      {/* Privacy Policy Modal */}
      <Modal
        onAccept={() => {
          setPrivacyPolicyAccepted(true); // Mark the policy as accepted
        }}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={t("Privacy Policy")}
      >
        <p className="mb-4">{t("main-description")}</p>

        <h4 className="text-md font-semibold mt-4 mb-2">
          {t("main-description-1")}
        </h4>
        <p className="mb-4">{t("description-1")}</p>

        <h4 className="text-md font-semibold mt-4 mb-2">
          {t("main-description-2")}
        </h4>
        <p className="mb-4">{t("description-2")}</p>

        <h4 className="text-md font-semibold mt-4 mb-2">
          {t("main-description-3")}
        </h4>
        <p className="mb-4">{t("description-3")}</p>

        <h4 className="text-md font-semibold mt-4 mb-2">
          {t("main-description-4")}
        </h4>
        <p className="mb-4">{t("description-4")}</p>

        <h4 className="text-md font-semibold mt-4 mb-2">
          {t("main-description-5")}
        </h4>
        <p className="mb-4">{t("description-5")}</p>

        <h4 className="text-md font-semibold mt-4 mb-2">
          {t("main-description-6")}
        </h4>
        <p className="mb-4">{t("description-6")}</p>

        <p className="mt-6">{t("description-7")}</p>
      </Modal>
    </GoogleOAuthProvider>
  );
}
