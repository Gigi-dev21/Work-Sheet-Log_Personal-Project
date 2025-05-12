import React, { useEffect, useState } from "react";
import "./signup.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { db, auth } from "../../firebase";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Login, SignUp } from "../../Redux/Actions/authActions";
import { Loading } from "react-loading-dot";

function SignupForm() {
  let navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [errors, seterror] = useState("");
  const [password, setPassword] = useState("");
  const [showSpinner, setShowSpinner] = useState(false);
  const [validations, setValidations] = useState([]);
  const dispatch = useDispatch();
  const signUpError = useSelector((state) => state.error.signUpErrors);
  console.log(signUpError);
  let role = useSelector((state) => state.auth.userData.role);
  let loggedin = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (loggedin === true) {
      if (role === "admin") {
        console.log(role);
        navigate("/admin");
      } else if (role === "employee") {
        console.log(role);
        navigate("/dashboard");
      }
    }
  }, [loggedin, role, navigate]);

  const handleSignUp = async (e) => {
    e.preventDefault();
    setShowSpinner(true);
    try {
      if (email === "" || password === "" || name === "") {
        seterror("All fields are required");
        return;
      }
      let regexEmail = /^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/;
      if (!regexEmail.test(email)) {
        seterror("Please enter a valid email");
        return;
      }
      if (password.length < 6) {
        seterror("Password must be at least 6 characters long");
        return;
      }
      await dispatch(SignUp({ email: email, password: password, name: name }));
      await dispatch(Login({ email, password }));
      setEmail("");
      setPassword("");
      setName("");
      navigate("/login");
    } catch (error) {
      switch (error.code) {
        case "auth/email-already-in-use":
          seterror("The email address is already in use.");
          break;
        case "auth/invalid-email":
          seterror("Invalid email address.");
          break;
        default:
          seterror("An error occurred. Please try again later.");
          break;
      }
    } finally {
      setShowSpinner(false);
    }
  };

  return (
    <div className="loginDiv" data-testid="signup-form">
      {showSpinner ? (
        <Loading />
      ) : (
        <div className="login_container employeeSignin">
          <div className=" ">
            <h3>Sign Up</h3>
            <br />
            <Form.Control
              data-testid="fullNameInput"
              type="text"
              placeholder="Full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <br />
            <Form.Control
              data-testid="emailInput"
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <br />
            <Form.Control
              data-testid="passwordInput"
              type="password"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <br />
            <div className="errors">{errors && <h6>{errors}</h6>}</div>

            <Button variant="primary" onClick={handleSignUp}>
              Sign up
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default SignupForm;
