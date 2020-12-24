import { createAction, createReducer, createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
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
  initialState: [],
  reducers: {
    bugAssignedToUser: (state, action) => {
      const { bugId, userId } = action.payload;
      const index = state.findIndex((bug) => bug.id === bugId);
      state[index].userId = userId;
    },
    bugAdded: (state, action) => {
      state.push({
        id: ++lastId,
        description: action.payload.description,
        resolved: false,
      });
    },
    bugResolved: (state, action) => {
      const index = state.findIndex((bug) => bug.id === action.payload.id);
      state[index].resolved = true;
    },
  },
});
console.log(slice);
export default slice.reducer;
export const { bugAdded, bugResolved, bugAssignedToUser } = slice.actions;

//without selector
// export function unresolvedBugs(state) {
//   return state.entities.bugs.filter((bug) => !bug.resolved);
// }
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
