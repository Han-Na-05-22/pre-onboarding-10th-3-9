/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useEffect, useState } from 'react';

/* eslint-disable react/no-array-index-key */
const Dropdown = ({ searchData, setInputText }: any) => {
  return (
    <div className="dropdown-container">
      {searchData !== undefined && (
        <ul className="dropdown-list">
          {searchData.map((i: string, idx: number) => (
            <li key={idx}>
              <p onClick={() => setInputText(i)}>{i}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
