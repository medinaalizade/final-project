import { ADD_USER, LOGIN_USER, LOGOUT_USER, SAVE_PROFILE } from '../actionTypes';

export const addUser = (user) => ({
  type: ADD_USER,
  payload: user,
});

export const loginUser = (user) => ({
  type: LOGIN_USER,
  payload: user,
});

export const logoutUser = () => ({
  type: LOGOUT_USER,
});

export const saveProfile = (profile) => ({
  type: SAVE_PROFILE,
  payload: profile,
});
