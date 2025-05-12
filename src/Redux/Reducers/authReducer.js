import { LOGGED_IN, LOGOUT, ROLE, SET_USER_INFO } from "../Types/actionTypes";

const storedUserData = JSON.parse(localStorage.getItem("user"));
console.log(storedUserData);
const initState = {
  user: storedUserData ? storedUserData : null,
  userData: storedUserData || { role: null },
};

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case LOGGED_IN:
      return { ...state, user: action.payload };
    case LOGOUT:
      localStorage.removeItem("user");
      return { ...state, user: action.payload };
    case SET_USER_INFO:
      return { ...state, userData: action.payload };

    default:
      return state;
  }
};
export default authReducer;
