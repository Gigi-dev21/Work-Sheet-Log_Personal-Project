import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Table from "react-bootstrap/Table";
import "./admin.css";
import { useNavigate } from "react-router-dom";
import { allData } from "../../Redux/Actions/allDataAction";
import { ClipLoader } from "react-spinners";
import AcceptButton from "./AcceptButton";
import DeclineButton from "./DeclineButton";
import AdminSideBar from "./AdminSideBar";
import { darken } from "@mui/material";
import { startOfWeek, endOfWeek, parseISO, isWithinInterval } from "date-fns";
import { Loading } from "react-loading-dot";
import EditIcon from "@mui/icons-material/Edit";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import Form from "react-bootstrap/Form";
import EditModal from "./EditModal";
import AdminTable from "./AdminTable";
import FilterListIcon from "@mui/icons-material/FilterList";
import { SET_FILTER_DATA } from "../../Redux/Types/actionTypes";

// admin logins in will the a table of timesheet...there will status butoon were admin will aprove or decline..
function AdminDash({ blink, blinkItemId, editedField }) {
  let [x, y] = useState([]);
  let dispatch = useDispatch();
  let navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [buttons, setButtons] = useState(true);
  const [selectedId, setselectedId] = useState(null);
  const [selectBox, setSelectBox] = useState(false);
  const [selectBoxColor, setSelectBoxColor] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  let data = useSelector((state) => state.allData.allData);
  let user = useSelector((state) => state.auth.user);
  let sorted = useSelector((state) => state.allData.sorted);
  console.log(data);
  useEffect(() => {
    if (!user === true) {
      navigate("/login");
    }
  }, [user]);

  useEffect(() => {
    setLoading(true);
    dispatch(allData())
      .then(() => setLoading(false))
      .catch((err) => console.log(err));
    console.log(loading);
  }, [dispatch]);

  const handleEditIcon = () => {
    if (!selectBox) {
      setSelectBox(true);
    } else setSelectBox(false);
  };
  const handleSelectBox = (id) => {
    setselectedId(id);
    setSelectBoxColor(true);
    setModalShow(true);
  };
  const handleSort = (type) => {
    dispatch({ type: SET_FILTER_DATA, payload: type });
  };
  return loading ? (
    <div className="laoding">
      <ClipLoader />
    </div>
  ) : (
    <div>
      {buttons === false && <Loading />}
      <AdminSideBar
        setselectedId={setselectedId}
        handleEditIcon={handleEditIcon}
      />
      <div className="container admintable">
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              {selectBox && <th className="selectBox" />}
              <th>
                <div
                  className="filetrIconDiv"
                  onClick={() => handleSort("date")}
                >
                  Date <SwapVertIcon fontSize="small" />
                </div>
              </th>

              <th>
                <div
                  className="filetrIconDiv"
                  onClick={() => handleSort("name")}
                >
                  Name <SwapVertIcon fontSize="small" />
                </div>
              </th>
              <th>
                <div
                  className="filetrIconDiv"
                  onClick={() => handleSort("email")}
                >
                  Email <SwapVertIcon fontSize="small" />
                </div>
              </th>
              <th>Hours worked</th>
              <th>
                <div className="dflex " onClick={handleEditIcon}>
                  Status <EditIcon fontSize="small" className="editIcon " />
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {data?.map(({ id, name, email, date, hours, status }) => (
              <>
                <tr key={id}>
                  {selectBox && (
                    <td
                      onClick={() => handleSelectBox(id)}
                      className="selectBox"
                      // className={
                      //   blink && blinkItemId === id && editedField === "hosted"
                      //     ? "blink-cell"
                      //     : ""
                      // }
                    >
                      <CheckBoxOutlineBlankIcon
                        className={`${
                          selectedId === id && selectBoxColor && "blue"
                        }`}
                      />
                    </td>
                  )}

                  <td>{date}</td>
                  <td>{name}</td>
                  <td>{email}</td>
                  <td>{hours}</td>
                  <td>
                    {status === "Pending" ? (
                      <div className="statusButtons">
                        <>
                          <AcceptButton
                            id={id}
                            email={email}
                            setButtons={setButtons}
                            setLoading={setLoading}
                          />
                          <DeclineButton
                            id={id}
                            email={email}
                            setButtons={setButtons}
                            setLoading={setLoading}
                          />
                        </>
                      </div>
                    ) : (
                      status
                    )}
                  </td>
                </tr>
              </>
            ))}
          </tbody>
        </Table>
      </div>
      {/* <AdminTable
        setLoading={setLoading}
        setModalShow={setModalShow}
        modalShow={modalShow}
      /> */}
      <EditModal
        setModalShow={setModalShow}
        modalShow={modalShow}
        selectedId={selectedId}
        setselectedId={setselectedId}
        setSelectBox={setSelectBox}
        setSelectBoxColor={setSelectBoxColor}
        setLoading={setLoading}
      />
    </div>
  );
}

export default AdminDash;
