import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import EditModal, { Props } from 'components/EditModal';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

function renderEditModal(props: Partial<Props> = {}) {
  const defaultProps: Props = {
    toggle() {},
    open: true,
    onFormChange() {},
    mode: 'add',
    form: {
      id: '',
      name: '',
      description: '',
      watchers: 0,
      language: '',
      openIssues: 0,
      private: '',
    },
  };
  const initialState = {};
  const mockStore = configureStore();
  const store = mockStore(initialState);
  return render(
    <Provider store={store}>
      <EditModal {...defaultProps} {...props} />
    </Provider>
  );
}

describe('<EditModal />', () => {
  it('Edit modal display correctly by default with mode is ADD', () => {
    const { getByTestId } = renderEditModal();

    const name = getByTestId('name') as HTMLInputElement;
    const description = getByTestId('description') as HTMLInputElement;
    const watchers = getByTestId('watchers') as HTMLInputElement;
    const language = getByTestId('language') as HTMLInputElement;
    const openIssues = getByTestId('openIssues') as HTMLInputElement;
    const privateSelect = getByTestId('private') as HTMLSelectElement;

    expect(name.value).toBe('');
    expect(description.value).toBe('');
    expect(watchers.value).toBe('0');
    expect(language.value).toBe('');
    expect(openIssues.value).toBe('0');
    expect(privateSelect.value).toBe('');
  });

  it('Edit modal display correctly by default with mode is EDIT', () => {
    const { getByTestId } = renderEditModal({ mode: 'edit' });

    const id = getByTestId('id') as HTMLInputElement;
    const name = getByTestId('name') as HTMLInputElement;
    const description = getByTestId('description') as HTMLInputElement;
    const watchers = getByTestId('watchers') as HTMLInputElement;
    const language = getByTestId('language') as HTMLInputElement;
    const openIssues = getByTestId('openIssues') as HTMLInputElement;
    const privateSelect = getByTestId('private') as HTMLSelectElement;

    expect(id.value).toBe('');
    expect(id).toBeDisabled();
    expect(name.value).toBe('');
    expect(description.value).toBe('');
    expect(watchers.value).toBe('0');
    expect(language.value).toBe('');
    expect(openIssues.value).toBe('0');
    expect(privateSelect.value).toBe('');
  });

  it('Modal is closed when click Cancel button', () => {
    const toggle = jest.fn();
    const { getByTestId } = renderEditModal({ mode: 'edit', toggle });

    const cancelBtn = getByTestId('cancel-button');
    fireEvent.click(cancelBtn);
    expect(toggle).toBeCalled();
  });

  it('onFormChange is called when form changed', () => {
    const onFormChange = jest.fn();
    const { getByTestId } = renderEditModal({ mode: 'edit', onFormChange });

    const name = getByTestId('name') as HTMLInputElement;
    fireEvent.change(name, { target: { value: 'My name' } });
    expect(onFormChange).toHaveBeenCalledWith('name', 'My name');
  });
});
