import React, { createContext } from 'react';
import PropTypes from 'prop-types';

export const Context = createContext();

function Provider({ children }) {
  Provider.propTypes = {
    children: PropTypes.node.isRequired,
  };

  // Validação de Email

  const context = 'string';

  return <Context.Provider value={ context }>{children}</Context.Provider>;
}
export default Provider;
