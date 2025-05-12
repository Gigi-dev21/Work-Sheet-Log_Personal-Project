import "./App.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import "../src/Resources/bootstrap.css";
import Navbar from "./Components/NavBar/Navbar";
import Banner from "./Components/Banner/Banner";
import { useEffect, useState } from "react";
import EmpolyeDashboard from "./Components/employeDashboard/EmpolyeDashboard";
import LoginForm from "./Components/LoginForm/LoginForm";
import AdminDash from "./Components/Admin/AdminDash";
import { useDispatch, useSelector } from "react-redux";
import { userIsTrue } from "./Redux/Actions/authActions";

function App() {
  let dispatch = useDispatch();
  let navigate = useNavigate();
  let user = JSON.parse(localStorage.getItem("user"));
  const userData = useSelector((state) => state.auth.userData);
  const [content, setContent] = useState("");

  const handleClick = (content, path) => {
    setContent(content);
    navigate(path);
  };

  useEffect(() => {
    if (userData.role === "employee") {
      navigate("/dashboard");
    } else if (userData.role === "admin") {
      navigate("/admin");
    }
  }, [userData]);

  return (
    <div className="App">
      <Navbar handleClick={handleClick} />
      <Routes>
        <Route path="/" element={<Banner content={content} />}></Route>
        <Route path="/login" element={<Banner content="loginForm" />} />
        <Route path="/signup" element={<Banner content="signUpForm" />} />

        <Route path="/dashboard" element={<EmpolyeDashboard />}></Route>
        <Route path="/admin" element={<AdminDash />}></Route>
      </Routes>
    </div>
  );
}

export default App;
