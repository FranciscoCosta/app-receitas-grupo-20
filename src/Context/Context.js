import React, { createContext, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

export const Context = createContext();

function Provider({ children }) {
  const [dataApi, setdataApi] = useState([]);
  Provider.propTypes = {
    children: PropTypes.node.isRequired,
  };

  const fetchApi = async (url) => {
    const response = await fetch(url);
    const json = await response.json();
    return response.ok && Promise.resolve(json);
  };
  const handleCallApi = async (type, typeOfApiCall, search) => {
    const apiObj = {
      meals: {
        ingredient: `https://www.themealdb.com/api/json/v1/1/filter.php?i=${search}`,
        name: `https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`,
        'first-letter': `https://www.themealdb.com/api/json/v1/1/search.php?f=${search}`,
      },
      drinks: {
        ingredient: `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${search}`,
        name: `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${search}`,
        'first-letter': `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${search}`,
      },
    };
    const url = apiObj[typeOfApiCall][type];
    if (type === 'first-letter' && search.length > 1) {
      global.alert('Your search must have only 1 (one) character');
    } else {
      const data = await fetchApi(url);
      setdataApi(data);
      if (data[typeOfApiCall] === null) {
        global.alert('Sorry, we haven\'t found any recipes for these filters.');
      }
    }
  };
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
    }),
    [dataApi],
  );

  return <Context.Provider value={ context }>{children}</Context.Provider>;
}
export default Provider;
