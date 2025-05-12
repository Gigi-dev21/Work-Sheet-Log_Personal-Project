import { allData } from "../Actions/allDataAction";
import {
  CHANGE_EMPLOYEE_DATE,
  CHANGE_EMPLOYEE_EMAIL,
  CHANGE_EMPLOYEE_HOURS,
  CHANGE_EMPLOYEE_NAME,
  CHANGE_EMPLOYEE_NAME_SUCCES,
  CHANGE_EMPLOYEE_STATUS,
  FILTER_BY_DATE,
  SET_DATA,
  SET_DATA_BY_WEEK,
  SET_FILTER_DATA,
  SET_STATUS,
} from "../Types/actionTypes";

const initState = {
  allData: [],
  loginFlag: false,
  sorted: false,
};

const allDataReducer = (state = initState, action) => {
  switch (action.type) {
    case SET_DATA:
      return {
        ...state,
        allData: action.payload,
      };
    case SET_FILTER_DATA:
      return {
        ...state,
        allData: state.allData.slice().sort((a, b) => {
          console.log(action.payload);
          if (action.payload === "name") {
            return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
          } else if (action.payload === "email") {
            return a.email.toLowerCase().localeCompare(b.email.toLowerCase());
          } else if (action.payload === "date") {
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);
            return dateA - dateB;
          }
        }),
      };

    case SET_STATUS:
      return {
        ...state,
        allData: state.allData.map((data) => {
          if (data.id === action.payload.id) {
            return {
              ...data,
              status: action.payload.status,
            };
          } else return data;
        }),
      };
    case CHANGE_EMPLOYEE_NAME:
      return {
        ...state,
        allData: state.allData.map((data) => {
          if (data.email === action.payload.email) {
            return { ...data, name: action.payload.name };
          }
          return data;
        }),
      };
    case CHANGE_EMPLOYEE_DATE:
      return {
        ...state,
        allData: state.allData.map((data) => {
          if (data.id === action.payload.id) {
            return { ...data, date: action.payload.newDate };
          }
          return data;
        }),
      };
    case CHANGE_EMPLOYEE_HOURS:
      return {
        ...state,
        allData: state.allData.map((data) => {
          if (data.id === action.payload.id) {
            return { ...data, hours: action.payload.newHour };
          }
          return data;
        }),
      };
    case CHANGE_EMPLOYEE_STATUS:
      return {
        ...state,
        allData: state.allData.map((data) => {
          if (data.id === action.payload.id) {
            return { ...data, status: action.payload.newStatus };
          }
          return data;
        }),
      };
    case CHANGE_EMPLOYEE_EMAIL:
      return {
        ...state,
        allData: state.allData.map((data) => {
          if (data.email === action.payload.email) {
            return { ...data, email: action.payload.newEmail };
          }
          return data;
        }),
      };

    default:
      return state;
  }
};
export default allDataReducer;
