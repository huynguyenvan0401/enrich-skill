import { combineReducers } from 'redux';
import data from './dataRepoReducer';

export const rootReducer = combineReducers({
  data,
});

export type RootState = ReturnType<typeof rootReducer>;
