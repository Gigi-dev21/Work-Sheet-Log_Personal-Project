import React from "react";
import "./navbar.css";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import HomeIcon from "@mui/icons-material/Home";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import authReducer from "../../Redux/Reducers/authReducer";
import {
  LOGGED_IN,
  LOGOUT,
  SET_USER_INFO,
} from "../../Redux/Types/actionTypes";
import { Logout } from "../../Redux/Actions/authActions";
import { Avatar } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { allData } from "../../Redux/Actions/allDataAction";

function Navbar({ handleClick }) {
  let user = JSON.parse(localStorage.getItem("user"));
  let dispatch = useDispatch();
  let role = useSelector((state) => state.auth.userData.role);
  const userDisplayName = user ? user.displayName : null;
  const displayName = userDisplayName ? userDisplayName[0].toUpperCase() : null;

  // The Notfication count
  let allData = useSelector((state) => state.allData.allData);
  let status = allData.map((data) => data.status);
  let notficationCount = status.filter((data) => data === "Pending");

  let handleLogOut = () => {
    console.log("Clicked");
    dispatch(Logout());
  };

  return (
    <div className="navbarDiv navbars  ">
      <div className="icons container">
        {!user && (
          <Col sm={8} className="homeIcon" onClick={() => handleClick("", "/")}>
            <HomeIcon data-testid="homeAvatar" />
          </Col>
        )}
        {user && userDisplayName && (
          <Col
            sm={8}
            className="homeIcon avatar"
            onClick={() => handleClick("", "/")}
          >
            <Avatar
              sx={{ bgcolor: "red" }}
              alt="User Avatar"
              src="/broken-image.jpg"
            >
              {displayName}
            </Avatar>
            {userDisplayName}
          </Col>
        )}

        <Col sm={4} className="">
          {!user ? (
            <div className="buttons">
              <a onClick={() => handleClick("loginForm", "/login")}>Login</a>
              <a onClick={() => handleClick("signUpForm", "/signUp")}>
                Sign up
              </a>
            </div>
          ) : (
            <div className="loggedInButtons">
              {user && userDisplayName && role === "admin" && (
                <div>
                  <NotificationsIcon />
                  {notficationCount.length > 0 && notficationCount.length}
                </div>
              )}
              <a onClick={handleLogOut}>Sign out</a>
            </div>
          )}
        </Col>
      </div>
      <Row></Row>
    </div>
  );
}

export default Navbar;
