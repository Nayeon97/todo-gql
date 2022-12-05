import React, { useState } from 'react';
import {
  useCreateTodoMutation,
  OffsetTodoItems_TodoFragment,
} from '../../../gql/generated/graphql';
import Input from '../../atoms/Input/Input';
import { createTodoUpdator } from '../../../mutations/offset/createTodoUpdator';
import {} from '@apollo/client/link/error';
import SnackBar from '../../atoms/ErrorSnackbar';

interface CrateTodoProps {
  user: OffsetTodoItems_TodoFragment;
  alignment: string;
  handleSearchTodos: (search: string) => void;
}

const CreateSearchTodo = ({
  user,
  handleSearchTodos,
  alignment,
}: CrateTodoProps) => {
  const [text, setText] = useState<string>('');

  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    setText(e.currentTarget.value);
  };

  const [createTodo, { error }] = useCreateTodoMutation({
    update: createTodoUpdator(user),
  });

  const handleKeyPress = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === 'Enter') {
      if (alignment === 'create') {
        onCreate();
      } else {
        onSearch();
      }
    }
  };

  if (error) {
    return (
      <div>
        <SnackBar
          isOpen={true}
          text={error.graphQLErrors[0].message}
          type="error"
        />
      </div>
    );
  }

  const onCreate = () => {
    if (text && user.id) {
      createTodo({
        variables: { text: text, userId: user.id },
      });

      setText('');
    } else {
      alert('todo text XX');
    }
  };

  const onSearch = async () => {
    handleSearchTodos(text);
  };

  return (
    <>
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
