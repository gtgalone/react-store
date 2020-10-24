# react-store [![Build Status](https://travis-ci.org/gtgalone/react-store.svg?branch=master)](https://travis-ci.org/gtgalone/react-store)

React Hook Store with useContext and useReducer for State Management.
You don't have to use external libraries (redux, mobx, etc..)

- Typescript support
- Unopinionated
- No dependencies
- Tiny package size

## Install

```
$ npm install @gtgalone/react-store
or
$ yarn add @gtgalone/react-store
```

## Usage

### Basic
```jsx
import React from 'react';

import { StoreProvider, useStore } from '@gtgalone/react-store';
// or const { StoreProvider, useStore } = require('@gtgalone/react-store');

const App = () => {
  const { state, dispatchState } = useStore();

  console.log(state); // { count: 0 }

  const increment = () => {
    dispatchState({ name: 'count', value: state.count + 1 });
  };

  const decrement = () => {
    dispatchState({ name: 'count', value: state.count - 1 });
  };

  return (
    <div>
      <button onClick={increment}>increment</button>
      <button onClick={decrement}>decrement</button>
      <div>{state.count}</div>
    </div>
  );
};

export default () => {
  return (
    <StoreProvider initialState={{ count: 0 }}>
      <App />
    </StoreProvider>
  );
};
```
---
### To Avoid Re-rendering with Other states change
```jsx
const App = () => {
  const { state, dispatchState } = useStore();

  const increment = () => {
    dispatchState({ name: 'count', value: state.count + 1 });
  };

  // return with useMemo.
  // Only Re-rendering with state.count change.
  return React.useMemo(() => (
    <div>
      <button onClick={increment}>increment</button>
      <div>{state.count}</div>
    </div>
  ), [state.count]);
};
```
---
### With Custom Reducer
```jsx
const actions = {
  INCREMENT: 'increment',
  DECREMENT: 'decrement',
  RESET: 'reset',
}

const App = () => {
  const { state, dispatch } = useStore();

  const increment = () => {
    dispatch({ type: actions.INCREMENT });
  };

  const decrement = () => {
    dispatch({ type: actions.DECREMENT });
  };

  const reset = () => {
    dispatch({ type: actions.RESET, payload: 0 });
  };

  return (
    <div>
      <button onClick={increment}>increment</button>
      <button onClick={decrement}>decrement</button>
      <button onClick={reset}>reset</button>
      <div>{state.count}</div>
    </div>
  );
};

const reducer = (state, action) => {
  switch (action.type) {
    case actions.INCREMENT:
      return { count: state.count + 1 };
    case actions.DECREMENT:
      return { count: state.count - 1 };
    case actions.RESET:
      return { count: action.payload };
    default:
      throw new Error();
  }
};

export default () => {
  return (
    <StoreProvider reducer={reducer} initialState={{ count: 0 }}>
      <App />
    </StoreProvider>
  );
};
```
## Return

### state
States what you need to manage in your app globally.\
Type: `Object`

### dispatchState
Built in dispatch function with universial states.\
It is easy and simple.\
You don't need to make any extra reducer.\
Change single and multiple states with this function.\
Type:\
`({ name: 'state name', value: 'any value' }) => void`\
`([{ name: 'state name', value: 'any value' }]) => void`

### dispatch
You can use this function for custom reducer with action.\
Type: `({ type: 'action name', payload: 'any value' }) => void`\
NOTE Allocated action: `actions.SET_STATE`

---
## Recommend Libraries

- [React Checklist](https://github.com/gtgalone/react-checklist) - Make Checkbox List Easy and Simple with React Hooks.
- [React Quilljs](https://github.com/gtgalone/react-quilljs) - React Hook Wrapper for Quill(Rich Text Editor).
- [Decode URI Component Charset](https://github.com/gtgalone/decode-uri-component-charset) - Decode URI Component with Charset such as 'euc-kr' without tears.

## Maintainer

- [Jehun Seem](https://github.com/gtgalone)

## License

MIT
