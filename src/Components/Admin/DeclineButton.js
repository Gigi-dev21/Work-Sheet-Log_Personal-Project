import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import { useDispatch } from "react-redux";
import { handleDeclineStatus } from "../../Redux/Actions/StatusAction";
import { sendEmail } from "../../Redux/Actions/sendEmailActions";

function DeclineButton({ id, email, setLoading }) {
  let dispatch = useDispatch();

  const handleDecline = async () => {
    setLoading(true);
    try {
      await dispatch(sendEmail(email, "decline"));
      await dispatch(handleDeclineStatus(id));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Button variant="danger" size="sm" onClick={handleDecline}>
        Decline
      </Button>
    </div>
  );
}

export default DeclineButton;
