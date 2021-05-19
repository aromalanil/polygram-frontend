import './style.scss';

const TextArea = ({ label, name, onChange, className, value, error, ...props }) => (
  <div className={`textarea-wrapper ${className || ''}`}>
    <div className="textarea-with-label">
      <textarea value={value} onChange={onChange} name={name || 'textarea-input'} {...props} />
      <label htmlFor={name}>{label}</label>
    </div>
    {error !== '' && <span className="textarea-error">{error}</span>}
  </div>
);

export default TextArea;
