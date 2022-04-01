import { UPDATE_FORM } from 'actions/types';

const initialState: any = {};
export default function (state = initialState, action: { type: string; payload: any }) {
  switch (action.type) {
    case UPDATE_FORM:
      return action.payload;
    default:
      return state;
  }
}
