import { createContext } from "react";

export const QueryContext = createContext({
  currSymbol: "",
  setCurrSymbol: () => {},
});
