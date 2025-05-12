import axios from "axios";
import { db } from "../../firebase";

import {
  CHANGE_EMPLOYEE_DATE,
  CHANGE_EMPLOYEE_DATE_SUCCESS,
  CHANGE_EMPLOYEE_EMAIL,
  CHANGE_EMPLOYEE_EMAIL_SUCCESS,
  CHANGE_EMPLOYEE_HOURS,
  CHANGE_EMPLOYEE_HOUR_SUCCESS,
  CHANGE_EMPLOYEE_NAME,
  CHANGE_EMPLOYEE_NAME_SUCCES,
  CHANGE_EMPLOYEE_NAME_SUCCESS,
  CHANGE_EMPLOYEE_STATUS,
  CHANGE_EMPLOYEE_STATUS_SUCCESS,
  SET_EMPLOYEE_CHANGE_ERROR,
  SET_NAME_CHANGE_ERROR,
} from "../Types/actionTypes";

// CHANGE EMOPLYEE NAME///
export const changeEmployeeName =
  ({ name, email }) =>
  async (dispatch) => {
    try {
      const userQuerySnapshot = await db
        .collection("users")
        .where("email", "==", email)
        .get();

      if (userQuerySnapshot.empty) {
        dispatch({
          type: SET_EMPLOYEE_CHANGE_ERROR,
          payload: "No user found with the specified email.",
        });
        return;
      }
      const userDoc = userQuerySnapshot.docs[0];
      await userDoc.ref.update({ name: name });

      const dataQuerySnapshot = await db
        .collection("data")
        .where("email", "==", email)
        .get();

      dataQuerySnapshot.forEach(async (doc) => {
        try {
          await db.collection("data").doc(doc.id).update({ name: name });
        } catch (error) {
          console.error("Error updating name:", error);
          dispatch({
            type: SET_EMPLOYEE_CHANGE_ERROR,
            payload: "Error updating name",
          });
        }
      });

      dispatch({
        type: CHANGE_EMPLOYEE_NAME,
        payload: { name: name, email: email },
      });

      dispatch({
        type: CHANGE_EMPLOYEE_NAME_SUCCESS,
        payload: "Name has been changed",
      });
      console.log("Name has been changed");
    } catch (error) {
      console.error("Change employee name error:", error);
      dispatch({
        type: SET_EMPLOYEE_CHANGE_ERROR,
        payload: `No data found.${error.message}`,
      });
    }
  };

// CHANGE EMPLOYEE DATE//
export const changeEmployeeDate =
  ({ newDate, id }) =>
  async (dispatch) => {
    try {
      let querySnapshot = await db.collection("data").doc(id);
      await querySnapshot.update({
        date: newDate,
      });
      dispatch({
        type: CHANGE_EMPLOYEE_DATE,
        payload: { id: id, newDate: newDate },
      });
      dispatch({
        type: CHANGE_EMPLOYEE_DATE_SUCCESS,
        payload: "Date has been changed",
      });
      console.log(`Date has been changed to ${newDate}`);
    } catch (error) {
      console.log("error changing date");
      dispatch({
        type: SET_EMPLOYEE_CHANGE_ERROR,
        payload: `No data found.${error.message}`,
      });
    }
  };

// CHANGE EMPLOYEE HOUR//
export const changeEmployeeHour =
  ({ newHour, id }) =>
  async (dispatch) => {
    try {
      let querySnapshot = await db.collection("data").doc(id);
      await querySnapshot.update({
        hours: newHour,
      });
      dispatch({
        type: CHANGE_EMPLOYEE_HOURS,
        payload: { id: id, newHour: newHour },
      });
      dispatch({
        type: CHANGE_EMPLOYEE_HOUR_SUCCESS,
        payload: "Hour has been changed",
      });
      console.log(`Hour has been changed to ${newHour}`);
    } catch (error) {
      console.log("error changing hours");
      dispatch({
        type: SET_EMPLOYEE_CHANGE_ERROR,
        payload: `No data found.${error.message}`,
      });
    }
  };

// CHANGE EMPLOYEE STATUS ACTION//
export const changeEmployeeStatus =
  ({ newStatus, id }) =>
  async (dispatch) => {
    try {
      let querySnapshot = await db.collection("data").doc(id);
      await querySnapshot.update({
        status: newStatus,
      });
      dispatch({
        type: CHANGE_EMPLOYEE_STATUS,
        payload: { id: id, newStatus: newStatus },
      });
      dispatch({
        type: CHANGE_EMPLOYEE_STATUS_SUCCESS,
        payload: "Status has been changed",
      });
      console.log(`Status has been changed to ${newStatus}`);
    } catch (error) {
      console.log("eroor changing status");
      dispatch({
        type: SET_EMPLOYEE_CHANGE_ERROR,
        payload: `No data found.${error.message}`,
      });
    }
  };

// CHANGING EMPLOYEE EMAIL ACTION
export const changeEmployeeEmail =
  ({ newEmail, email }) =>
  async (dispatch) => {
    console.log(email);
    console.log(newEmail);
    try {
      const querySnapshot = await db
        .collection("users")
        .where("email", "==", email)
        .get();

      if (!querySnapshot.empty) {
        const doc = querySnapshot.docs[0];
        const id = doc.id;

        const response = await axios.post(
          "http://localhost:9000/change-email",
          {
            uid: id,
            newEmail: newEmail,
          }
        );
        console.log(response);
        console.log("succesfull 1");

        await db.collection("users").doc(id).update({ email: newEmail });

        console.log("succesfull 2");

        const dataQuerySnapshot = await db
          .collection("data")
          .where("email", "==", email)
          .get();

        dataQuerySnapshot.forEach(async (doc) => {
          try {
            await db.collection("data").doc(doc.id).update({ email: newEmail });
            dispatch({
              type: CHANGE_EMPLOYEE_EMAIL,
              payload: { email: email, newEmail: newEmail },
            });
          } catch (error) {
            console.log(error);
            dispatch({
              type: SET_EMPLOYEE_CHANGE_ERROR,
              payload: `"Error updating email in data:", ${error}`,
            });
          }
        });
        console.log("succesful 3");
        dispatchEvent({
          type: CHANGE_EMPLOYEE_EMAIL_SUCCESS,
          payload: "Succesfully changed email",
        });
      } else {
        console.log("No document found with the email");
        dispatch({
          type: SET_EMPLOYEE_CHANGE_ERROR,
          payload: "No document found with the email",
        });
      }
    } catch (error) {
      console.log(error);
      // dispatch({
      //   type: SET_EMPLOYEE_CHANGE_ERROR,
      //   payload: error,
      // });
    }
  };
