import { FiTrash } from 'react-icons/fi';

import './style.scss';
import Button from '../../../../../common/Button';
import IconButton from '../../../../../common/IconButton';

const Options = ({ options, setOptions }) => {
  const onOptionChange = (index) => (e) => {
    const modifiedOptions = [...options];
    modifiedOptions[index] = { ...modifiedOptions[index], value: e.target.value };
    setOptions(modifiedOptions);
  };

  const onOptionRemove = (index) => () => {
    const modifiedOptions = [...options];
    modifiedOptions.splice(index, 1);
    setOptions(modifiedOptions);
  };

  const addOption = () => {
    setOptions([...options, { key: Math.random(), value: '' }]);
  };

  return (
    <div className="options">
      <p>Options</p>
      <div className="options-wrapper">
        {Object.values(options).map((option, index) => (
          <Option
            key={option.key}
            number={index + 1}
            value={option.value}
            canRemove={index > 1}
            onRemove={onOptionRemove(index)}
            onChange={onOptionChange(index)}
          />
        ))}
      </div>
      {options.length < 5 && (
        <Button className="add-option-btn" variant="secondary" type="button" onClick={addOption}>
          Add Option
        </Button>
      )}
    </div>
  );
};

const Option = ({ number, value, onChange, canRemove, onRemove }) => (
  <div className="option">
    <input placeholder={`Option ${number}`} type="text" value={value} onChange={onChange} />
    {canRemove && (
      <IconButton onClick={onRemove}>
        <FiTrash />
      </IconButton>
    )}
  </div>
);

export default Options;
