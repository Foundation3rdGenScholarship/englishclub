import GlassCard from "../../components/card/GlassCard";
import questionGuy from "../../../public/svg/questioning.svg";
import { BiSolidMessageSquareDetail } from "react-icons/bi";
import { useTranslation } from "react-i18next";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AOS from "aos";
import "aos/dist/aos.css";
import React, { useEffect } from "react";
import emailjs from "@emailjs/browser";

const AskSection = () => {
  const { t } = useTranslation("contact");
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: false,
      // mirror: true,
    });
  }, []);
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

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    const templateParams = {
      name: values.name,
      email: values.email,
      subject: values.subject,
      message: values.question, // This will map to {{message}} in your template
    };
  
    try {
      const response = await emailjs.send(
        "service_fluentflow", // Replace with your actual Service ID
        "template_fluentflow", // Replace with your actual Template ID
        templateParams,
        { publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY } // Public Key as an object
      );
  
      console.log("SUCCESS!", response.status, response.text);
      toast.success("Your question has been submitted!");
      resetForm();
    } catch (error) {
      console.error("FAILED...", error);
      toast.error("Something went wrong!");
    } finally {
      setSubmitting(false); // Ensure loading state stops whether success or failure
    }
  };

  return (
    <div id="ask-question">
      <div
        className="flex flex-col md:flex-row justify-center items-center gap-8 mx-auto"
        data-aos="fade-up"
        data-aos-delay="100"
      >
        {/* FAQ Section */}

        <GlassCard className="flex rounded-[0px_2em_0px_2em] shadow-sm  py-14 order-2 md:order-1">
          <div className="w-[380px] md:w-[500px] rounded-xl p-6 text-black dark:text-white">
            <div className="flex justify-center ">
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
                <Form className="mt-4 text-des-2 leading-loose text-left">
                  {/* Name */}
                  <label className="block text-left font-medium">
                    {t("name-input")}
                  </label>
                  <Field
                    type="text"
                    name="name"
                    placeholder={t("name-placeholder")}
                    className={`w-full text-des-3 p-3 border rounded-lg bg-gray-200 dark:bg-transparent mt-1 placeholder-gray-400 dark:placeholder-gray-500 ${
                      errors.name && touched.name ? "border-red-500" : ""
                    }`}
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-red-500 text-sm mb-3 mt-2"
                  />

                  {/* Email  */}
                  <label className="block text-left font-medium">
                    {t("email")}
                  </label>
                  <Field
                    type="email"
                    name="email"
                    placeholder={t("email-placeholder")}
                    className={`w-full text-des-3 p-3 border rounded-lg bg-gray-200 dark:bg-transparent mt-1 placeholder-gray-400 dark:placeholder-gray-500 ${
                      errors.email && touched.email ? "border-red-500" : ""
                    }`}
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500 text-sm mb-3 mt-2"
                  />

                  {/* Subject */}
                  <label className="block text-left font-medium">
                    {t("subject")}
                  </label>
                  <Field
                    type="text"
                    name="subject"
                    placeholder={t("subject-placeholder")}
                    className={`w-full text-des-3 p-3 border rounded-lg bg-gray-200 dark:bg-transparent mt-1 placeholder-gray-400 dark:placeholder-gray-500 ${
                      errors.subject && touched.subject ? "border-red-500" : ""
                    }`}
                  />
                  <ErrorMessage
                    name="subject"
                    component="div"
                    className="text-red-500 text-sm mb-3 mt-2"
                  />

                  {/* Question */}
                  <label className="block text-left font-medium">
                    {t("question-ask")}
                  </label>
                  <Field
                    as="textarea"
                    name="question"
                    placeholder={t("question-ask-placeholder")}
                    className={`w-full text-des-3 p-3 border rounded-lg bg-gray-200 dark:bg-transparent mt-1 placeholder-gray-400 dark:placeholder-gray-500 ${
                      errors.question && touched.question
                        ? "border-red-500"
                        : ""
                    }`}
                  />
                  <ErrorMessage
                    name="question"
                    component="div"
                    className="text-red-500 text-sm mb-3"
                  />

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`bg-secondary-500 text-white px-5 w-full justify-center py-2 rounded-lg focus:ring-4 focus:outline-none focus:ring-secondary-200 font-medium flex ml-auto mt-3 ${
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

        <div className=" w-full flex lg:flex md:hidden justify-center md:w-1/2 order-1 md:order-2">
          <img src={questionGuy} alt="Contact Us" />
        </div>
      </div>
    </div>
  );
};

export default AskSection;
