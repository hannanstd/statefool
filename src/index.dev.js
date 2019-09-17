import React, { useState, createContext, useContext } from 'react';

var Contexts;
Contexts = Contexts || {};

export const getContext = id => (Contexts[id] = Contexts[id] || createContext());

const useHook = init => {
  const [state, setState] = useState({ ...init });
  return {
    state,
    ...state,
    setState: async (argument, callback = null, name = '') => {
      let updated = state;

      await setState(prevState => {
        //
        if (typeof argument === 'function') {
          if (name) argument = { [name]: argument(prevState[name]) };
          else argument = argument(prevState);
        } else {
          if (name) argument = { [name]: argument };
        }

        return (updated = { ...prevState, ...(typeof argument === 'object' ? argument : {}) });
      });

      if (typeof callback === 'function') callback(name ? updated[name] : { ...updated, state: updated });
    }
  };
};

export const Provider = ({ children, id = '', state = null, initialState = null }) => {
  const Context = getContext(id);
  return <Context.Provider value={useHook(state || initialState)}>{children}</Context.Provider>;
};

export const Consumer = ({ children, id }) => {
  const Context = getContext(id);
  return <Context.Consumer>{children}</Context.Consumer>;
};

export const useStateFrom = (id, name = false) => {
  const ctx = useContext(getContext(id));
  if (name === false) return ctx;
  return [ctx.state[name], (...params) => ctx.setState(params[0], params[1], name)];
};

export const withState = (Component, ids = null) => {
  return props => {
    ids = ids || Object.keys(Contexts);
    ids = typeof ids === 'object' && ids.constructor === Array ? ids : [...ids.toString().split(',')];

    let ctxs = {};
    ids.forEach(id => {
      id = id.trim();
      return (ctxs[id] = useStateFrom(id));
    });

    return <Component {...props} {...ctxs} />;
  };
};

