import { useState } from 'react';

import './style.scss';
import OpinionModal from './OpinionModal';
import useProtectedFunction from '../../../../hooks/useProtectedFunction';

const Options = ({ options, showPercentage, questionId }) => (
  <div className="card-options">
    {options.map((option) =>
      showPercentage ? (
        <OptionWithPercentage key={option.name} name={option.name} percentage={option.percentage} />
      ) : (
        <VoteButton name={option.name} key={option.name} questionId={questionId} />
      )
    )}
  </div>
);

const OptionWithPercentage = ({ name, percentage }) => {
  const percentageToDisplay = percentage % 1 === 0 ? percentage : percentage.toFixed(2);

  return (
    <div className="option-with-percentage">
      <div className="option-background" style={{ width: `${percentage}%` }} />
      <span className="option-name">{name}</span>
      <span className="option-percentage">{percentageToDisplay}%</span>
    </div>
  );
};

const VoteButton = ({ name, questionId }) => {
  const [showOpinionModal, setShowOpinionModal] = useState(false);
  const protectFunction = useProtectedFunction();

  const handleClick = protectFunction(() => setShowOpinionModal(true));
  return (
    <>
      <div className="vote-button" role="button" tabIndex={0} onClick={handleClick}>
        {name}
      </div>
      <OpinionModal
        option={name}
        questionId={questionId}
        isOpen={showOpinionModal}
        onClose={() => setShowOpinionModal(false)}
      />
    </>
  );
};
export default Options;
