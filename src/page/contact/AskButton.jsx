import GlassCard from "../../components/card/GlassCard";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { BiSolidMessageSquareDetail } from "react-icons/bi";
import { useTranslation } from "react-i18next";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AskSection = () => {
  const { t } = useTranslation("contact");
  // formik
  const initialValues = {
    name: "",
    email: "",
    subject: "",
    question: "",
  };
  const validationSchema = Yup.object({
    name: Yup.string().required(t("required-name")),
    email: Yup.string().email("Invalid email").required(t("required-email")),
    subject: Yup.string().required(t("required-subject")),
    question: Yup.string().required(t("required-question")),
  });
  // const handleSubmit = (values, { setSubmitting, resetForm }) => {
  //   console.log("Form Data:", values);
  //   resetForm();
  //   setSubmitting(false);
  // };
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    console.log("Form Data:", values);
  
    // Show loading toast
    const loadingToast = toast.loading(t("submitting"));
  
    // Simulate a delay (just to show the loading effect)
    await new Promise((resolve) => setTimeout(resolve, 2000));
  
    // Remove loading toast and show success message
    toast.dismiss(loadingToast);
    toast.success(t("submit-success"));
  
    resetForm(); 
    setSubmitting(false); // Stop loading state
  };
  
  return (
    <div className="max-w-7xl w-full overflow-hidden pt-14 px-6 sm:px-14 min-w-[200px] flex flex-col md:flex-row justify-center items-center gap-8 m-auto">
      {/* FAQ Section */}

      <GlassCard className="rounded-[0px_2em_0px_2em] py-14">
        <div className="w-full md:w-[500px] rounded-xl p-6 text-black dark:text-white">
          <div className="flex justify-center">
            <h2 className="text-heading-3 font-bold flex items-center gap-2">
              <span className="text-primary-500">
                <BiSolidMessageSquareDetail />
              </span>{" "}
              <span className="text-primary-950 dark:text-secondary-500">
                {t("title-askUs")}
              </span>
            </h2>
          </div>
          {/*Using Formik/ */}
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
           {({ isSubmitting, errors, touched }) => (
        <Form className="mt-4 text-des-2">
          {/* Name Field */}
          <label className="block text-left font-medium">{t("name-input")}</label>
          <Field
            type="text"
            name="name"
            placeholder={t("name-placeholder")}
            className={`w-full text-des-3 p-2 border rounded-lg bg-gray-200 dark:bg-transparent mt-1 ${
              errors.name && touched.name ? "border-red-500" : ""
            }`}
          />
          <ErrorMessage name="name" component="div" className="text-red-500 text-sm mb-3" />

          {/* Email Field */}
          <label className="block text-left font-medium">{t("email")}</label>
          <Field
            type="email"
            name="email"
            placeholder={t("email-placeholder")}
            className={`w-full text-des-3 p-2 border rounded-lg bg-gray-200 dark:bg-transparent mt-1 ${
              errors.email && touched.email ? "border-red-500" : ""
            }`}
          />
          <ErrorMessage name="email" component="div" className="text-red-500 text-sm mb-3" />

          {/* Subject Field */}
          <label className="block text-left font-medium">{t("subject")}</label>
          <Field
            type="text"
            name="subject"
            placeholder={t("subject-placeholder")}
            className={`w-full text-des-3 p-2 border rounded-lg bg-gray-200 dark:bg-transparent mt-1 ${
              errors.subject && touched.subject ? "border-red-500" : ""
            }`}
          />
          <ErrorMessage name="subject" component="div" className="text-red-500 text-sm mb-3" />

          {/* Question Field */}
          <label className="block text-left font-medium">{t("question-ask")}</label>
          <Field
            as="textarea"
            name="question"
            placeholder={t("question-ask-placeholder")}
            className={`w-full text-des-3 p-2 border rounded-lg bg-gray-200 dark:bg-transparent mt-1 ${
              errors.question && touched.question ? "border-red-500" : ""
            }`}
          />
          <ErrorMessage name="question" component="div" className="text-red-500 text-sm mb-3" />

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`bg-secondary-500 text-white px-5 py-2 rounded-lg focus:ring-4 focus:outline-none focus:ring-secondary-200 font-medium flex ml-auto mt-3 ${
              isSubmitting ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isSubmitting ? t("btn-submitting") : t("btn-submit")}
          </button>
        </Form>
      )}
          </Formik>
        </div>
      </GlassCard>

      {/* Right image */}

      <div className=" w-full flex justify-center md:w-1/2">
        <img src="img/contactpage-img/curious-man.svg" alt="Contact Us" />
      </div>
    </div>
  );
};

export default AskSection;
