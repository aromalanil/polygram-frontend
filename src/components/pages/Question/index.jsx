import { useHistory, useParams } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import './style.scss';
import Opinions from './Opinions';
import DetailedQuestion from './DetailedQuestion';
import IconButton from '../../common/IconButton';

const Question = () => {
  const { id } = useParams();
  const history = useHistory();

  return (
    <>
      <div className="question-back">
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
