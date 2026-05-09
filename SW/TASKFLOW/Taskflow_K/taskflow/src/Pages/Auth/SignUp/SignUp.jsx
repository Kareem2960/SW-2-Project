import React from "react";
import { useNavigate } from "react-router-dom";
import SignUpForm from "../../../Components/Auth/SignUp/SignUp";

const SignUp = () => {
  const navigate = useNavigate();

  const handleSignupSuccess = (result) => {
    navigate("/login", {
      state: {
        message: result.isManager 
          ? "Account created. An administrator must approve your account before you can sign in."
          : "Account created successfully. You can sign in now.",
      },
    });
  };

  return <SignUpForm onSuccess={handleSignupSuccess} />;
};

export default SignUp;
