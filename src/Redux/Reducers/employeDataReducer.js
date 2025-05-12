import { EMPLOYEE_DATA, NEW_EMPLOYEE_DATA } from "../Types/actionTypes";

const initState = {
  employeeData: [],
};

const employeDataReducer = (state = initState, action) => {
  switch (action.type) {
    case EMPLOYEE_DATA:
      return { ...state, employeeData: action.payload };
    case NEW_EMPLOYEE_DATA:
      return {
        ...state,
        employeeData: [...state.employeeData, action.payload],
      };
    default:
      return state;
  }
};
export default employeDataReducer;
