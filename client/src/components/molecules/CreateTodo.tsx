import React, { useState } from "react";
import { useCreateTodoMutation } from "../../gql/generated/graphql";
import Input from "../atoms/Input/Input";
import { updator } from "../../mutations/createTodo/updator";

interface CrateTodoProps {
  data?: number;
}

const CreateTodo = ({ data }: CrateTodoProps) => {
  const [text, setText] = useState<string>("");

  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    setText(e.currentTarget.value);
  };

  const [createTodo, { error }] = useCreateTodoMutation({
    update: updator(),
  });

  if (error) return <p>`Error! ${error.message}`</p>;

  const onCreate = () => {
    if (text) {
      createTodo({
        variables: { text: text },
        optimisticResponse: {
          createTodo: {
            __typename: "Todo",
            id: data + "1",
            text: text,
            completed: false,
          },
        },
      });
      setText("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === "Enter") {
      onCreate();
    }
  };

  return (
    <div>
      <Input
        type="text"
        value={text}
        onChange={onChange}
        onKeyPress={handleKeyPress}
      />
    </div>
  );
};

export default CreateTodo;
