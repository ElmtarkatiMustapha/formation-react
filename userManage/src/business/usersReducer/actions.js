export const ADD_USER = "ADD_USER";
export const UPDATE_USER = "UPDATE_USER";
export const DELETE_USER = "DELETE_USER";
export const FETCH_USER = "FETCH_USER";
// SUCCESS
export const FETCH_USERS_REQUEST = "FETCH_USERS_REQUEST";
export const FETCH_USERS_SUCCESS = "FETCH_USERS_SUCCESS";
export const FETCH_USERS_ERROR = "FETCH_USERS_ERROR";

export const addUser = (user) => ({ payload: { user }, type: ADD_USER });
export const updateUser = (user) => {};
export const deleteUser = (id) => ({ payload: { id }, type: DELETE_USER });
export const fetchUser = (id) => {};

//  success
export const fetchUsersSuccess = (users) => ({
  payload: { users },
  type: FETCH_USERS_SUCCESS,
});

// fetches users error
export const fetchUsersError = (error) => ({
  payload: { error },
  type: FETCH_USERS_ERROR,
});

export const fetchUsersRequest = () => ({
  type: FETCH_USERS_REQUEST,
});
