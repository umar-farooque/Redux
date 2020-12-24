import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import logger from "./middleware/logger";
import api from "./middleware/api";
import reducer from "./reducer";
// import { createStore } from "redux";
// import { devToolsEnhancer } from "redux-devtools-extension";
// import reducer from "./bugs";
//without toolkit if we have to apply middleware we have to import applyMiddleware from redux
export default function () {
  //   const store = createStore(reducer, devToolsEnhancer({ trace: true }));without toolkit
  return configureStore({
    reducer,
    middleware: [...getDefaultMiddleware(), logger("Console"), api],
  });
}
