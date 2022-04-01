import axios from 'axios';
import { FETCH_DATA, SAVE_DATA, DELETE_DATA, ADD_DATA } from 'actions/types';

export const fetchRepoData = () => async (dispatch: any) => {
  const data = await axios.get('https://api.github.com/users/defunkt/repos');
  dispatch({ type: FETCH_DATA, payload: data.data });
};

export const saveRepoData = (data: {}) => async (dispatch: any) => {
  dispatch({ type: SAVE_DATA, payload: data });
};

export const deleteRepoData = (data: {}) => async (dispatch: any) => {
  dispatch({ type: DELETE_DATA, payload: data });
};

export const addRepoData = (data: {}) => async (dispatch: any) => {
  dispatch({ type: ADD_DATA, payload: data });
};
