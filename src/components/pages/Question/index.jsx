import { useRef } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { useHistory, useParams } from 'react-router-dom';

import Opinions from './Opinions';
import IconButton from '../../common/IconButton';
import DetailedQuestion from './DetailedQuestion';
import { RefetchRefProvider } from './isDataUpdated';

const Question = () => {
  const { id } = useParams();
  const history = useHistory();
  const refetchDataRef = useRef();

  return (
    <RefetchRefProvider value={refetchDataRef}>
      <div className="page-back">
        <IconButton className="back-btn" onClick={() => history.goBack()}>
          <FiArrowLeft />
        </IconButton>
        <h2>Question</h2>
      </div>
      <DetailedQuestion refetchDataRef={refetchDataRef} id={id} />
      <Opinions question_id={id} />
    </RefetchRefProvider>
  );
};

export default Question;
