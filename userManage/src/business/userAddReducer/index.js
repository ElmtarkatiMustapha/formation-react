import {
  TOGGLE_LOADING,
} from "./actions";

const initialState = {
  loading: false,
  formData: {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  },
  error: null,
};

const usersReducer = (state = initialState, action) => {
  const { payload, type } = action;

  switch (type) {
    case TOGGLE_LOADING:
      return { ...state, loading: !payload.loading };
  }

  return state;
};

export default usersReducer;
