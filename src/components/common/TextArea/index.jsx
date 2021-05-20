import { useCallback } from 'react';
import useDebounce from '../../../hooks/useDebounce';
import './style.scss';

const TextArea = ({
  label,
  name,
  error,
  value,
  pattern,
  onChange,
  setError,
  className,
  maxLength,
  minLength,
  patternMessage,
  ...props
}) => {
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
    <div className={`textarea-wrapper ${className || ''}`}>
      <div className="textarea-with-label">
        <textarea
          value={value}
          onChange={handleInputChange}
          name={name || 'textarea-input'}
          {...props}
        />
        <label htmlFor={name}>{label}</label>
      </div>
      {error !== '' && <span className="textarea-error">{error}</span>}
    </div>
  );
};

export default TextArea;
