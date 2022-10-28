import React, { createContext, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

export const Context = createContext();

function Provider({ children }) {
  const [dataApi, setdataApi] = useState([]);
  const [categorySearch, setCategorySearch] = useState(false);

  const fetchApi = async (url) => {
    const response = await fetch(url);
    const json = await response.json();
    console.log(json);
    return response.ok && Promise.resolve(json);
  };

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
    }),
    [dataApi, categorySearch, setCategorySearch, handleCallApi],
  );

  return <Context.Provider value={ context }>{children}</Context.Provider>;
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
