import React from "react";
import { Helmet } from "react-helmet";

const SEO = () => {
  return (
    <div>
      <Helmet>
        {/* Favicon & Icons */}
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="shortcut icon"
          href="https://english-club.istad.co/files/535f885d-a6d5-4a0e-a4e3-65d7a6a0785f.png"
        />

        {/* Standard Meta Tags */}
        <title>FluentFlow - English Learning Platform</title>
        <meta
          name="description"
          content="FluentFlow is an innovative English learning platform designed specifically for Khmer learners. With bilingual support (English & Khmer), interactive lessons, and AI-powered assistance, users can improve their English skills through engaging exercises, videos, and infographics. Start learning English easily and effectively today!"
        />
        <meta
          name="keywords"
          content="English learning, AI learning, FluentFlow, Khmer English learning, online courses, bilingual learning, skill development,fluentflow istad, istad, istad fluentflow,fluentflow"
        />
        <meta name="author" content="FluentFlow Team" />
        <meta name="robots" content="index, follow" />

        {/* Mobile & Performance Optimization */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#4F46E5" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="mobile-web-app-capable" content="yes" />

        {/* Alternate Language for International SEO */}
        <link rel="alternate" hreflang="en" href="https://fluentflow.live/" />
        <link
          rel="alternate"
          hreflang="km"
          href="https://fluentflow.live/km/"
        />

        {/* OpenGraph Meta Tags (Facebook, LinkedIn) */}
        <meta
          property="og:title"
          content="FluentFlow - English Learning Platform"
        />
        <meta
          property="og:description"
          content="FluentFlow is an innovative English learning platform designed specifically for Khmer learners. With bilingual support (English & Khmer), interactive lessons, and AI-powered assistance, users can improve their English skills through engaging exercises, videos, and infographics. Start learning English easily and effectively today!"
        />
        <meta
          property="og:image"
          content="https://english-club.istad.co/files/72f17752-207f-4f59-9823-881278713c6d.png"
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta
          property="og:image:alt"
          content="FluentFlow - AI-powered English learning platform"
        />
        <meta property="og:url" content="https://fluentflow.live" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="FluentFlow" />
        <meta property="og:locale" content="en_US" />

        {/* Twitter Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="FluentFlow - English Learning Platform"
        />
        <meta
          name="twitter:description"
          content="FluentFlow is an innovative English learning platform designed specifically for Khmer learners. With bilingual support (English & Khmer), interactive lessons, and AI-powered assistance, users can improve their English skills through engaging exercises, videos, and infographics. Start learning English easily and effectively today!"
        />
        <meta
          name="twitter:image"
          content="https://english-club.istad.co/files/72f17752-207f-4f59-9823-881278713c6d.png"
        />
        <meta name="twitter:site" content="@FluentFlow" />
        <meta name="twitter:creator" content="@FluentFlow" />

        {/* AI Chatbots & Voice Assistant SEO */}
        <meta
          name="google-assistant-voice-title"
          content="Learn English with FluentFlow"
        />
        <meta
          name="google-assistant-voice-description"
          content="Improve your English skills with AI-powered lessons and exercises on FluentFlow."
        />

        {/* Canonical URL */}
        <link rel="canonical" href="https://fluentflow.live" />

        {/* Structured Data - WebSite Schema */}
        <script type="application/ld+json">
          {`
        {
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "FluentFlow",
            "url": "https://fluentflow.live",
            "description": "FluentFlow is an innovative English learning platform designed specifically for Khmer learners. With bilingual support (English & Khmer), interactive lessons, and AI-powered assistance, users can improve their English skills through engaging exercises, videos, and infographics. Start learning English easily and effectively today!",
            "image": "https://english-club.istad.co/files/72f17752-207f-4f59-9823-881278713c6d.png",
            "potentialAction": {
                "@type": "SearchAction",
                "target": "https://fluentflow.live/search?q={search_term_string}",
                "query-input": "required name=search_term_string"
            }
        }
    `}
        </script>

        {/* Structured Data - Organization Schema */}
        <script type="application/ld+json">
          {`
        {
            "@context": "https://schema.org",
            "@type": "EducationalOrganization",
            "name": "FluentFlow",
            "url": "https://fluentflow.live",
            "logo": "https://english-club.istad.co/files/535f885d-a6d5-4a0e-a4e3-65d7a6a0785f.png",
            "sameAs": [
                "https://www.facebook.com/FluentFlow",
                "https://twitter.com/FluentFlow",
                "https://www.linkedin.com/company/fluentflow"
            ],
            "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+855 93 990 910",
                "contactType": "customer service"
            }
        }
    `}
        </script>

        {/* Breadcrumb Structured Data */}
        <script type="application/ld+json">
          {`
        {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
                {
                    "@type": "ListItem",
                    "position": 1,
                    "name": "Home",
                    "item": "https://fluentflow.live"
                },
                {
                    "@type": "ListItem",
                    "position": 2,
                    "name": "Courses",
                    "item": "https://fluentflow.live/courses"
                },
                {
                    "@type": "ListItem",
                    "position": 3,
                    "name": "About us",
                    "item": "https://fluentflow.live/about"
                },
                {
                    "@type": "ListItem",
                    "position": 4,
                    "name": "Contact us",
                    "item": "https://fluentflow.live/contact"
                }
            ]
        }
    `}
        </script>
      </Helmet>
    </div>
  );
};

export default SEO;
