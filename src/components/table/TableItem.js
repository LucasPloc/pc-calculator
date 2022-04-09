import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { TableContext } from '../../context/TableContext';
import tableActionTypes from '../../context/tableActionTypes';
import TableButton from './TableButton';
import classes from './TableItem.module.css';

const TableItem = ({ item }) => {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(TableContext);

  const handleRemoveItem = () => {
    dispatch({ type: tableActionTypes.REMOVE_ITEM, payload: item });
  };
  const handleEditItem = () => {
    navigate(`/form/:${item.id}`);
  };
  return (
    <tr className={classes.item}>
      <td>{item.name}</td>
      <td>{item.description}</td>
      <td>{item.category}</td>
      <td>{item.price} zł</td>
      <div className={classes.buttons}>
        <TableButton type='remove' onClick={handleRemoveItem}>
          x
        </TableButton>
        <TableButton type='edit' onClick={handleEditItem}>
          edit
        </TableButton>
      </div>
    </tr>
  );
};

export default TableItem;
