import { useContext, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { TableContext } from '../../context/TableContext';
import TableHeader from './TableHeader';
import TableItem from './TableItem';
import printIcon from '../../icons/print.png';
import classes from './Table.module.css';

const Table = () => {
  const componentRef = useRef();
  const { state } = useContext(TableContext);
  const { items, totalTablePrice, totalTableItems } = state;

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return items.length ? (
    <>
      <table className={`${classes.table} animate`} ref={componentRef}>
        <TableHeader />
        <tbody>
          {state.filteredArray
            ? state.filteredArray.map((item) => (
                <TableItem key={item.name} item={item} />
              ))
            : items.map((item) => <TableItem key={item.name} item={item} />)}
        </tbody>
        <div className={classes.sum}>
          <p>Suma: {totalTablePrice.toFixed(2)} zł</p>
          <p>Liczba pozycji: {totalTableItems}</p>
        </div>
      </table>
      <div className={`${classes.print} animate`}>
        {' '}
        <img onClick={handlePrint} src={printIcon} alt='print' />
      </div>
    </>
  ) : (
    <p className={`${classes.empty} animate`}>Brak pozycji do wyświetlenia</p>
  );
};

export default Table;
