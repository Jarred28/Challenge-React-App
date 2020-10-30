import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import logger from 'redux-logger'
import reducer from '../reducers/rootReducer';

export const middleware = process.env.NODE_ENV !== 'production'? getDefaultMiddleware().concat(logger) : getDefaultMiddleware()

const store = configureStore({
  reducer,
  middleware,
  devTools: process.env.NODE_ENV !== 'production',
})

export default store;