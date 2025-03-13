import React from "react";
import { Helmet } from "react-helmet";

const SEO = () => {
  return (
    <div>
      <Helmet>
        {/* Standard Meta Tags */}
        <title>FluentFlow - English Learning Platform</title>
        <meta
          name="description"
          content="FluentFlow is your gateway to mastering new skills with interactive online courses. Learn at your own pace with expert instructors, hands-on projects, and personalized learning paths. Start your journey today!"
        />

        {/* OpenGraph Tags */}
        <meta
          property="og:title"
          content="FluentFlow - English Learning Platform"
        />
        <meta
          property="og:description"
          content="FluentFlow is your gateway to mastering new skills with interactive online courses. Learn at your own pace with expert instructors, hands-on projects, and personalized learning paths. Start your journey today!"
        />
        <meta
          name="keywords"
          content="online courses, e-learning, interactive learning, FluentFlow, skill development, online education, personalized learning, expert instructors, fluentflow istad, istad"
        />
        <meta
          property="og:image"
          content="../../../public/img/image/Main-Picture.png"
        />
        <meta property="og:url" content="https://fluentflow.live" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="FluentFlow" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta
          property="og:image:alt"
          content="FluentFlow - English Learning Platform"
        />

        {/* Twitter Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="FluentFlow - English Learning Platform"
        />
        <meta
          name="twitter:description"
          content="FluentFlow is your gateway to mastering new skills with interactive online courses. Learn at your own pace with expert instructors, hands-on projects, and personalized learning paths. Start your journey today!"
        />
        <meta
          name="twitter:image"
          content="../../../public/img/image/Main-Picture.png"
        />
        <meta name="twitter:site" content="@FluentFlow" />
      </Helmet>
    </div>
  );
};

export default SEO;
