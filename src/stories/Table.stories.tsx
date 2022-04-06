import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Table from 'components/Table';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { tableData } from './table-data';

export default {
  title: 'Table/Table',
  component: Table,
  argTypes: {},
} as ComponentMeta<typeof Table>;

const Template: ComponentStory<typeof Table> = (args) => {
  const initialState = {};
  const mockStore = configureStore();
  const store = mockStore(initialState);
  return (
    <Provider store={store}>
      <Table {...args} />
    </Provider>
  );
};

export const DefaultTable = Template.bind({});
DefaultTable.args = {
  rows: tableData,
};
