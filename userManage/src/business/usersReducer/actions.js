export const ADD_USER = "ADD_USER";
export const UPDATE_USER = "UPDATE_USER";
export const DELETE_USER = "DELETE_USER";
export const FETCH_USER = "FETCH_USER";
export const FETCH_USERS = "FETCH_USERS";

export const addUser = (user) => ({ payload: { user }, type: ADD_USER });
export const updateUser = (user) => {};
export const deleteUser = (id) => ({ payload: { id }, type: DELETE_USER });
export const fetchUser = (id) => {};
export const fetchUsers = () => {};
