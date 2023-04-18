import styles from './Button.module.scss';

const Button = ({ children, handleClick }) => {
  return <button type="button" className={styles.btn} onClick={handleClick}>{children}</button>;
};

export default Button;
