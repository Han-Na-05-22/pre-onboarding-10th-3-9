/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable consistent-return */

import { FaSpinner } from 'react-icons/fa';
import { useCallback, useEffect, useState } from 'react';

import SVG from 'react-inlinesvg';

import { createTodo } from '../api/todo';
import useFocus from '../hooks/useFocus';
import { TodoProps } from '../@types';
import { getSearchData } from '../api/search';
import Dropdown from './Dropdown';

const InputTodo = ({ setTodos }: any) => {
  const [inputText, setInputText] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { ref, setFocus } = useFocus<any>();
  const [searchList, setSearchList] = useState<[] | undefined>(undefined);

  useEffect(() => {
    setFocus();
  }, [setFocus]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      try {
        e.preventDefault();
        setIsLoading(true);

        const trimmed = inputText.trim();
        if (!trimmed) {
          return alert('Please write something');
        }

        const newItem = { title: trimmed };
        const { data } = await createTodo(newItem);

        if (data) {
          return setTodos((prev: TodoProps[]) => [...prev, data]);
        }
      } catch (error) {
        console.error(error);
        alert('Something went wrong.');
      } finally {
        setInputText('');
        setIsLoading(false);
      }
    },
    [inputText, setTodos],
  );

  useEffect(() => {
    getSearchData(inputText, setSearchList);
  }, [inputText]);

  return (
    <>
      <form className="form-container" onSubmit={handleSubmit}>
        <button className="input-submit" type="submit">
          <SVG src="/svg/search.svg" className="search-svg" />
        </button>
        <input
          className="input-text"
          placeholder="Add new todo..."
          ref={ref}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          disabled={isLoading}
        />
        {isLoading && <FaSpinner className="spinner" />}
      </form>
      {searchList?.length !== 0 && inputText.length !== 0 && (
        <Dropdown searchData={searchList} setInputText={setInputText} />
      )}
    </>
  );
};

export default InputTodo;
