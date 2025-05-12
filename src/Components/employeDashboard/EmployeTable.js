import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { useSelector } from "react-redux";

function EmployeTable() {
  const employeeData = useSelector((state) => state.employeeData.employeeData);
  return (
    <div>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>Date</th>
            <th>Hours worked</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {employeeData?.map(({ date, hours, status }, i) => (
            <tr key={i}>
              <td>{date}</td>
              <td>{hours}</td>
              <td
                className={
                  (status === "Approved" && "green") ||
                  (status === "Declined" && "red") ||
                  (status === "Pending" && "Blue")
                }
              >
                {status}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default EmployeTable;
