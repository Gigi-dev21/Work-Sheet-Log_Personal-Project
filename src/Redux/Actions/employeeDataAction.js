import { db } from "../../firebase";
import {
  EMPLOYEE_DATA,
  SET_DATA_ERRORS,
  SET_EMPLOYE_DATA_ERRORS,
} from "../Types/actionTypes";

// FETCHES THE DATA OF THE EMPLOYE IN EMPLOYEE DASHBOARD//
const employeeDataAction = (storedEmail) => async (dispatch) => {
  try {
    let querySnapshot = await db
      .collection("data")
      .where("email", "==", storedEmail.email)
      .get();
    const employeeData = querySnapshot.docs.map((doc) => doc.data());

    dispatch({
      type: EMPLOYEE_DATA,
      payload: employeeData,
    });
  } catch (error) {
    dispatch({
      type: SET_EMPLOYE_DATA_ERRORS,
      payload: error.message,
    });
  }
};
export default employeeDataAction;
