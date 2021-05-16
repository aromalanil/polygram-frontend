import './style.scss';

const getClassNameFromVariant = (variant) => {
  let className;
  switch (variant) {
    case 'primary':
      className = 'primary-btn';
      break;
    case 'secondary':
      className = 'secondary-btn';
      break;
    default:
      throw new Error('Invalid button variant');
  }
  return className;
};

const Button = ({ variant = 'primary', children, isLoading, className, ...props }) => {
  const modifiedClassName = `btn ${
    isLoading ? 'loading' : ' '
  } ${className} ${getClassNameFromVariant(variant)}`;

  return (
    <button className={modifiedClassName} {...props}>
      {children}
    </button>
  );
};

export default Button;
