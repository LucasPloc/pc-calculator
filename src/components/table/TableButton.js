import classes from './TableButton.module.css';

const TableButton = ({ type, children, onClick }) => {
  return (
    <button
      className={type === 'remove' ? classes.remove : classes.edit}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default TableButton;
