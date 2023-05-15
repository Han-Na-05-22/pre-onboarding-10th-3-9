import { TodoProps } from '../@types';
import TodoItem from './TodoItem';

const TodoList = ({ todos, setTodos }: { todos: TodoProps[]; setTodos: any }) => {
  return todos.length ? (
    <ul>
      {todos.map(({ id, title }) => (
        <TodoItem key={id} id={id} title={title} setTodos={setTodos} />
      ))}
    </ul>
  ) : (
    <div className="empty-list">...</div>
  );
};
export default TodoList;
