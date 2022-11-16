import { ToggleCompleteTodo_TodoFragment } from '../../gql/generated/graphql';
import Button from '../atoms/Button';
import { useToggleTodoMutation } from './ToggleCompleteTodo.generated';

interface ToggleCompleteTodoProps {
  todo: ToggleCompleteTodo_TodoFragment;
  isEdit: boolean;
}

const ToggleCompleteTodo = ({ todo, isEdit }: ToggleCompleteTodoProps) => {
  const { id, completed } = todo;
  const [toggleTodo, { error }] = useToggleTodoMutation();

  if (error) return <p>`Error! ${error.message}`</p>;

  const toggleShowComplete = () => {
    toggleTodo({ variables: { id: id, completed: completed } });
  };

  return (
    <Button
      onClick={toggleShowComplete}
      btnType={completed ? 'default' : 'inComplete'}
      name={completed ? '완료' : '미완료'}
      disabled={isEdit ? true : false}
    />
  );
};

export default ToggleCompleteTodo;
