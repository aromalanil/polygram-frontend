import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { BiSearchAlt2 } from 'react-icons/bi';

import './style.scss';
import IconButton from '../IconButton';

const SearchBar = ({ initialQuery, autoFocus, className, tab = '' }) => {
  const [query, setQuery] = useState('');
  const history = useHistory();

  const handleSearch = (e) => {
    e.preventDefault();
    const tempQuery = query;
    setQuery('');
    history.push({
      pathname: '/search',
      search: `?query=${tempQuery}&tab=${tab}`,
    });
  };

  useEffect(() => {
    setQuery(initialQuery ?? '');
  }, [initialQuery]);

  return (
    <form className={`search-bar ${className ?? ''}`} onSubmit={handleSearch}>
      <input
        type="text"
        value={query}
        placeholder="Search"
        autoFocus={autoFocus}
        onChange={(e) => setQuery(e.target.value)}
      />
      <IconButton label="Search Button" className="search-btn" type="submit">
        <BiSearchAlt2 />
      </IconButton>
    </form>
  );
};

export default SearchBar;
