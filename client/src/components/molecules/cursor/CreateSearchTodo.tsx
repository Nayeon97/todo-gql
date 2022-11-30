import React, { useState } from "react";
import {
  useCreateTodoMutation,
  CursorTodoItems_TodoFragment,
} from "../../../gql/generated/graphql";
import Input from "../../atoms/Input/Input";
import { createTodoUpdator } from "../../../mutations/cursor/createTodoUpdator";
import styled from "styled-components";

interface CrateTodoProps {
  user: CursorTodoItems_TodoFragment;
  getData: (search: string) => void;
}

const CreateSearchTodo = ({ user, getData }: CrateTodoProps) => {
  const [text, setText] = useState<string>("");
  const [select, setSelect] = useState<string>("create");

  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    setText(e.currentTarget.value);
  };

  const [createTodo, { error }] = useCreateTodoMutation({
    update: createTodoUpdator(user),
  });

  if (error) return <p>`Error! ${error.message}`</p>;

  const handleKeyPress = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === "Enter") {
      if (select === "create") {
        onCreate();
      } else {
        onSearch();
      }
    }
  };

  const onCreate = () => {
    if (text && user.id) {
      createTodo({
        variables: { text: text, userId: user.id },
        optimisticResponse: {
          createTodo: {
            todoEdge: {
              cursor: "12345",
              node: {
                id: user.id,
                text: text,
                completed: false,
              },
            },
          },
        },
      });
      setText("");
    } else {
      alert("todo text XX");
    }
  };

  const onSearch = () => {
    getData(text);
  };

  const changeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelect(e.target.value);
  };

  return (
    <>
      <SelectContainer onChange={changeSelect}>
        <option value="create">create</option>
        <option value="search">search</option>
      </SelectContainer>
      <Input
        type="text"
        value={text}
        onChange={onChange}
        onKeyPress={handleKeyPress}
      />
    </>
  );
};

export default CreateSearchTodo;

const SelectContainer = styled.select`
  margin-right: 10px;
  margin-bottom: 10px;
  padding: 10px;
  border: none;
  background-color: skyblue;
  border-radius: 10px;
  font-size: 15px;
  color: white;
`;
