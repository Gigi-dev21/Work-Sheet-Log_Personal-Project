import React, { useState } from "react";
import Table from "react-bootstrap/Table";
import EditIcon from "@mui/icons-material/Edit";
import { useSelector } from "react-redux";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import AcceptButton from "./AcceptButton";
import DeclineButton from "./DeclineButton";
import EditModal from "./EditModal";
import AdminSideBar from "./AdminSideBar";

function AdminTable({ setLoading }) {
  let data = useSelector((state) => state.allData.allData);
  const [modalShow, setModalShow] = useState(false);
  const [buttons, setButtons] = useState(true);
  const [selectedId, setselectedId] = useState(null);
  const [selectBox, setSelectBox] = useState(false);
  const [selectBoxColor, setSelectBoxColor] = useState(false);
  const handleEditIcon = () => {
    if (!selectBox) {
      setSelectBox(true);
    } else setSelectBox(false);
  };

  const handleSelectBox = (id) => {
    setselectedId(id);
    setSelectBoxColor(true);
    setModalShow(true);
    console.log(id);
  };

  return (
    <div>
      <div className="container admintable">
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              {selectBox && <th className="selectBox" />}
              <th>Date</th>
              <th>Name</th>
              <th>Email</th>
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
      <EditModal
        setModalShow={setModalShow}
        modalShow={modalShow}
        selectedId={selectedId}
        setselectedId={setselectedId}
        setSelectBox={setSelectBox}
        setSelectBoxColor={setSelectBoxColor}
        setLoading={setLoading}
      />
      <AdminSideBar
        setselectedId={setselectedId}
        handleEditIcon={handleEditIcon}
      />
    </div>
  );
}

export default AdminTable;
