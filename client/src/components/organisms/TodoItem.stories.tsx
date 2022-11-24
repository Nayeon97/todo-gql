import { ComponentMeta, ComponentStory } from "@storybook/react";
import TodoItem from "./OffsetTodoItems";

export default {
  title: "TodoItem",
  component: TodoItem,
} as ComponentMeta<typeof TodoItem>;

const Template: ComponentStory<typeof TodoItem> = (args) => (
  <TodoItem {...args} />
);

// export const Standard = Template.bind({});
// Standard.args = {
//   todo: {
//     id: '1',
//     text: 'storybook',
//     completed: false,
//   },
// };

// export const Complete = Template.bind({});
// Complete.args = {
//   todo: {
//     id: '1',
//     text: 'storybook',
//     completed: true,
//   },
// };

// export const Edit = Template.bind({});
// Edit.args = {
//   todo: {
//     id: '1',
//     text: 'storybook',
//     completed: false,
//   },
// };
