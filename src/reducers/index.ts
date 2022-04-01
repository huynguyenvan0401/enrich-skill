import { combineReducers } from 'redux';
import data from './dataRepoReducer';
import form from './formReducer';

export const rootReducer = combineReducers({
  data,
  form,
});

export type RootState = ReturnType<typeof rootReducer>;
