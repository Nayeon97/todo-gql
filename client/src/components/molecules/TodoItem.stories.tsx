import { ComponentMeta, ComponentStory } from '@storybook/react';
import TodoItem from './TodoItem';

export default {
  title: 'TodoItem',
  component: TodoItem,
} as ComponentMeta<typeof TodoItem>;

const Template: ComponentStory<typeof TodoItem> = (args) => (
  <TodoItem {...args} />
);

export const Standard = Template.bind({});
Standard.args = {
  todo: {
    cursor: '12345',
    node: {
      id: '1',
      text: 'storybook',
      completed: false,
    },
  },
};

export const Complete = Template.bind({});
Complete.args = {
  todo: {
    cursor: '12345',
    node: {
      id: '1',
      text: 'storybook',
      completed: true,
    },
  },
};

export const Edit = Template.bind({});
Edit.args = {
  todo: {
    cursor: '12345',
    node: {
      id: '1',
      text: 'storybook',
      completed: false,
    },
  },
};
