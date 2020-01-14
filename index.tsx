import * as React from 'react';

export const appActions = {
  SET_STATE: 'SET_STATE',
  SET_STATES: 'SET_STATES',
};

export const reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case appActions.SET_STATE: return { [payload.name]: payload.value };
    case appActions.SET_STATES:
      const obj = {};
      action.payload.map((v) => {
        obj[v.name] = v.value;
      });
      return obj;
    default: return state;
  }
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
      case appActions.SET_STATE:
        return {
          ...s,
          [payload.name]: payload.value,
        };
      case appActions.SET_STATES:
        const obj = { ...s };
        a.payload.map((v) => {
          obj[v.name] = v.value;
        });
        return obj;
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
    const type = payload instanceof Array ? appActions.SET_STATES : appActions.SET_STATE;
    dispatch({ type, payload });
  }, []);

  return {
    state,
    dispatch,
    dispatchState,
  };
};
