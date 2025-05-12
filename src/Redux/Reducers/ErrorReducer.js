import {
  SET_ADMIN_DATA_ERRORS,
  SET_EMAIL_ERRORS,
  SET_EMPLOYEE_CHANGE_ERROR,
  SET_EMPLOYE_DATA_ERRORS,
  SET_LOGIN_ERRORS,
  SET_NAME_CHANGE_ERROR,
  SET_NEWBUTTON_ERRORS,
  SET_SIGNUP_ERRORS,
} from "../Types/actionTypes";

const init = {
  loginErrors: null,
  signUpErrors: null,
  newButtonErrors: null,
  employeDataErrors: null,
  adminDataErrors: null,
  emailErrors: null,
  nameChangeError: null,
};

export const errorReducer = (state = init, action) => {
  switch (action.type) {
    case SET_SIGNUP_ERRORS:
      return { ...state, signUpErrors: action.payload };
    case SET_LOGIN_ERRORS:
      return { ...state, loginErrors: action.payload };
    case SET_NEWBUTTON_ERRORS:
      return { ...state, newButtonErrors: action.payload };
    case SET_EMPLOYE_DATA_ERRORS:
      return { ...state, employeDataErrors: action.payload };
    case SET_ADMIN_DATA_ERRORS:
      return { ...state, adminDataErrors: action.payload };
    case SET_EMAIL_ERRORS:
      return { ...state, emailErrors: action.payload };
    case SET_EMPLOYEE_CHANGE_ERROR:
      return { ...state, nameChangeError: action.payload };

    default:
      return state;
  }
};
