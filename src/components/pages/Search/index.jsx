import { useState } from 'react';
import { useLocation } from 'react-router-dom';

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
  const searchQuery = queries.get('query');
  const [activeTab, setActiveTab] = useState(queries.get('tab') ?? 'Questions');

  return (
    <>
      <SearchBar className="large-search-bar" autoFocus initialQuery={searchQuery} />
      <Tab
        activeTab={activeTab}
        tabNames={['Questions', 'Topics']}
        setActiveTab={(tab) => setActiveTab(tab)}
      />
      {activeTab === 'Questions' && <UserFeed search={searchQuery} />}
      {activeTab === 'Topics' && <TopicFeed search={searchQuery} />}
    </>
  );
};

export default Search;
