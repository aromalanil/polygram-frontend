import { useCallback, useState } from 'react';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

import './style.scss';
import useDebounce from '../../../hooks/useDebounce';

const TextInput = ({
  name,
  error,
  value,
  label,
  pattern,
  onChange,
  setError,
  className,
  maxLength,
  minLength,
  type = 'text',
  patternMessage,
  ...props
}) => {
  const [inputType, setInputType] = useState(type);

  const handleTogglePassword = () => {
    setInputType((previousType) => (previousType === 'password' ? 'text' : 'password'));
  };

  const validateInput = useDebounce(
    (input, fieldName, _setError, { _minLength, _maxLength, _pattern, _patternMessage }) => {
      // _setError(null);
      const inputLength = input.length;
      if (_minLength !== undefined) {
        if (inputLength < _minLength) {
          return _setError(`${fieldName} should at least contain ${_minLength} characters`);
        }
      }
      if (_maxLength !== undefined) {
        if (inputLength > _maxLength) {
          return _setError(`${fieldName} should not exceed ${_maxLength} characters`);
        }
      }
      if (_pattern !== undefined) {
        if (!_pattern.test(input)) {
          return _setError(_patternMessage ?? `Please enter a valid ${fieldName}`);
        }
      }
      return null;
    },
    600
  );

  const handleInputChange = useCallback(
    (e) => {
      if (error) setError(null);
      validateInput(e.target.value, label, setError, {
        _minLength: minLength,
        _maxLength: maxLength,
        _pattern: pattern,
        _patternMessage: patternMessage,
      });
      onChange(e);
    },
    [setError, onChange, validateInput, label, error, minLength, maxLength, pattern, patternMessage]
  );

  return (
    <div className={`input-wrapper ${className || ''}`}>
      <div className="input-with-label">
        <input
          {...props}
          value={value}
          type={inputType}
          onChange={handleInputChange}
          className={type === 'password' ? 'password-input' : ''}
          name={name ?? 'text-input'}
        />
        <label htmlFor={name ?? 'text-input'}>{label}</label>
        {type === 'password' && (
          <TogglePasswordIcon onClick={handleTogglePassword} visible={inputType === 'password'} />
        )}
      </div>
      {error !== '' && <span className="input-error">{error}</span>}
    </div>
  );
};

const TogglePasswordIcon = ({ visible, onClick }) => (
  <div className="password-toggle" role="button" tabIndex={0} onClick={onClick}>
    {visible ? <AiFillEyeInvisible /> : <AiFillEye />}
  </div>
);

export default TextInput;
