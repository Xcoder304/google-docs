import { createContext, useContext, useReducer } from "react";

const App = createContext();

const AppContext = ({ reducer, initailstate, children }) => {
  return (
    <App.Provider value={useReducer(reducer, initailstate)}>
      {children}
    </App.Provider>
  );
};

export const ContextVal = () => useContext(App);

export default AppContext;
