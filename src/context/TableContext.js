import { createContext, useReducer } from 'react';
import tableActionTypes from './tableActionTypes';

export const TableContext = createContext({
  items: [],
  totalTablePrice: 0,
  totalTableItems: 0,
});

const initialState = {
  items: JSON.parse(localStorage.getItem('items')) || [],
  totalTablePrice: JSON.parse(localStorage.getItem('totalTablePrice')) || 0,
  totalTableItems: JSON.parse(localStorage.getItem('totalTableItems')) || 0,
};

const tableReducer = (state, action) => {
  switch (action.type) {
    case tableActionTypes.ADD_ITEM:
      localStorage.setItem(
        'items',
        JSON.stringify([...state.items, action.payload])
      );
      localStorage.setItem(
        'totalTablePrice',
        JSON.stringify(state.totalTablePrice + action.payload.price)
      );
      localStorage.setItem(
        'totalTableItems',
        JSON.stringify(state.totalTableItems + 1)
      );

      return {
        ...state,
        items: [...state.items, action.payload],
        totalTablePrice: state.totalTablePrice + action.payload.price,
        totalTableItems: state.totalTableItems + 1,
      };

    case tableActionTypes.REMOVE_ITEM:
      const itemToRemove = action.payload;
      const filteredItems = state.items.filter(
        (item) => item.id !== itemToRemove.id
      );

      const totalPrice = filteredItems.reduce((a, b) => a + b.price, 0);

      localStorage.setItem('items', JSON.stringify([...filteredItems]));
      localStorage.setItem('totalTablePrice', JSON.stringify(totalPrice));
      localStorage.setItem(
        'totalTableItems',
        JSON.stringify(state.totalTableItems - 1)
      );

      return {
        ...state,
        items: filteredItems,
        totalTablePrice: totalPrice,
        totalTableItems: state.totalTableItems - 1,
      };

    case tableActionTypes.SORT_TABLE:
      let sortBy = action.payload;
      const itemsArray = state.items;

      if (sortBy === 'name') {
        itemsArray.sort((a, b) => {
          if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
        });
      }
      if (sortBy === 'price') {
        itemsArray.sort((a, b) => {
          if (a.price < b.price) {
            return 1;
          } else if (a.price > b.price) {
            return -1;
          }
        });
      }
      if (sortBy === 'category') {
        itemsArray.sort((a, b) => {
          if (a.category.toLowerCase() < b.category.toLowerCase()) return -1;
        });
      }
      if (sortBy === 'description') {
        itemsArray.sort((a, b) => {
          if (a.description.toLowerCase() < b.description.toLowerCase())
            return -1;
        });
      }

      return { ...state, items: itemsArray };

    case tableActionTypes.FILTER_TABLE:
      const filterBy = action.payload;

      if (filterBy) {
        const filteredArray = state.items.filter(
          (item) => item.category === filterBy
        );
        return {
          ...state,
          filteredArray,
          totalTableItems: filteredArray.length,
          totalTablePrice: filteredArray.reduce((a, b) => a + b.price, 0),
        };
      }
      return { ...state };

    case tableActionTypes.EDIT_ITEM:
      const { itemId, dataToEdit } = action.payload;
      const foundedItem = state.items.find((item) => item.id === itemId);
      const newItem = { ...foundedItem, ...dataToEdit };
      const filteredArr = state.items.filter(
        (item) => item.id !== foundedItem.id
      );
      filteredArr.push(newItem);
      const totalPriceEdit = filteredArr.reduce((a, b) => a + b.price, 0);
      localStorage.setItem('items', JSON.stringify([...filteredArr]));
      localStorage.setItem('totalTablePrice', JSON.stringify(totalPriceEdit));

      return {
        ...state,
        items: [...filteredArr],
        totalTablePrice: totalPriceEdit,
      };

    default:
      return state;
  }
};

export const TableContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(tableReducer, initialState);

  return (
    <TableContext.Provider value={{ state, dispatch }}>
      {children}
    </TableContext.Provider>
  );
};
