import './style.scss';

const Avatar = ({ src, name, className }) => (
  <img src={src} alt={name} className={`avatar ${className}`} />
);

export default Avatar;
