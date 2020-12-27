import { createAction, createReducer, createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { apiCallBegan } from "./api";
import moment from "moment";
const bugUpdated = createAction("Bug Updated");

// console.log(bugUpdated().type);

// Action Types without toolkit
// const BUG_ADDED = "bugAdded";
// const BUG_REMOVED = "bugRemoved";
// const Bug_RESOLVED = "bugResolved";

// Actions without slice fn
// export const bugAdded = createAction("bugAdded");
// export const bugRemoved = createAction("bugRemoved");
// export const bugResolved = createAction("bugResolved");
// export const bugAdded = (description) => ({
//   type: BUG_ADDED,
//   payload: {
//     description: description,
//   },
// });

// export const bugResolved = (id) => ({
//   type: Bug_RESOLVED,
//   payload: { id },
// });

// Reducer

let lastId = 0;
const slice = createSlice({
  name: "bugs",
  initialState: {
    list: [],
    loading: false,
    lastFetch: null,
  },
  reducers: {
    bugsRequested: (state, action) => {
      state.loading = true;
    },
    bugsRequestFailed: (state, action) => {
      state.loading = false;
    },
    bugsRecieved: (state, action) => {
      // console.log(action);
      state.list = action.payload;
      state.loading = false;
      state.lastFetch = Date.now();
    },
    bugAssignedToUser: (state, action) => {
      const { bugId, userId } = action.payload;
      const index = state.list.findIndex((bug) => bug.id === bugId);
      state.list[index].userId = userId;
    },
    bugAdded: (state, action) => {
      state.list.push({
        id: ++lastId,
        description: action.payload.description,
        resolved: false,
      });
    },
    bugResolved: (state, action) => {
      const index = state.list.findIndex((bug) => bug.id === action.payload.id);
      state.list[index].resolved = true;
    },
  },
});
// console.log(slice);
export default slice.reducer;
export const {
  bugAdded,
  bugsRecieved,
  bugsRequestFailed,
  bugsRequested,
  bugResolved,
  bugAssignedToUser,
} = slice.actions;

//without selector
// export function unresolvedBugs(state) {
//   return state.entities.bugs.filter((bug) => !bug.resolved);
// }
let url = "/bugs";
export const loadBugs = () => (dispatch, getState) => {
  // const { lastFetch } = getState().entities.bugs;
  // const diffInMinutes = moment().diff(moment(lastFetch), "minutes");
  // if (diffInMinutes < 10) return;

  dispatch(
    apiCallBegan({
      url,
      onStart: bugsRequested.type,
      onSuccess: bugsRecieved.type,
      onError: bugsRequestFailed.type,
    })
  );
};
// export const loadBugs = () =>
//   apiCallBegan({
//     url,
//     onStart: bugsRequested.type,
//     onSuccess: bugsRecieved.type,
//     onError: bugsRequestFailed.type,
//   });

export const unresolvedBugs = createSelector(
  (state) => state.entities.bugs,
  (bugs) => bugs.filter((bug) => !bug.resolved)
);

export const getBugsByUser = (userId) =>
  createSelector(
    (state) => state.entities.bugs,
    (bugs) => bugs.filter((bug) => bug.userId === userId)
  );
// with toolkit without slice fn
// export default createReducer([], {
//   [bugAdded.type]: (state, action) => {
//     state.push({
//       id: ++lastId,
//       description: action.payload.description,
//       resolved: false,
//     });
//   },
//   [bugResolved.type]: (state, action) => {
//     const index = state.findIndex((bug) => bug.id === action.payload.id);
//     state[index].resolved = true;
//   },
//   [bugRemoved.type]: (state, action) => {
//     state.filter((bug) => bug.id !== action.payload.id);
//   },
// });
// without toolkit
// export default function reducer(state = [], action) {
//   switch (action.type) {
//     case bugAdded.type:
//       return [
//         ...state,
//         {
//           id: ++lastId,
//           description: action.payload.description,
//           resolved: false,
//         },
//       ];
//     case bugRemoved.type:
//       return state.filter((bug) => bug.id !== action.payload.id);
//     case bugResolved.type:
//       return state.map((bug) =>
//         bug.id !== action.payload.id ? bug : { ...bug, resolved: true }
//       );
//     default:
//       return state;
//   }
// }
