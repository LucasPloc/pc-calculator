import classes from './TableHeader.module.css';

const TableHeader = () => {
  return (
    <thead className={classes.header}>
      <tr>
        <th>Nazwa</th>
        <th>Opis</th>
        <th>Kategoria</th>
        <th>Cena</th>
      </tr>
    </thead>
  );
};

export default TableHeader;
