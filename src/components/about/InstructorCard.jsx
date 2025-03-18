import React from "react";

const InstructorCard = ({ name, role, quote, image }) => {
  return (
    <div className="relative p-6 rounded-2xl backdrop-blur-lg border border-white/20 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl overflow-hidden">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
        <div className="w-32 h-32 rounded-xl overflow-hidden border-2 border-white/20 flex-shrink-0">
          <img src={image} alt={name} className="w-full h-full object-cover" />
        </div>

        <div className="flex-1 text-center md:text-left">
          <h3 className="text-2xl font-bold mb-1 text-primary-500 dark:text-white">{name}</h3>
          <p className="text-blue-500 dark:text-blue-400 font-medium mb-4">
            {role}
          </p>
          <p className="text-lg italic mb-5">{quote}</p>

          <div className="flex justify-center md:justify-start gap-3 mt-4">
            <a
              href="#"
              className="w-10 h-10 rounded-full flex items-center justify-center bg-white/10 backdrop-blur-sm transition-all hover:-translate-y-1 hover:bg-blue-500 hover:text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
              </svg>
            </a>
            <a
              href="#"
              className="w-10 h-10 rounded-full flex items-center justify-center bg-white/10 backdrop-blur-sm transition-all hover:-translate-y-1 hover:bg-blue-500 hover:text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
            </a>
            <a
              href="#"
              className="w-10 h-10 rounded-full flex items-center justify-center bg-white/10 backdrop-blur-sm transition-all hover:-translate-y-1 hover:bg-blue-500 hover:text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-5 right-5 w-16 h-16 opacity-20">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          height="100%"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 21a9 9 0 0 1-9-9 9 9 0 0 1 9-9 9 9 0 0 1 9 9 9 9 0 0 1-9 9zm0-18a9 9 0 0 0-9 9 9 9 0 0 0 9 9 9 9 0 0 0 9-9 9 9 0 0 0-9-9z"></path>
          <path d="M12 12v.01"></path>
          <path d="M8 12v.01"></path>
          <path d="M16 12v.01"></path>
        </svg>
      </div>
    </div>
  );
};

const InstructorsPage = () => {
  const instructors = [
    {
      name: "Mom Reksmey",
      role: "Instructor - Leader, Data Analysis",
      quote: "Do it because they said you couldn't.",
      image:
        "https://preview.keenthemes.com/metronic-v4/theme/assets/pages/media/profile/profile_user.jpg", // Replace with actual image path
    },
    {
      name: "Kim Chansokpheng",
      role: "Instructor - Leader, Cybersecurity",
      quote: "Be humble",
      image:
        "https://media.licdn.com/dms/image/v2/D5622AQG8WDij4ZWFXg/feedshare-shrink_800/B56ZQ.iPnVHQAo-/0/1736215952473?e=2147483647&v=beta&t=KJUkAbtAefsXN_9tugKi4lMieJkWjB3YffFHglp830I", // Replace with actual image path
    },
  ];

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {instructors.map((instructor, index) => (
            <div
              key={index}
              className={`${
                index % 2 === 0
                  ? "bg-gradient-to-br from-blue-500/10 to-green-500/10"
                  : "bg-gradient-to-br from-indigo-500/10 to-pink-500/10"
              } dark:from-blue-500/15 dark:to-green-500/15 dark:from-indigo-500/15 dark:to-pink-500/15`}
            >
              <InstructorCard {...instructor} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InstructorsPage;
