import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function GoogleAnalytics() {
  const location = useLocation();

  useEffect(() => {
    if (window.gtag) {
      window.gtag("config", "G-FWD7KWTT9C", {
        page_path: location.pathname,
      });
    }
  }, [location]);

  return null;
}

export default GoogleAnalytics;
