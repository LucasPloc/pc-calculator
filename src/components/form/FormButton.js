import classes from './FormButton.module.css';

const FormButton = ({ children }) => {
  return (
    <button className={classes.button} type='submit'>
      {children}
    </button>
  );
};

export default FormButton;
