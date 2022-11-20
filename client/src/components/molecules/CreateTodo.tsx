import React, { useState } from "react";
import { useCreateTodoMutation } from "../../gql/generated/graphql";
import Button from "../atoms/Button";
import Input from "../atoms/Input";
import { updator } from "../../mutations/createTodo/updator";

interface CrateTodoProps {
  data?: number;
}

const CreateTodo = ({ data }: CrateTodoProps) => {
  const [text, setText] = useState<string>("");

  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    setText(e.currentTarget.value);
  };

  const [createTodo, { loading, error }] = useCreateTodoMutation({
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

  return (
    <div>
      <Input type="text" value={text} onChange={onChange} name="todo" />
      <Button onClick={onCreate} name="+" btnType="default" />
    </div>
  );
};

export default CreateTodo;
