const initialState = {
  loading: true,
  profile: {},
  error: null,
};

// gerer les utilisateurs
const profileReducer = (state = initialState, action) => {
  const { payload, type } = action;

  return state;
};

export default profileReducer;
