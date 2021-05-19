import { useLocation } from 'react-router-dom';
import SearchBar from '../../common/SearchBar';
import UserFeed from '../../common/UserFeed';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Search = () => {
  const queries = useQuery();
  const searchQuery = queries.get('query');

  return (
    <>
      <SearchBar autoFocus initialQuery={searchQuery} />
      {searchQuery && <UserFeed search={searchQuery} />}
    </>
  );
};

export default Search;
