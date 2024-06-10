import { ADD_USER, LOGIN_USER, LOGOUT_USER, SAVE_PROFILE } from '../actionTypes';

const initialState = {
  users: JSON.parse(localStorage.getItem('users')) || [],
  profile: JSON.parse(localStorage.getItem('profile')) || null,
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_USER:
      const updatedUsers = [...state.users, action.payload];
      localStorage.setItem('users', JSON.stringify(updatedUsers));
      return {
        ...state,
        users: updatedUsers,
      };
    case LOGIN_USER:
      localStorage.setItem('profile', JSON.stringify(action.payload));
      return {
        ...state,
        profile: action.payload,
      };
    case LOGOUT_USER:
      localStorage.removeItem('profile');
      return {
        ...state,
        profile: null,
      };
    case SAVE_PROFILE:
      localStorage.setItem('profile', JSON.stringify(action.payload));
      return {
        ...state,
        profile: action.payload,
      };
    default:
      return state;
  }
};

export default profileReducer;
