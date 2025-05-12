import { db, auth } from "../../firebase";
import {
  LOGGED_IN,
  LOGOUT,
  ROLE,
  SET_ERRORS,
  SET_LOGIN_ERRORS,
  SET_SIGNUP_ERRORS,
  SET_USER_INFO,
} from "../Types/actionTypes";

export const Login = (credentials) => async (dispatch) => {
  if (credentials.email === "" || credentials.password === "") {
    dispatch({
      type: SET_LOGIN_ERRORS,
      payload: "Please fill out all fields",
    });
    return;
  }

  try {
    const response = await auth.signInWithEmailAndPassword(
      credentials.email,
      credentials.password
    );

    dispatch({
      type: LOGGED_IN,
      payload: true,
    });

    const userSnapshot = await db
      .collection("users")
      .where("email", "==", response.user.email)
      .get();

    if (!userSnapshot.empty) {
      const userData = userSnapshot.docs[0].data();
      console.log(userData);
      localStorage.setItem(
        "user",
        JSON.stringify({
          displayName: userData.name,
          email: userData.email,
          role: userData.role,
        })
      );

      dispatch({
        type: SET_USER_INFO,
        payload: {
          role: userData.role,
        },
      });
    } else {
      dispatch({
        type: SET_LOGIN_ERRORS,
        payload: "User data not found",
      });
    }
  } catch (error) {
    let errorMessage = "";
    if (error.code === "auth/invalid-credential") {
      errorMessage = "Incorrect password or email. Please try again.";
    } else {
      errorMessage = error.message;
    }
    dispatch({
      type: SET_LOGIN_ERRORS,
      payload: errorMessage,
    });
  }
};

export const Logout = () => (dispatch) => {
  dispatch({
    type: LOGOUT,
    payload: null,
  });
  dispatch({
    type: SET_USER_INFO,
    payload: {
      role: null,
    },
  });
  dispatch({
    type: LOGGED_IN,
    payload: false,
  });
  dispatch({
    type: SET_LOGIN_ERRORS,
    payload: "",
  });
};

export const SignUp =
  ({ email, password, name }) =>
  async (dispatch) => {
    try {
      // if (email === "" || password === "" || name === "") {
      //   dispatch({
      //     type: SET_SIGNUP_ERRORS,
      //     payload: "All fields are required",
      //   });
      //   return;
      // }

      // let regexEmail = /^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/;
      // if (!regexEmail.test(email)) {
      //   dispatch({
      //     type: SET_SIGNUP_ERRORS,
      //     payload: "Please enter a valid email",
      //   });
      //   return;
      // }

      // if (password.length < 6) {
      //   dispatch({
      //     type: SET_SIGNUP_ERRORS,
      //     payload: "Password must be at least 6 characters long",
      //   });
      //   return;
      // }
      let userCredentials = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      await db.collection("users").doc(userCredentials.user.uid).set({
        name: name,
        email: email,
        role: "employee",
      });
      dispatch({
        type: SET_SIGNUP_ERRORS,
        payload: "success",
      });
    } catch (error) {
      switch (error.code) {
        case "auth/email-already-in-use":
          dispatch({
            type: SET_SIGNUP_ERRORS,
            payload: "The email address is already in use.",
          });
          break;
        case "auth/invalid-email":
          dispatch({
            type: SET_SIGNUP_ERRORS,
            payload: "Invalid email address.",
          });
          break;
        default:
          dispatch({
            type: SET_SIGNUP_ERRORS,
            payload: "An error occurred. Please try again later.",
          });
          break;
      }
      console.log(error);
    }
  };
