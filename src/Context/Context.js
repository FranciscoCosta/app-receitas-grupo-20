import React, { createContext, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

export const Context = createContext();

function Provider({ children }) {
  const [dataApi, setdataApi] = useState([]);
  const [categorySearch, setCategorySearch] = useState(false);
  const [ItemIngridients, setItemIngridients] = useState([]);
  const [Item, setitemPage] = useState({});

  const fetchApi = async (url) => {
    const response = await fetch(url);
    const json = await response.json();
    return response.ok && Promise.resolve(json);
  };

  const fetchItem = useMemo(
    () => async (page, id) => {
      const apis = {
        meals: `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`,
        drinks: `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`,
      };
      const url = apis[page];
      const item = await fetchApi(url);
      setitemPage(item[page][0]);
      const values = Object.entries(item[page][0]);
      const ingridientsArray = values.filter(
        ([key, value]) => key.includes('strIngredient') && value,
      );
      const valuesArray = values.filter(
        ([key, value]) => key.includes('strMeasure') && (value || []),
      );
      const finalArray = ingridientsArray
        .map((ing, index) => ing !== null && [ing, valuesArray[index]])
        .filter((e) => e[0] !== undefined);
      setItemIngridients(finalArray);
    },
    [],
  );

  const handleCallApi = useMemo(() => async (type, typeOfApiCall, search = '') => {
    const apiObj = {
      meals: {
        ingredient: `https://www.themealdb.com/api/json/v1/1/filter.php?i=${search}`,
        name: `https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`,
        'first-letter': `https://www.themealdb.com/api/json/v1/1/search.php?f=${search}`,
        category: `https://www.themealdb.com/api/json/v1/1/filter.php?c=${search}`,
        default: 'https://www.themealdb.com/api/json/v1/1/search.php?s=',
      },
      drinks: {
        ingredient: `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${search}`,
        name: `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${search}`,
        'first-letter': `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${search}`,
        category: `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${search}`,
        default: 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=',
      },
    };
    const url = apiObj[typeOfApiCall][type];
    if (type === 'first-letter' && search.length > 1) {
      global.alert('Your search must have only 1 (one) character');
    } else {
      const data = await fetchApi(url);
      if (data[typeOfApiCall] === null) {
        global.alert('Sorry, we haven\'t found any recipes for these filters.');
      }
      setdataApi(data);
    }
  }, []);
  // console.log(type, typeOfApiCall, search);
  // if (typeOfApiCall === 'Meals') {
  //   if (type === 'ingredient') {
  //     const url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${search}`;
  //     const data = await fetchApi(url);
  //     console.log(data);
  //   }
  //   if (type === 'name') {
  //     const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`;
  //     const data = await fetchApi(url);
  //     console.log(data);
  //   }
  //   if (type === 'first-letter') {
  //     if (search.length > 1) {
  //       global.alert('Your search must have only 1 (one) character');
  //     } else {
  //       const url = `https://www.themealdb.com/api/json/v1/1/search.php?f=${search}`;
  //       const data = await fetchApi(url);
  //       console.log(data);
  //     }
  //   }
  // } if (typeOfApiCall === 'Drinks') {
  //   if (type === 'ingredient') {
  //     const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${search}`;
  //     const data = await fetchApi(url);
  //     console.log(data);
  //   }
  //   if (type === 'name') {
  //     const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${search}`;
  //     const data = await fetchApi(url);
  //     console.log(data);
  //   }
  //   if (type === 'first-letter') {
  //     if (search.length > 1) {
  //       global.alert('Your search must have only 1 (one) character');
  //     } else {
  //       const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${search}`;
  //       const data = await fetchApi(url);
  //       console.log(data);
  //     }
  //   }
  // }

  const context = useMemo(
    () => ({
      handleCallApi,
      dataApi,
      categorySearch,
      setCategorySearch,
      fetchApi,
      ItemIngridients,
      Item,
      fetchItem,

    }),
    [dataApi, categorySearch, setCategorySearch,
      handleCallApi, ItemIngridients, Item, fetchItem],
  );

  return <Context.Provider value={ context }>{children}</Context.Provider>;
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
