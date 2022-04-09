import { Link } from 'react-router-dom';
import classes from './Header.module.css';

const Header = () => {
  return (
    <header className={`${classes.header} animate`}>
      <h1>
        <Link to='/'>PC Calculator</Link>
      </h1>
    </header>
  );
};

export default Header;
