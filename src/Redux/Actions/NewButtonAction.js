import { db } from "../../firebase";
import {
  NEW_EMPLOYEE_DATA,
  SET_ERRORS,
  SET_NEWBUTTON_ERRORS,
} from "../Types/actionTypes";

export const newButtonAction =
  ({ date, hours }) =>
  async (dispatch) => {
    let storage = JSON.parse(localStorage.getItem("user"));
    let dataToBeInserted = {
      hours: hours,
      date: date,
      name: storage.displayName,
      email: storage.email,
      status: "Pending",
    };
    try {
      let response = await db.collection("data").add(dataToBeInserted);
      dispatch({
        type: NEW_EMPLOYEE_DATA,
        payload: {
          ...dataToBeInserted,
        },
      });
    } catch (error) {
      dispatch({
        type: SET_NEWBUTTON_ERRORS,
        payload: error.message,
      });
    }
  };
