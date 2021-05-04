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

const Button = (props) => {
  const { variant, children, className, ...otherProps } = props;
  const modifiedClassName = `btn ${className} ${getClassNameFromVariant(variant)}`;

  return (
    <button className={modifiedClassName} {...otherProps}>
      {children}
    </button>
  );
};

export default Button;
