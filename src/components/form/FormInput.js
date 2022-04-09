import classes from './FormInput.module.css';

const Input = ({ type, label, onChange, value, valueType }) => {
  const inputType = type || 'input';

  return (
    <div className={classes['form-input']}>
      {label ? <label className={classes.label}>{label}:</label> : null}
      {inputType === 'input' ? (
        <input
          className={classes.input}
          type={valueType || 'text'}
          onChange={onChange}
          value={value}
        />
      ) : inputType === 'select' ? (
        <select onChange={onChange} value={value}>
          <option value=''>-- wybierz kategorię --</option>
          <option value='podzespoły komputera'>podzespoły komputera</option>
          <option value='urządzenia peryferyjne'>urządzenia peryferyjne</option>
          <option value='oprogramowanie'>oprogramowanie</option>
          <option value='inne'>inne</option>
        </select>
      ) : (
        inputType
      )}
    </div>
  );
};

export default Input;
