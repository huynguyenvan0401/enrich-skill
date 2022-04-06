import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import EditModal from 'components/EditModal';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

export default {
  title: 'Modal/EditModal',
  component: EditModal,
  argTypes: {},
} as ComponentMeta<typeof EditModal>;

const Template: ComponentStory<typeof EditModal> = (args) => {
  const initialState = {};
  const mockStore = configureStore();
  const store = mockStore(initialState);
  return (
    <Provider store={store}>
      <EditModal {...args} />
    </Provider>
  );
};

export const DefaultEditModal = Template.bind({});
DefaultEditModal.args = {
  open: true,
  mode: 'edit',
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
