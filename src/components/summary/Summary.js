import { useContext } from 'react';
import { TableContext } from '../../context/TableContext';
import classes from './Summary.module.css';

const Summary = () => {
  const { state, dispatch } = useContext(TableContext);
  const { items, totalTablePrice } = state;

  const calcItemsPerCategory = () => {
    const categoryArray = items.map((item) => item.category);
    const count = {};

    for (const element of categoryArray) {
      if (count[element]) {
        count[element] += 1;
      } else {
        count[element] = 1;
      }
    }
    return count;
  };
  const categoryObj = calcItemsPerCategory();

  return (
    <div className={classes.summary}>
      <h1>Podsumowanie</h1>
      <hr />
      <ul className={classes.details}>
        {Object.keys(categoryObj).map((key) => (
          <li key={key}>
            {key}: pozycje ({categoryObj[key]})
          </li>
        ))}
      </ul>
      <p>Suma: {totalTablePrice.toFixed(2)} zł</p>
    </div>
  );
};

export default Summary;
