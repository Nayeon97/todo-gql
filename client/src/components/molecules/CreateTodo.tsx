import React, { useState } from 'react';
import {
  useCreateTodoMutation,
  CursorTodoItems_TodoFragment,
} from '../../gql/generated/graphql';
import Input from '../atoms/Input/Input';
import { updator } from '../../mutations/createTodo/updator';
import { useParams } from 'react-router-dom';

interface CrateTodoProps {
  user: CursorTodoItems_TodoFragment;
}

const CreateTodo = ({ user }: CrateTodoProps) => {
  const [text, setText] = useState<string>('');
  const params = useParams();
  const userId = params?.userId;

  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    setText(e.currentTarget.value);
  };

  const [createTodo, { error }] = useCreateTodoMutation({
    update: updator(user),
  });

  if (error) return <p>`Error! ${error.message}`</p>;

  const onCreate = () => {
    if (text && userId) {
      createTodo({
        variables: { text: text, userId: userId },
        // optimisticResponse: {
        //   createTodo: {
        //     id: user.totalTodoCount + "1",
        //     text: text,
        //     completed: false,
        //   },
        // },
      });
      setText('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === 'Enter') {
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
