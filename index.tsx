import * as React from 'react';

export const actions = {
  SET_STATE: 'SET_STATE',
};

export const StoreContext = React.createContext<any>({});

export interface StoreProviderProps<T> {
  initialState: T,
  reducer?: T,
  children: React.ReactNode | React.ReactNode[] | null;
}

export const StoreProvider: React.FC<StoreProviderProps<any>> = (props) => {

  const reducer = React.useCallback((s, a) => {
    const { type, payload } = a;
    switch (type) {
      case actions.SET_STATE:
        if (payload instanceof Array) {
          const obj = { ...s };
          a.payload.map((v) => {
            obj[v.name] = v.value;
          });
          return obj;
        } else {
          return {
            ...s,
            [payload.name]: payload.value,
          };
        }
      default: return props.reducer ? props.reducer(s, a) : s;
    }
  }, []);

  const [state, dispatch] = React.useReducer<React.Reducer<any, React.ReducerAction<any>>>(reducer, props.initialState);

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {props.children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const { state, dispatch } = React.useContext(StoreContext);

  const dispatchState = React.useCallback((payload) => {
    dispatch({ type: actions.SET_STATE, payload });
  }, []);

  return {
    state,
    dispatch,
    dispatchState,
  };
};
