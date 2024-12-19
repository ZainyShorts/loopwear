import React, { useEffect } from "react";
import { TAWK_VISITORS_PROPERTY_ID } from "../../client";

const TawkTo = () => {
  useEffect(() => {
    // Add Tawk.to script to your React app
    // var Tawk_API = Tawk_API || {}, Tawk_LoadStart = new Date();
    (function(){
      var s1 = document.createElement("script");
      var s0 = document.getElementsByTagName("script")[0];
      s1.async = true;
      s1.src = `https://embed.tawk.to/c09ecda96861b93ac9bea7bb6ee2d10b84d9cf3c/default`;
      s1.charset = 'UTF-8';
      s1.setAttribute('crossorigin', '*');
      s0.parentNode.insertBefore(s1, s0);
    })();
  }, []); // Empty dependency array to run only once

  return null; // No need to render anything
};

export default TawkTo;
