import { createContext } from "react";

export const initialState = {
  size: 0,
  products: [],
  basket: {},
  shops: [],
};

export const StateContext = createContext(initialState);
