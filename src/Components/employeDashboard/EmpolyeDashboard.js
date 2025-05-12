import React, { useEffect, useState } from "react";
import "./employesDash.css";
import Button from "react-bootstrap/Button";
import EmployeTable from "./EmployeTable";
import NewButton from "./NewButton";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ClipLoader } from "react-spinners";
import employeeDataAction from "../../Redux/Actions/employeeDataAction";
import { Loading } from "react-loading-dot";

// timesheet button..where tthey can see there sumitted times with status wre the admin aprovved or devlined
// when we submit=we will grab its name,email,aand the inputs..and we submit it we will send notfications to the email..
function EmpolyeDashboard() {
  const [loading, setLoading] = useState(false);
  let user = useSelector((state) => state.auth.user);
  let name = JSON.parse(localStorage.getItem("user"));

  let navigate = useNavigate();
  const dispatch = useDispatch();
  const storedEmail = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchData = async () => {
      if (!user) {
        navigate("/login");
      } else {
        try {
          setLoading(true);
          await dispatch(employeeDataAction(storedEmail));
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchData();
  }, [user, dispatch, navigate]);

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <div className="container employeeDash">
          <div className="employeHeader">
            <h2> Welcome {name?.displayName}</h2>
            <NewButton setLoading={setLoading} />
          </div>
          <EmployeTable />
        </div>
      )}
    </div>
  );
}

export default EmpolyeDashboard;
