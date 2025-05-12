import { createContext, useContext, useReducer } from "react";

export const StateContext = createContext();

export const StateProvider = ({ store, initialState, children }) => (
  <StateContext.Provider value={useReducer(store, initialState)}>
    {children}
  </StateContext.Provider>
);
export const useStateValue = () => useContext(StateContext);
