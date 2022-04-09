import { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../ui/Button';
import tableActionTypes from '../../context/tableActionTypes';
import { TableContext } from '../../context/TableContext';
import classes from './TableActions.module.css';

const TableActions = () => {
  const { state, dispatch } = useContext(TableContext);
  const [sortBy, setSortBy] = useState('');
  const [filterBy, setFilterBy] = useState('');
  const navigate = useNavigate();

  const sortHandler = (e) => {
    setSortBy(e.target.value);
  };
  const filterHandler = (e) => {
    setFilterBy(e.target.value);
  };

  useEffect(() => {
    dispatch({ type: tableActionTypes.SORT_TABLE, payload: sortBy });
  }, [sortBy, dispatch]);
  useEffect(() => {
    dispatch({ type: tableActionTypes.FILTER_TABLE, payload: filterBy });
  }, [filterBy, dispatch]);

  return (
    <div className={`${classes.container} animate`}>
      <Button onClick={() => navigate('/form')}>Dodaj</Button>
      {state.items.length && (
        <>
          {' '}
          <Button onClick={() => navigate('/summary')}>Podsumowanie</Button>
          <div className={classes.selects}>
            <select onChange={filterHandler} value={filterBy}>
              <option>--filtruj--</option>
              <option value='podzespoły komputera'>podzespoły komputera</option>
              <option value='urządzenia peryferyjne'>
                urządzenia peryferyjne
              </option>
              <option value='oprogramowanie'>oprogramowanie</option>
              <option value='inne'>inne</option>
            </select>
            <select onChange={sortHandler} value={sortBy}>
              <option value=''>--sortuj--</option>
              <option value='name'>nazwa</option>
              <option value='category'>kategoria</option>
              <option value='description'>opis</option>
              <option value='price'>cena</option>
            </select>
          </div>
        </>
      )}
    </div>
  );
};

export default TableActions;
