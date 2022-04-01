import { UPDATE_FORM } from 'actions/types';

const updateForm = (form: any) => async (dispatch: any) => {
  dispatch({ type: UPDATE_FORM, payload: form });
};

export default updateForm;
