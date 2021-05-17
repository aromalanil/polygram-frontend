import './style.scss';

const Loader = ({ className }) => (
  <div className="loader-container">
    <div className={`loader ${className}`}>
      <div />
      <div />
      <div />
      <div />
    </div>
  </div>
);

export default Loader;
