import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";

import usersReducer from "./usersReducer";
import profileReducer from "./profileReducer";
import { mySaga } from "../saga";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    users: usersReducer,
    profile: profileReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(mySaga);

export default store;
