import React, { useState } from "react";
import styled from "styled-components";
import {
  useCreateTodoMutation,
  OffsetTodoItems_TodoFragment,
} from "../../../gql/generated/graphql";
import Input from "../../atoms/Input/Input";
import { createTodoUpdator } from "../../../mutations/offset/createTodoUpdator";
import {} from "@apollo/client/link/error";

interface CrateTodoProps {
  user: OffsetTodoItems_TodoFragment;
}

const CreateTodo = ({ user }: CrateTodoProps) => {
  const [text, setText] = useState<string>("");

  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    setText(e.currentTarget.value);
  };

  // 비동기 요청이나 onError나 onCompleted에 따라 흐름이 달라져서 주의해야함
  const [createTodo] = useCreateTodoMutation({
    update: createTodoUpdator(user),
    // 뮤테이션에서는 보통 onError에서 처리
    onError: (error) => {
      // 코드를 사용하는게 중요
      alert(error.graphQLErrors[0].extensions.code);
    },
    onCompleted: () => {
      setText("");
    },
  });

  const onCreate = async () => {
    if (!text || !user.id) {
      alert("todo text XX");
      return;
    }

    await createTodo({
      variables: { text: text, userId: user.id },
    });
  };

  return (
    <>
      {/* 왠만하면 Form submit 활용하는게 접근성에 좋다 */}
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          onCreate();
        }}
      >
        <Input type="text" value={text} onChange={onChange} />
      </Form>
    </>
  );
};

export default CreateTodo;

const Form = styled.form`
  width: 100%;
  display: inline;
`;
