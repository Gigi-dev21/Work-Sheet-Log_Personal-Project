import {
  CHANGE_EMPLOYEE_DATE_SUCCESS,
  CHANGE_EMPLOYEE_HOUR_SUCCESS,
  CHANGE_EMPLOYEE_NAME_SUCCES,
  CHANGE_EMPLOYEE_NAME_SUCCESS,
  CHANGE_EMPLOYEE_STATUS_SUCCESS,
} from "../Types/actionTypes";

const initState = {
  changeNameSuccess: "",
  changeDateSuccess: "",
  changeHourSuccess: "",
  changeStatusSuccess: "",
};

export const changeEmployeeInfoReducer = (state = initState, action) => {
  switch (action.type) {
    case CHANGE_EMPLOYEE_NAME_SUCCESS:
      return { ...state, changeNameSuccess: action.payload };
    case CHANGE_EMPLOYEE_DATE_SUCCESS:
      return { ...state, changeDateSuccess: action.payload };
    case CHANGE_EMPLOYEE_HOUR_SUCCESS:
      return { ...state, changeHourSuccess: action.payload };
    case CHANGE_EMPLOYEE_STATUS_SUCCESS:
      return { ...state, changeStatusSuccess: action.payload };
    default:
      return state;
  }
};
