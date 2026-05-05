export const DELETE_USER = "DELETE_USER";

export const FETCH_USER = "FETCH_USER";

export const FETCH_USER_REQUEST = "FETCH_USER_REQUEST";
export const FETCH_USER_SUCCESS = "FETCH_USER_SUCCESS";
export const FETCH_USER_ERROR = "FETCH_USER_ERROR";

export const fetchUserRequest = (id) => ({ type: FETCH_USER_REQUEST, id }); // actionobj = {} react-query => redux & saga & cache

// UPDATE USER ACTIONS
export const UPDATE_USER_REQUEST = "UPDATE_USER";
export const UPDATE_USER_SUCCESS = "UPDATE_USER_SUCCESS";
export const UPDATE_USER_ERROR = "UPDATE_USER_ERROR";
// saga
export const updateUserRequest = () => ({
  type: UPDATE_USER_REQUEST,
});

export const updateUserSuccess = (user) => ({
  payload: { user },
  type: UPDATE_USER_SUCCESS,
});

export const updateUserError = (error) => ({
  payload: { error },
  type: UPDATE_USER_ERROR,
});

// SUCCESS
export const FETCH_USERS_REQUEST = "FETCH_USERS_REQUEST";
export const FETCH_USERS_SUCCESS = "FETCH_USERS_SUCCESS";
export const FETCH_USERS_ERROR = "FETCH_USERS_ERROR";

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

// ADD ACTIONS
// action Type & payload
// REQUEST => axios SAGA vs HOOK
// success vs error
export const ADD_USER_REQUEST = "ADD_USER_REQUEST";
export const ADD_USER_SUCCESS = "ADD_USER_SUCCESS";
export const ADD_USER_ERROR = "ADD_USER_ERROR";

export const addUserRequest = (user) => ({
  type: ADD_USER_REQUEST,
  user,
});

export const addUserSuccess = (user) => ({
  type: ADD_USER_SUCCESS,
  payload: { user },
});

export const addUserError = (error) => ({
  payload: { error },
  type: ADD_USER_ERROR,
});
