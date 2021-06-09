import { FiArrowLeft } from 'react-icons/fi';
import { useHistory, useParams } from 'react-router-dom';

import IconButton from '../../common/IconButton';
import UserFeed from '../../common/UserFeed';

const Topic = () => {
  const { name } = useParams();
  const history = useHistory();

  return (
    <>
      <div className="page-back">
        <IconButton className="back-btn" onClick={() => history.goBack()}>
          <FiArrowLeft />
        </IconButton>
        <h2>Topic {name}</h2>
      </div>
      <UserFeed topic={name} />
    </>
  );
};

export default Topic;
