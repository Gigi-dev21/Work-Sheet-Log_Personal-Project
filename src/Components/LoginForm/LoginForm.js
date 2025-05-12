import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./loginform.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Login } from "../../Redux/Actions/authActions";
import { Loading } from "react-loading-dot";

function LoginForm() {
  let navigate = useNavigate();
  const [showSpinner, setShowSpinner] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let dispatch = useDispatch();
  let role = useSelector((state) => state.auth.userData.role);
  let errors = useSelector((state) => state.error.loginErrors);
  let loggedin = useSelector((state) => state.auth.user);
  let validations = useSelector((state) => state.auth.validations);

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

  const handleLogin = async () => {
    setShowSpinner(true);
    try {
      await dispatch(Login({ email, password }));
    } catch (error) {
      console.log(error);
    } finally {
      setShowSpinner(false);
    }
  };

  return (
    <div className="loginDiv">
      {showSpinner ? (
        <Loading />
      ) : (
        <div className="login_container employeeSignin">
          <div className=" ">
            <h3 data-testid="login">Login</h3>
            <br />
            <Form.Control
              data-testid="emailInput"
              type="text"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <br />
            <Form.Control
              data-testid="passInput"
              type="password"
              value={password}
              placeholder="Enter Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <br />
            <Button variant="primary" onClick={handleLogin}>
              Login
            </Button>
          </div>
          <div className="validations">
            {validations}
            {errors}
          </div>
        </div>
      )}
    </div>
  );
}

export default LoginForm;
