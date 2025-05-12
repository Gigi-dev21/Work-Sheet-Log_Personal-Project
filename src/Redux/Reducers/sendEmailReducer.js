import { EMAIL_SUCCESS_SENT } from "../Types/actionTypes";
const init = {
  sent: "",
};
export const sendEmailReducer = (state = init, action) => {
  switch (action.type) {
    case EMAIL_SUCCESS_SENT:
      return { ...state, sent: action.paylaod };
    default:
      return state;
  }
};
