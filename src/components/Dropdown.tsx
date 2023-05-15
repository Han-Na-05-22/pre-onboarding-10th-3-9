import { useEffect, useState } from 'react';

/* eslint-disable react/no-array-index-key */
const Dropdown = (searchData: any) => {
  const [dropData, setDropData] = useState<any[]>([]);

  useEffect(() => {
    if (searchData !== undefined) {
      setDropData(searchData?.searchData);
    }
  }, [searchData]);

  return (
    <div className="dropdown-container">
      {searchData !== undefined && dropData && (
        <ul className="dropdown-list">
          {dropData.map((i: string, idx: number) => (
            <li key={idx}>
              <p>{i}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
