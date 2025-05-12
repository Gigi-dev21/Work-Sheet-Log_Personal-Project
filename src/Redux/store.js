import { configureStore, applyMiddleware } from "@reduxjs/toolkit";
import authReducer from "./Reducers/authReducer";
import allDataReducer from "./Reducers/allDataReducer";
import employeDataReducer from "./Reducers/employeDataReducer";
import { errorReducer } from "./Reducers/ErrorReducer";
import { sendEmailReducer } from "./Reducers/sendEmailReducer";
import { changeEmployeeInfoReducer } from "./Reducers/ChangeEmployeeInfoReducer";

const store = configureStore({
  reducer: {
    auth: authReducer,
    employeeData: employeDataReducer,
    allData: allDataReducer,
    error: errorReducer,
    sendEmail: sendEmailReducer,
    changeEmployeeInfo: changeEmployeeInfoReducer,
  },
});

export default store;
