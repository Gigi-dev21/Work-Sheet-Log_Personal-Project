import React, { useState } from "react";
import "./banner.css";
import LoginForm from "../LoginForm/LoginForm";
import SignupForm from "../SignUpForm/SignupForm";

function Banner({ content }) {
  return (
    <div className="bannerImage">
      <div className="bannerContainer">
        {content === "" && (
          <div className="welcomeText">
            <div>
              <h1 className="title">Time sheet Login Portal</h1>
              <p>
                Please log in if you already have an account, or sign up for a
                new one!
              </p>
            </div>
          </div>
        )}
        {content === "loginForm" && (
          <>
            <LoginForm />
          </>
        )}
        {content === "signUpForm" && <SignupForm />}
      </div>
    </div>
  );
}

export default Banner;
