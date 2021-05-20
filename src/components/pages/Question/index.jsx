import { FiArrowLeft } from 'react-icons/fi';
import { useHistory, useParams } from 'react-router-dom';

import Opinions from './Opinions';
import IconButton from '../../common/IconButton';
import DetailedQuestion from './DetailedQuestion';

const Question = () => {
  const { id } = useParams();
  const history = useHistory();

  return (
    <>
      <div className="page-back">
        <IconButton className="back-btn" onClick={() => history.goBack()}>
          <FiArrowLeft />
        </IconButton>
        <h2>Question</h2>
      </div>
      <DetailedQuestion id={id} />
      <Opinions question_id={id} />
    </>
  );
};

export default Question;
