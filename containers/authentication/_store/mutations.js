const SET_USER = (state, user) => {
  if (!user) {
    return;
  }
  state.user.id = user.uid;
  state.user.email = user.email;
};
const SET_IS_AUTHENTICATED = (state, isAuthenticated) => {
  state.user.isAuthenticated = isAuthenticated;
};

export default {
  SET_USER,
  SET_IS_AUTHENTICATED,
};
