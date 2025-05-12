import axios from "axios";
import { EMAIL_SUCCESS_SENT, SET_EMAIL_ERRORS } from "../Types/actionTypes";

export const sendEmail = (email, type) => async (dispatch) => {
  try {
    let subject, text;
    if (type === "decline") {
      subject = "Timesheet Declined";
      text = "Your timesheet request has been declined.";
    } else if (type === "success") {
      subject = "Successfully submitted";
      text = "Your timesheet has been successfully submitted.";
    }
    await axios.post("http://localhost:9000/send-email", {
      to: email,
      subject: subject,
      text: text,
    });

    dispatch({
      type: EMAIL_SUCCESS_SENT,
      payload: "Email sent successfully",
    });
  } catch (error) {
    dispatch({
      type: SET_EMAIL_ERRORS,
      payload: error.message,
    });
  }
};
