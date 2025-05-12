import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import Form from "react-bootstrap/Form";
import EditIcon from "@mui/icons-material/Edit";

import {
  changeEmployeeDate,
  changeEmployeeEmail,
  changeEmployeeHour,
  changeEmployeeName,
  changeEmployeeStatus,
} from "../../Redux/Actions/ChangeEmployeeInfoActions";
import { sendEmail } from "../../Redux/Actions/sendEmailActions";

function EditModal({
  setModalShow,
  modalShow,
  selectedId,
  setselectedId,
  setSelectBox,
  setSelectBoxColor,
  setLoading,
}) {
  const [blinkItemId, setBlinkItemId] = useState(null);
  const [blink, setBlink] = useState(false);
  const [errors, setErrors] = useState("");
  const [clicked, setClicked] = useState("");
  const [clickedId, setClickedId] = useState("");
  const [clickedEmail, setClickedEmail] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [newName, setNewName] = useState("");
  const [newDates, setNewDate] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newHour, setNewHour] = useState("");
  const [newStatus, setNewStatus] = useState("");
  const [changeMade, setChangeMade] = useState("");
  let data = useSelector((state) => state.allData.allData);
  const dispatch = useDispatch();

  const handleSubmit = async () => {
    setLoading(true);
    try {
      if (!clicked) {
        setErrors("Please make changes before submitting");
        return;
      }
      // HANDLES NAME CHANGE//
      if (clicked === "name") {
        if (!newName) {
          setErrors("Field required");
          return;
        }
        console.log("dispatching");
        await dispatch(
          changeEmployeeName({ name: newName, email: clickedEmail })
        );
        handleCancelModal();
      }
      // HANDLES DATE CHANGE//
      if (clicked === "date") {
        if (!newDates) {
          setErrors("Field required");
          return;
        }
        await dispatch(
          changeEmployeeDate({ newDate: newDates, id: clickedId })
        );
        handleCancelModal();
      }
      // HANDLES HOURS CHANGE//
      if (clicked === "hours") {
        if (!newHour) {
          setErrors("Field required");
          return;
        }
        await dispatch(changeEmployeeHour({ newHour: newHour, id: clickedId }));
        handleCancelModal();
      }
      // HANDLES STATUS CHANGE//
      if (clicked === "status") {
        if (!newStatus) {
          setErrors("Field required");
          return;
        }
        console.log(newStatus);

        await dispatch(
          changeEmployeeStatus({ newStatus: newStatus, id: clickedId })
        );
        console.log(clickedEmail);
        if (newStatus === "Declined") {
          await dispatch(sendEmail(clickedEmail, "decline"));
        }
        handleCancelModal();
      }
      // HANDLES EMAIL CHANGE//
      if (clicked === "email") {
        if (!newEmail) {
          setErrors("Field required");
          return;
        }
        console.log(clickedEmail);
        await dispatch(
          changeEmployeeEmail({ newEmail: newEmail, email: clickedEmail })
        );
        handleCancelModal();
      }
      setChangeMade(true);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  console.log(newEmail);
  console.log(newStatus);
  console.log(clickedId);

  const handleEditIcon = ({ field, value, id, clickedEmail }) => {
    setShowForm(true);
    setClicked(field);
    setClickedId(id);
    console.log(clickedEmail);
    setClickedEmail(clickedEmail);
    setNewName("");
    setNewDate("");
    setNewEmail("");
    setNewHour("");
    setNewHour("");
    setErrors("");
  };

  const handleCancelModal = () => {
    setShowForm(false);
    setClicked("");
    setClickedEmail("");
    setModalShow(false);
    setselectedId(null);
    setNewName("");
    setNewDate("");
    setNewEmail("");
    setNewHour("");
    setNewStatus("");
    setSelectBoxColor(false);
    setErrors("");
  };

  return (
    <div>
      <Modal size="md" show={modalShow} onHide={handleCancelModal} centered>
        <>
          <Modal.Header>
            <Modal.Title id="contained-modal-title-vcenter">Edit</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="errors"> {errors}</div>

            <div className=" ">
              <br />
              {data
                .filter((data) => data.id === selectedId)
                .map(({ email, name, date, hours, status, id }) => (
                  <div className="lists" key={email}>
                    <div className="iconContanier">
                      <div>
                        <div>
                          <span>Name:</span>
                          {name}
                        </div>
                      </div>
                      <EditIcon
                        fontSize="small"
                        onClick={() =>
                          handleEditIcon({
                            field: "name",
                            value: name,
                            clickedEmail: email,
                          })
                        }
                      />
                    </div>
                    <div className="Name">
                      {showForm && clicked === "name" && (
                        <Form.Control
                          className="form_control"
                          type="text"
                          value={newName}
                          placeholder={`Enter new ${clicked}`}
                          onChange={(e) => {
                            setNewName(e.target.value);
                          }}
                        />
                      )}
                      <br />
                    </div>
                    <div className="iconContanier">
                      <div>
                        <div>
                          <span>Date:</span>
                          {date}
                        </div>
                      </div>
                      <EditIcon
                        fontSize="small"
                        onClick={() =>
                          handleEditIcon({ field: "date", value: date, id: id })
                        }
                      />
                    </div>
                    <div className="Date">
                      {showForm && clicked === "date" && (
                        <Form.Control
                          className="form_control"
                          type="date"
                          value={newDates}
                          placeholder={`Enter new ${clicked}`}
                          onChange={(e) => setNewDate(e.target.value)}
                        />
                      )}
                      <br />
                    </div>
                    <div className="iconContanier">
                      <div>
                        <div>
                          <span>Email:</span>
                          {email}
                        </div>
                      </div>
                      <EditIcon
                        fontSize="small"
                        onClick={() =>
                          handleEditIcon({
                            field: "email",
                            value: email,
                            clickedEmail: email,
                            id: id,
                          })
                        }
                      />
                    </div>
                    <div className="Email">
                      {showForm && clicked === "email" && (
                        <Form.Control
                          className="form_control"
                          type="text"
                          value={newEmail}
                          placeholder={`Enter new ${clicked}`}
                          onChange={(e) => setNewEmail(e.target.value)}
                        />
                      )}
                      <br />
                    </div>
                    <div className="iconContanier">
                      <div>
                        <div>
                          <span>Hours worked:</span>
                          {hours}
                        </div>
                      </div>
                      <EditIcon
                        fontSize="small"
                        onClick={() =>
                          handleEditIcon({
                            field: "hours",
                            value: hours,
                            id: id,
                          })
                        }
                      />
                    </div>
                    <div className="hours">
                      {showForm && clicked === "hours" && (
                        <Form.Control
                          className="form_control"
                          type="text"
                          value={newHour}
                          placeholder={`Enter new ${clicked}`}
                          onChange={(e) => setNewHour(e.target.value)}
                        />
                      )}
                      <br />
                    </div>
                    <div className="iconContanier">
                      <div>
                        <div>
                          <span>Status:</span>
                          {status}
                        </div>
                      </div>
                      <EditIcon
                        fontSize="small"
                        onClick={() =>
                          handleEditIcon({
                            field: "status",
                            value: status,
                            id: id,
                            clickedEmail: email,
                          })
                        }
                      />
                    </div>
                    <div className="Status">
                      {showForm && clicked === "status" && (
                        <Form.Select
                          aria-label="Default select example"
                          className="form_control"
                          value={newStatus}
                          onChange={(e) => setNewStatus(e.target.value)}
                        >
                          <option> select status </option>
                          <option value="Approved">Approve</option>
                          <option value="Pending">Pend</option>
                          <option value="Declined">Decline</option>
                        </Form.Select>
                        // <Form.Control
                        //   className="form_control"
                        //   type="select"
                        //   value={newStatus}
                        //   placeholder={`Enter new ${clicked}`}
                        //   onChange={(e) => setNewStatus(e.target.value)}
                        // />
                      )}
                      <br />
                    </div>
                  </div>
                ))}

              <br />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={handleCancelModal}>Cancel</Button>
            <Button type="submit" onClick={handleSubmit}>
              Submit
            </Button>
          </Modal.Footer>
        </>
      </Modal>
    </div>
  );
}

export default EditModal;
