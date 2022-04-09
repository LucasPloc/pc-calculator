import { useState, useContext, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import tableActionTypes from '../../context/tableActionTypes';
import { TableContext } from '../../context/TableContext';
import FormInput from './FormInput';
import FormButton from './FormButton';
import classes from './Form.module.css';
import { useNavigate, useParams } from 'react-router-dom';

const Form = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { state, dispatch } = useContext(TableContext);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [error, setError] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();
    if ((name === '' || description === '' || category === '', price === '')) {
      setError('Proszę uzupełnić wszystkie pola');
      return;
    }
    if (params.id) {
      dispatch({
        type: tableActionTypes.EDIT_ITEM,
        payload: {
          itemId: params.id.slice(1),
          dataToEdit: {
            name,
            description,
            category,
            price: Number(price),
          },
        },
      });
      navigate('/');
      return;
    }

    dispatch({
      type: tableActionTypes.ADD_ITEM,
      payload: {
        id: uuidv4(),
        name,
        description,
        category,
        price: Number(price),
      },
    });
    setName('');
    setDescription('');
    setCategory('');
    setPrice('');
    navigate('/');
  };

  useEffect(() => {
    if (params.id) {
      const str = params.id.slice(1);
      const foundedItem = state.items.find((item) => str === item.id);
      setName(foundedItem.name);
      setDescription(foundedItem.description);
      setCategory(foundedItem.category);
      setPrice(foundedItem.price);
    }
  }, []);
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      {error && <p className={classes.error}>{error}</p>}
      <FormInput
        type='input'
        label='Nazwa'
        onChange={(e) => setName(e.target.value)}
        value={name}
        valueType='text'
      />
      <FormInput
        type='input'
        label='Opis'
        onChange={(e) => setDescription(e.target.value)}
        value={description}
        valueType='text'
      />
      <FormInput
        type='select'
        label='Kategoria'
        onChange={(e) => setCategory(e.target.value)}
        value={category}
      />
      <FormInput
        type='input'
        label='Cena'
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        valueType='number'
      />
      <FormButton>Dodaj</FormButton>
    </form>
  );
};

export default Form;
