import './style.scss';
import { useState } from 'react';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

const TextInput = ({ label, name, onChange, value, error, type = 'text', ...props }) => {
  const [inputType, setInputType] = useState(type);

  const handleTogglePassword = () => {
    setInputType((previousType) => (previousType === 'password' ? 'text' : 'password'));
  };

  return (
    <div className={`input-wrapper ${error ? 'input-error' : ''}`}>
      <div className="input-with-label">
        <input
          {...props}
          value={value}
          type={inputType}
          onChange={onChange}
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
