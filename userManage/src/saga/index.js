import createSagaMiddleware from "redux-saga";
import { all } from "redux-saga/effects";

import { usersSaga } from "./users";

export function* mySaga() {
  yield all([usersSaga()]);
}
