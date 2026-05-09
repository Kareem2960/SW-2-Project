import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { message } from "antd";
import Footer from "../../Components/Home/Footer/Footer";
import Header from "../../Components/Home/Header/Header";
import FeaturesSection from "../../Components/Home/FeaturesSection/FeaturesSection";
import TechStack from "../../Components/Home/TechStack/TechStack";
import CTASection from "../../Components/Home/CTASection/CTASection";
import Accounts from "../../Components/Home/Accounts/Accounts";

const Home = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.state?.message) {
      message.success(location.state.message, 5); // 5 seconds duration
      // Clear the message after showing it
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  return (
    <div>
      <Header />
      <FeaturesSection />
      <Accounts />
      <TechStack />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Home;
