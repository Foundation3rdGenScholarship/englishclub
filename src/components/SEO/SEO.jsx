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
          content="FluentFlow is an English learning platform for Khmer learners with bilingual support. It offers interactive lessons, AI assistance, and engaging exercises. Users can learn through videos, infographics, and personalized experiences. Start learning English easily and effectively today!"
        />

        {/* OpenGraph Tags */}
        <meta
          property="og:title"
          content="FluentFlow - English Learning Platform"
        />
        <meta
          property="og:description"
          content="FluentFlow is an English learning platform for Khmer learners with bilingual support. It offers interactive lessons, AI assistance, and engaging exercises. Users can learn through videos, infographics, and personalized experiences. Start learning English easily and effectively today!"
        />
        <meta
          name="keywords"
          content="online courses, e-learning, interactive learning, FluentFlow, skill development, online education, personalized learning, expert instructors, fluentflow istad, istad"
        />
        <meta
          property="og:image"
          content="https://english-club.istad.co/files/72f17752-207f-4f59-9823-881278713c6d.png"
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
          content="FluentFlow is an English learning platform for Khmer learners with bilingual support. It offers interactive lessons, AI assistance, and engaging exercises. Users can learn through videos, infographics, and personalized experiences. Start learning English easily and effectively today!"
        />
        <meta
          name="twitter:image"
          content="https://english-club.istad.co/files/72f17752-207f-4f59-9823-881278713c6d.png"
        />
        <meta name="twitter:site" content="@FluentFlow" />
      </Helmet>
    </div>
  );
};

export default SEO;
