import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

// Tag vitals by ad state so ad impact can be measured explicitly.
reportWebVitals((metric) => {
  if (window.umami) {
    window.umami.track("web_vital", {
      name: metric.name,
      value: metric.value,
      rating: metric.rating,
      adState: metric.adState,
      adSlotsMounted: metric.adSlotsMounted,
    });
    return;
  }

  console.log("web-vital", metric);
});
