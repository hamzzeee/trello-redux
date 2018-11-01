import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

import rootReducer from './../ducks';

export const store = createStore(
    rootReducer,
    applyMiddleware(
        // loggerMiddleware,
        thunkMiddleware
    )
);