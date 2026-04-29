import {
  ADD_USER,
  DELETE_USER,
  FETCH_USER,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_ERROR,
  FETCH_USERS_REQUEST,
  UPDATE_USER_SUCCESS,
} from "./actions";

const initialState = {
  loading: false,
  data: [],
  error: null,
};

const usersReducer = (state = initialState, action) => {
  const { payload, type } = action;

  switch (type) {
    case ADD_USER:
      return { ...state, data: [...state.data, payload.user] };
    case DELETE_USER:
      return {
        ...state,
        users: state.data.filter((user) => user.id !== payload.id),
      };
    case FETCH_USERS_SUCCESS:
      return {
        ...state,
        data: payload.users,
        loading: false,
        error: null,
      };
    case FETCH_USERS_ERROR:
      return {
        ...state,
        data: [],
        loading: false,
        error: payload.error,
      };

    case FETCH_USERS_REQUEST:
      return {
        ...state,
        data: [],
        loading: true,
        error: null,
      };

    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        data: state.data.map((user) =>
          user.id === payload.user.id ? payload.user : user,
        ),
        loading: false,
        error: null,
      };
    case FETCH_USERS_ERROR:
      return {
        ...state,
        loading: false,
        error: payload.error,
      };

    case FETCH_USERS_REQUEST:
      return {
        ...state,
        data: [],
        loading: true,
        error: null,
      };
  }

  return state;
};

export default usersReducer;
