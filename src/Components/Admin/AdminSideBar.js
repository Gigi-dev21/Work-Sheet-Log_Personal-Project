import { Avatar } from "@mui/material";
import React from "react";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SearchIcon from "@mui/icons-material/Search";
import LogoutIcon from "@mui/icons-material/Logout";
import { useDispatch, useSelector } from "react-redux";
import { Login, Logout } from "../../Redux/Actions/authActions";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import EditIcon from "@mui/icons-material/Edit";
import Edit from "@mui/icons-material/Edit";
function AdminSideBar({ setselectedId, handleEditIcon }) {
  let dipatch = useDispatch();
  // The Notfication count
  let allData = useSelector((state) => state.allData.allData);
  let status = allData.map((data) => data.status);
  let notficationCount = status.filter((data) => data === "Pending");

  const handleLogout = () => {
    dipatch(Logout());
  };

  const handleEdit = () => {
    handleEditIcon();
    console.log(setselectedId);
  };
  const handleFilter = () => {};
  return (
    <div className="adminSideBar ">
      <div className="container adminSideBarIcons">
        <div className="sidebarPropertys">
          <div className="notification">
            <NotificationsIcon />{" "}
            {notficationCount.length > 0 && notficationCount.length}
          </div>
          <div className="searchIcon" onClick={handleEdit}>
            <EditIcon />
          </div>

          <div className="searchIcon" onClick={handleLogout}>
            <LogoutIcon />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminSideBar;
