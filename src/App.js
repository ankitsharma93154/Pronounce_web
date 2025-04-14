import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import FAQPage from "./components/faqs";
import AboutPage from "./components/contact"; // this includes contact section
import Header from "./components/header";
import Footer from "./components/footer";

const App = () => {
  return (
    <Router>
      <div className="app">
        <Header />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
};

export default App;
