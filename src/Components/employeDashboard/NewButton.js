import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { db } from "../../firebase";
import { useDispatch, useSelector } from "react-redux";
import {
  EMPLOYEE_DATA,
  NEW_EMPLOYEE_DATA,
} from "../../Redux/Types/actionTypes";
import { newButtonAction } from "../../Redux/Actions/NewButtonAction";
import { sendEmail } from "../../Redux/Actions/sendEmailActions";
import { Loading } from "react-loading-dot";
import { ClipLoader } from "react-spinners";

function NewButton({ setLoading }) {
  const [modalShow, setModalShow] = useState(false);
  const [date, setDate] = useState("");
  const [hours, setHours] = useState("");
  const [errors, setErrors] = useState("");
  const [loading, isLoading] = useState(false);
  const dispatch = useDispatch();
  let storedEmail = JSON.parse(localStorage.getItem("user"));
  let email = storedEmail?.email;

  const handleSubmit = async (e) => {
    console.log("bieng true");
    e.preventDefault();
    try {
      if (date === "" || hours === "") {
        setErrors("All fields are required");
        return;
      }
      setLoading(true);
      await dispatch(sendEmail(email, "success"));
      await dispatch(newButtonAction({ date, hours }));
      setModalShow(false);
      setDate("");
      setHours("");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setModalShow(false);
    setDate("");
    setHours("");
  };

  return (
    <div>
      <Button variant="primary" onClick={() => setModalShow(true)}>
        New
      </Button>

      <>
        <Modal
          size="md"
          show={modalShow}
          onHide={() => setModalShow(false)}
          centered
        >
          <>
            <Modal.Header>
              <Modal.Title id="contained-modal-title-vcenter">
                Insert Today's Work Hours
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {errors}
              <div className=" ">
                <br />
                <Form.Control
                  type="date"
                  placeholder="Date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
                <br />
                <Form.Control
                  type="text"
                  value={hours}
                  placeholder="Hours worked today"
                  onChange={(e) => setHours(e.target.value)}
                />
                <br />
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={handleCancel}>Cancel</Button>
              <Button type="submit" onClick={handleSubmit}>
                Submit
              </Button>
            </Modal.Footer>
          </>
        </Modal>
      </>
    </div>
  );
}

export default NewButton;
