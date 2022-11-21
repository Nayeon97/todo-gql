import { ComponentStory, ComponentMeta } from "@storybook/react";
import { useState } from "react";
import { Todo } from "../../gql/generated/graphql";
import TodoItem from "./TodoItem";

export default {
  title: "TodoItem",
  component: TodoItem,
} as ComponentMeta<typeof TodoItem>;

const Template: ComponentStory<typeof TodoItem> = (args) => (
  <TodoItem {...args} />
);

export const Standard = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [editTodo, setEditTodo] = useState<Todo[]>([]);

  const todo = {
    id: "1",
    text: "storybook",
    completed: false,
  };

  return (
    <TodoItem
      todo={todo}
      setEditTodo={setEditTodo}
      setIsEdit={setIsEdit}
      isEdit={isEdit}
    />
  );
};

export const Complete = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [editTodo, setEditTodo] = useState<Todo[]>([]);

  const todo = {
    id: "1",
    text: "storybook",
    completed: true,
  };

  return (
    <TodoItem
      todo={todo}
      setEditTodo={setEditTodo}
      setIsEdit={setIsEdit}
      isEdit={isEdit}
    />
  );
};

export const Edit = () => {
  const [isEdit, setIsEdit] = useState(true);
  const [editTodo, setEditTodo] = useState<Todo[]>([]);

  const todo = {
    id: "1",
    text: "storybook",
    completed: false,
  };

  return (
    <TodoItem
      todo={todo}
      setEditTodo={setEditTodo}
      setIsEdit={setIsEdit}
      isEdit={isEdit}
    />
  );
};
