import { ADD_USER, DELETE_USER } from "./actions";

const initialState = {
  loading: true,
  users: [],
  error: null,
};

const usersReducer = (state = initialState, action) => {
  const { payload, type } = action;

  switch (type) {
    case ADD_USER:
      return { ...state, users: [...state.users, payload.user] };
    case DELETE_USER:
      return {
        ...state,
        users: state.users.filter((user) => user.id !== payload.id),
      };
  }

  return state;
};

export default usersReducer;
