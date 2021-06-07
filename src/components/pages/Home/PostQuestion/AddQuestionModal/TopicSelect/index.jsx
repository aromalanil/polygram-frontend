import { useState } from 'react';
import AsyncSelect from 'react-select/async';

import './style.scss';
import { getTopics } from '../../../../../../api/topic';
import useDebounce from '../../../../../../hooks/useDebounce';

const TopicSelect = ({ setTopics }) => {
  const [selectionCount, setSelectionCount] = useState(0);

  const handleTopicChange = (options) => {
    setSelectionCount(options.length);
    setTopics(options.map((option) => option.value));
  };

  const loadOptions = useDebounce(async (inputValue, callback) => {
    const fetchedTopics = await getTopics({ search: inputValue, limit: 2 });
    callback(fetchedTopics.map((topic) => ({ label: topic.name, value: topic.name })));
  }, 600);

  return (
    <div className="topic-select-wrapper">
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label htmlFor="topic-select">Topics</label>
      <AsyncSelect
        isMulti
        defaultOptions
        cacheOptions={false}
        name="topic-select"
        loadOptions={selectionCount < 2 ? loadOptions : (_, callback) => callback([])}
        onChange={handleTopicChange}
        classNamePrefix="topic-select"
        className="topic-select-container"
        noOptionsMessage={() =>
          selectionCount < 2 ? 'No Topic Found' : 'User can only select upto 5 topics'
        }
      />
    </div>
  );
};

export default TopicSelect;
