import { combineReducers } from 'redux';
import profileReducer from './profileReducer';
import themeReducer from './themeReducer';

const rootReducer = combineReducers({
  profile: profileReducer,
  theme: themeReducer,
});

export default rootReducer;