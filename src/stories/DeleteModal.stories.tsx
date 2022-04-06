import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import DeleteModal from 'components/DeleteModal';

export default {
  title: 'Modal/DeleteModal',
  component: DeleteModal,
  argTypes: {},
} as ComponentMeta<typeof DeleteModal>;

const Template: ComponentStory<typeof DeleteModal> = (args) => <DeleteModal {...args} />;

export const DefaultDeleteModal = Template.bind({});
DefaultDeleteModal.args = {
  open: true,
};
