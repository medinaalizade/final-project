import { combineReducers } from 'redux';
import themeReducer from './themeReducer';
import profileReducer from './profileReducer';

const rootReducer = combineReducers({
  theme: themeReducer,
  profile: profileReducer,
});

export default rootReducer;
