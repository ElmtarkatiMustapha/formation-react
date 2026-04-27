import { configureStore } from "@reduxjs/toolkit";

import usersReducer from "./usersReducer";
import profileReducer from "./profileReducer";

const store = configureStore({
  reducer: {
    users: usersReducer,
    profile: profileReducer,
    // products
  },
});

export default store;
