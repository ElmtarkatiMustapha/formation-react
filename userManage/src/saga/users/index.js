import { call, put, select, takeLatest } from "redux-saga/effects";

import {
  ADD_USER_ERROR,
  ADD_USER_REQUEST,
  ADD_USER_SUCCESS,
  FETCH_USER_ERROR,
  FETCH_USER_REQUEST,
  FETCH_USER_SUCCESS,
  FETCH_USERS_ERROR,
  FETCH_USERS_REQUEST,
  FETCH_USERS_SUCCESS,
} from "../../business/usersReducer/actions";

export function* fetchUsers() {
  try {
    const response = yield call(() => fetch("http://localhost:8181/api/users"));

    const users = yield response.json();

    yield put({ type: FETCH_USERS_SUCCESS, payload: { users } });
  } catch (e) {
    yield put({ type: FETCH_USERS_ERROR, payload: { error: e.message } });
  }
}

export function* fetchUser(action) {
  try {
    const _selected_user = yield select((store) =>
      store.users.data.find((user) => user.id === action.id),
    );

    if (_selected_user) {
      yield put({
        type: FETCH_USER_SUCCESS,
        payload: { user: _selected_user },
      });
      return;
    }

    const response = yield call(() => fetch(`/api/users/${action.id}`));
    const user = yield response.json();

    yield put({ type: FETCH_USER_SUCCESS, payload: { user } });
  } catch (e) {
    yield put({ type: FETCH_USER_ERROR, payload: { error: e.message } });
  }
}

export function* addUser(action) {
  try {
    const { user } = action;
    const response = yield call(() =>
      fetch("http://localhost:8181/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      }),
    );

    yield put({ type: ADD_USER_SUCCESS, payload: { user } });
  } catch (e) {
    yield put({ type: ADD_USER_ERROR, payload: { error: e.message } });
  }
}

export function* usersSaga() {
  yield takeLatest(FETCH_USERS_REQUEST, fetchUsers);
  yield takeLatest(FETCH_USER_REQUEST, fetchUser);
  yield takeLatest(ADD_USER_REQUEST, addUser);
}
