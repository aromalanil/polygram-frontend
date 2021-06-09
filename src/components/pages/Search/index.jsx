import { useHistory, useLocation } from 'react-router-dom';

import './style.scss';
import Tab from '../../common/Tab';
import UserFeed from '../../common/UserFeed';
import TopicFeed from '../../common/TopicFeed';
import SearchBar from '../../common/SearchBar';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Search = () => {
  const queries = useQuery();
  const history = useHistory();
  const activeTab = queries.get('tab') ?? 'Questions';
  const searchQuery = queries.get('query') ?? '';

  const changeActiveTab = (tab) => {
    history.push({
      pathname: '/search',
      search: `?query=${searchQuery}&tab=${tab}`,
    });
  };

  return (
    <>
      <SearchBar
        tab={activeTab}
        className="large-search-bar"
        autoFocus
        initialQuery={searchQuery}
      />
      <Tab
        activeTab={activeTab}
        tabNames={['Questions', 'Topics']}
        setActiveTab={changeActiveTab}
      />
      {activeTab === 'Questions' && <UserFeed search={searchQuery} />}
      {activeTab === 'Topics' && <TopicFeed search={searchQuery} />}
    </>
  );
};

export default Search;
