import { combineReducers } from "redux";
import bugsReducer from "./bugs";
import projectReducer from "./projects";
import usersReducer from "./users";
const reducer = combineReducers({
  bugs: bugsReducer,
  project: projectReducer,
  users: usersReducer,
});
export default reducer;
