/* eslint-disable react/button-has-type */
import { FaSpinner, FaTrash } from 'react-icons/fa';
import { useCallback, useState } from 'react';

import { deleteTodo } from '../api/todo';
import { TodoProps } from '../@types';

const TodoItem = ({ id, title, setTodos }: { id: string; title: string; setTodos: any }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleRemoveTodo = useCallback(async () => {
    try {
      setIsLoading(true);
      await deleteTodo(id);

      setTodos((prev: TodoProps[]) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error(error);
      alert('Something went wrong.');
    } finally {
      setIsLoading(false);
    }
  }, [id, setTodos]);

  return (
    <li className="item">
      <span>{title}</span>
      <div className="item-option">
        {!isLoading ? (
          <button onClick={() => handleRemoveTodo()}>
            <FaTrash className="btn-trash" />
          </button>
        ) : (
          <FaSpinner className="spinner" />
        )}
      </div>
    </li>
  );
};

export default TodoItem;
