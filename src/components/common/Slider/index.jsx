import './style.scss';

const Slider = ({ value, min, max, step, onChange, ariaLabel }) => (
  <input
    type="range"
    className="custom-range-slider"
    value={value}
    min={min}
    max={max}
    step={step}
    aria-label={ariaLabel}
    onChange={onChange}
  />
);

export default Slider;
